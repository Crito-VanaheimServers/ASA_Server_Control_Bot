import * as R from "ramda";
import { Left, Right, concat } from "sanctuary";
import { reader, sanctuaryConcat, moment } from "./commitModsHelper";

const checkPrimaryKey = ({ row, pks }: { row: any; pks: any }): any =>
  R.allPass(R.map(R.eqProps, pks))(row);

const alterMatch = R.curry((fn: any, state: any, row: any, pks: any) =>
  R.map(R.ifElse(checkPrimaryKey({ row, pks }), fn, R.identity), state)
);

const nonPrimaryKeyValuesAltered = (
  modalData: any,
  pks: any,
  errMsg: string
): any =>
  R.equals(R.omit(pks, modalData.row), R.omit(pks, modalData.orig))
    ? Left(errMsg)
    : Right(modalData);

const mapRanges = (list: any) =>
  list.map((row: any) =>
    moment().range(
      moment(row.validoDal).format("YYYY-MM-DD"),
      moment(row.validoAl).format("YYYY-MM-DD")
    )
  );

const periodiRangeOverlapChecker = ({
  tableData,
  modalData,
  selectedPeriodo,
  periodo,
  periodoKeys,
  periodoErrorMsg
}: {
  tableData: any;
  modalData: any;
  selectedPeriodo: any;
  periodo: any;
  periodoKeys: any;
  periodoErrorMsg: any;
}) => {
  const getSelectedRange = periodo
    .filter((row: any) => row.periodo === selectedPeriodo)
    .map((x: any) => moment().range(x.validoDal, x.validoAl));

  const matchingDataPeriodo = tableData
    .filter(checkPrimaryKey({ row: modalData.row, pks: periodoKeys }))
    .map((x: any) => x.periodo)
    .map((val: any) => periodo.filter(row => row.periodo === val));

  const getMapRanges = R.isEmpty(matchingDataPeriodo)
    ? []
    : mapRanges(R.head(matchingDataPeriodo));

  const resultList = getMapRanges.map((range: any) =>
    getSelectedRange[0].overlaps(range)
  );

  return R.any(R.equals(true), resultList)
    ? Left([periodoErrorMsg])
    : Right(modalData);
};

const excludesPrimaryKey = R.curry(
  (
    tableData: any,
    modalData: any,
    pks: any,
    errMsg: string,
    periodo: any,
    periodoKeys: any,
    periodoErrorMsg: any
  ): any =>
    tableData.filter(checkPrimaryKey({ row: modalData.row, pks })).length > 0
      ? Left([errMsg])
      : periodiRangeOverlapChecker({
          tableData,
          modalData,
          selectedPeriodo: modalData.row.periodo,
          periodo,
          periodoKeys,
          periodoErrorMsg
        })
);

const primaryKeyValuesMatch = (modalData: any, pks: any, errMsg: string): any =>
  R.all((x: any) => R.equals(modalData.row[x], modalData.orig[x]), pks)
    ? Right(modalData)
    : Left([errMsg]);

const onlyNonPrimaryAltered = (modalData: any, pks: any, errMsg: string) =>
  R.pipe(
    (x: any) => primaryKeyValuesMatch(x, pks, errMsg),
    R.chain(x => nonPrimaryKeyValuesAltered(x, pks, errMsg))
  )(modalData);

const addOrUpdate = (
  tableData: any,
  pks: any,
  errMsg: string,
  periodo: any,
  periodoKeys: any,
  periodoErrorMsg: any
): any => (modalData: any) =>
  sanctuaryConcat(
    excludesPrimaryKey(
      tableData,
      modalData,
      pks,
      errMsg,
      periodo,
      periodoKeys,
      periodoErrorMsg
    ),
    onlyNonPrimaryAltered(modalData, pks, errMsg)
  );

const isUpdate = R.ifElse(
  R.propEq("type", "Update Mapping"),
  Right,
  R.always(Left([]))
);

const getUpdater = reader(
  ({
    pks,
    errMsg,
    modalData,
    tableData,
    periodo,
    periodoKeys,
    periodoErrorMsg
  }: {
    pks: any;
    errMsg: string;
    modalData: any;
    tableData: any;
    periodo: any;
    periodoKeys: any;
    periodoErrorMsg: any;
  }) =>
    R.pipe(
      isUpdate,
      R.chain(
        addOrUpdate(
          tableData,
          pks,
          errMsg,
          periodo,
          periodoKeys,
          periodoErrorMsg
        )
      ),
      R.map((m: any) => R.assoc("mod", m.type, m.row)),
      R.map(R.assoc("original", modalData.orig.original || modalData.orig)),
      R.map(updated =>
        alterMatch(R.always(updated), tableData, modalData.orig, pks)
      )
    )(modalData)
);

const isAdd = R.ifElse(
  R.propEq("type", "Add Mapping"),
  Right,
  R.always(Left([]))
);
const getAdder = reader(
  ({
    pks,
    errMsg,
    modalData,
    tableData,
    periodo,
    periodoKeys,
    periodoErrorMsg
  }: {
    pks: any;
    errMsg: string;
    modalData: any;
    tableData: any;
    periodo: any;
    periodoKeys: any;
    periodoErrorMsg: any;
  }) =>
    R.pipe(
      isAdd,
      R.chain(x =>
        excludesPrimaryKey(
          tableData,
          x,
          pks,
          errMsg,
          periodo,
          periodoKeys,
          periodoErrorMsg
        )
      ),
      R.map((m: any) => R.assoc("mod", m.type, m.row)),
      R.map(x => R.prepend(x, tableData))
    )(modalData)
);
const getModifiers = R.traverse<any, any, any>(reader.of, R.identity, [
  getUpdater,
  getAdder
]).map(R.apply(concat));

export const commitPeriodiModification = ({
  pks,
  errMsg,
  modalData,
  tableData,
  periodo,
  periodoKeys,
  periodoErrorMsg
}: {
  pks: any;
  errMsg: string;
  modalData: any;
  tableData: any;
  periodo: any;
  periodoKeys: any;
  periodoErrorMsg: any;
}) =>
  getModifiers.run({
    pks,
    errMsg,
    modalData,
    tableData,
    periodo,
    periodoKeys,
    periodoErrorMsg
  });

export default commitPeriodiModification;
