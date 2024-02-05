import { Moment } from "moment";

const tableReducer = ({
  key,
  data = [],
  pageSize = 50,
  pageSizeList = [50, 100, 250],
  pageNo = 1,
  sortColumn = null,
  columnFilters = [],
  tableCount = 0
}: {
  key: string;
  data?: any;
  pageSize?: number;
  pageSizeList?: any[];
  pageNo?: number;
  sortColumn?: string | null;
  columnFilters?: any[];
  tableCount?: number;
}) => {
  const SET_DATA = `${key}/SET_DATA`;
  const CLEAR_DATA = `${key}/CLEAR_DATA`;
  const SET_PAGE_SIZE = `${key}/SET_PAGE_SIZE`;
  const SET_PAGE_NO = `${key}/SET_PAGE_NO`;
  const SET_SORT_COLUMN = `${key}/SET_SORT_COLUMN`;
  const CLEAR_SORT_COLUMN = `${key}/CLEAR_SORT_COLUMN`;
  const SET_COLUMN_FILTERS = `${key}/SET_COLUMN_FILTERS`;
  const CLEAR_COLUMN_FILTERS = `${key}/CLEAR_COLUMN_FILTERS`;
  const SET_TABLE_COUNT = `${key}/SET_TABLE_COUNT`;
  const RESET_TABLE_SETTINGS = `${key}/RESET_TABLE_SETTINGS`;

  const tablesOptionsInitialState = {
    data,
    pageSize,
    pageSizeList,
    pageNo,
    sortColumn,
    columnFilters,
    tableCount
  };

  const tableOptionsReducer = (
    state = tablesOptionsInitialState,
    action: any
  ) => {
    switch (action.type) {
      case SET_DATA:
        return {
          ...state,
          data: action.data
        };
      case CLEAR_DATA:
        return {
          ...state,
          data: tablesOptionsInitialState.data
        };
      case SET_PAGE_SIZE:
        return {
          ...state,
          pageSize: action.pageSize
        };
      case SET_PAGE_NO:
        return {
          ...state,
          pageNo: action.pageNo
        };
      case SET_SORT_COLUMN:
        return {
          ...state,
          sortColumn
        };
      case CLEAR_SORT_COLUMN:
        return {
          ...state,
          sortColumn: tablesOptionsInitialState.sortColumn
        };
      case SET_COLUMN_FILTERS:
        return {
          ...state,
          columnFilters: action.columnFilters
        };
      case CLEAR_COLUMN_FILTERS:
        return {
          ...state,
          columnFilters: tablesOptionsInitialState.columnFilters
        };
      case SET_TABLE_COUNT:
        return {
          ...state,
          tableCount: action.tableCount
        };
      case RESET_TABLE_SETTINGS:
        return {
          ...state,
          pageSize: tablesOptionsInitialState.pageSize,
          pageNo: tablesOptionsInitialState.pageNo,
          sortColumn: tablesOptionsInitialState.sortColumn,
          columnFilters: tablesOptionsInitialState.columnFilters,
          tableCount: tablesOptionsInitialState.tableCount
        };
      default:
        return state;
    }
  };

  const setData = ({ data }: { data: any }) => ({
    type: SET_DATA,
    data
  });
  const clearData = () => ({
    type: CLEAR_DATA
  });
  const setPageSize = ({ pageSize }: { pageSize: number }) => ({
    type: SET_PAGE_SIZE,
    pageSize
  });
  const setPageNo = ({ pageNo }: { pageNo: number }) => ({
    type: SET_PAGE_NO,
    pageNo
  });
  const setSortColumn = ({ col, dir }: { col: string; dir: string }) => ({
    type: SET_SORT_COLUMN,
    SET_SORT_COLUMN: `${col} ${dir}`
  });
  const setTableCount = ({ tableCount }: { tableCount: number }) => ({
    type: SET_TABLE_COUNT,
    tableCount
  });
  const setColumnFilters = ({ date }: { date: Moment | null }) => ({
    type: SET_COLUMN_FILTERS,
    date
  });
  const clearColumnFilters = () => ({
    type: CLEAR_COLUMN_FILTERS
  });
  const resetTableSettings = () => ({
    type: RESET_TABLE_SETTINGS
  });

  return {
    tableOptionsReducer,
    setData,
    clearData,
    setPageSize,
    setPageNo,
    setSortColumn,
    setColumnFilters,
    clearColumnFilters,
    setTableCount,
    resetTableSettings
  };
};

export default tableReducer;
