import * as R from "ramda";

const keyType = ({ key, data }: { key: string; data: any }) =>
  R.pipe(
    R.prop<any, any>(key),
    R.type
  )(data);

const columnFilterDataBuilder = ({
  data,
  columnFilterName = "ColumnFilter_"
}: {
  data: any;
  columnFilterName?: string;
}) =>
  R.pipe(
    R.head,
    R.keys,
    R.map(
      key => `${columnFilterName}${key}=${R.path([key, "value"], data[0])}`
    ),
    R.join("&")
  )(data);

const objDataBuilder = ({ data }: { data: any }) =>
  R.pipe(
    R.keys,
    R.map((key: any) => `${key}=${encodeURIComponent(R.prop(key, data))}`),
    R.join("&")
  )(data);

const simpleDataBuilder = ({ key, data }: { key: string; data: any }) => {
  switch (R.type(data[0])) {
    case "Object":
      return R.pipe(
        R.map(
          ({ value }: { value: string }) =>
            `${key}=${encodeURIComponent(value)}`
        ),
        R.values,
        R.join("&")
      )(data);
    case "Number":
    case "String":
      return R.pipe(
        R.map((value: any) => `${key}=${encodeURIComponent(value)}`),
        R.join("&")
      )(data);
    default:
      return "";
  }
};
const arrDataBuilder = ({
  key,
  data,
  columnFilterName
}: {
  key: string;
  data: any;
  columnFilterName?: string;
}) =>
  R.equals(key, "columnFilters")
    ? columnFilterDataBuilder({ columnFilterName, data })
    : simpleDataBuilder({ key, data });

const builder = ({
  key,
  data,
  columnFilterName
}: {
  key: string;
  data: any;
  columnFilterName?: string;
}) => {
  switch (keyType({ key, data })) {
    case "Array":
      return arrDataBuilder({ key, columnFilterName, data: R.prop(key, data) });
    case "Object":
      return objDataBuilder({ data: R.prop(key, data) });
    case "Number":
    case "String":
      return `${key}=${encodeURIComponent(R.prop(key, data))}`;
    default:
      return "";
  }
};

const queryStringBuilder = ({
  filters,
  columnFilterName
}: {
  filters: any;
  columnFilterName?: string;
}) =>
  R.pipe(
    R.filter((x: any) => x),
    R.keys,
    R.map((key: any) => builder({ key, data: filters, columnFilterName })),
    R.filter((x: any) => x),
    R.join("&")
  )(filters);

export default queryStringBuilder;
