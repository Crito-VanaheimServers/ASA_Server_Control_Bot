import { Moment } from "moment";

const tableReducer = ({
  key,
  data = [],
  pageSize = 50,
  pageSizeList = [50, 100, 250],
  pageNo = 1,
  sortColumn = null,
  columnFilters = [],
  tableCount = 0,
  filterState = false,
  filters = [],
  filterOrig = [],
  dateRange = null,
  datePicker = null
}: {
  key: string;
  data?: any;
  pageSize?: number;
  pageSizeList?: any[];
  pageNo?: number;
  sortColumn?: string | null;
  columnFilters?: any[];
  tableCount?: number;
  filterState?: boolean;
  filters?: {};
  filterOrig?: any[];
  dateRange?: { startDate: Moment | null; endDate: Moment | null } | null;
  datePicker?: Moment | null;
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
  const SET_FILTERS = `${key}/SET_FILTERS`;
  const OPEN_FILTER = `${key}/OPEN_FILTER`;
  const CLOSE_FILTER = `${key}/CLOSE_FILTER`;
  const CLEAR_FILTER = `${key}/CLEAR_FILTER`;
  const APPLY_FILTER = `${key}/APPLY_FILTER`;
  const CLEAR_ALL_SETTINGS = `${key}/CLEAR_ALL_SETTINGS`;
  const SET_DATE_RANGE = `${key}/SET_DATE_RANGE`;
  const CLEAR_DATE_RANGE = `${key}/CLEAR_DATE_RANGE`;
  const SET_DATE_PICKER = `${key}/SET_DATE_PICKER`;
  const CLEAR_DATE_PICKER = `${key}/CLEAR_DATE_PICKER`;

  const tablesOptionsInitialState = {
    data,
    pageSize,
    pageSizeList,
    pageNo,
    sortColumn,
    columnFilters,
    tableCount,
    filterState,
    filters,
    filterOrig,
    dateRange,
    datePicker
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
      case SET_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case OPEN_FILTER:
        return {
          ...state,
          filterState: true,
          filterOrig: state.filters
        };
      case CLOSE_FILTER:
        return {
          ...state,
          filterState: false,
          filters: state.filterOrig
        };
      case CLEAR_FILTER:
        return {
          ...state,
          pageNo: tablesOptionsInitialState.pageNo,
          filterState: tablesOptionsInitialState.filterState,
          filters: tablesOptionsInitialState.filters
        };
      case APPLY_FILTER:
        return {
          ...state,
          pageNo: tablesOptionsInitialState.pageNo,
          filterState: false,
          filterOrig: state.filters
        };
      case SET_DATE_RANGE:
        return {
          ...state,
          pageNo: tablesOptionsInitialState.pageNo,
          dateRange: { startDate: action.startDate, endDate: action.endDate }
        };
      case CLEAR_DATE_RANGE:
        return {
          ...state,
          pageNo: tablesOptionsInitialState.pageNo,
          dateRange: { startDate: null, endDate: null }
        };
      case SET_DATE_PICKER:
        return {
          ...state,
          pageNo: tablesOptionsInitialState.pageNo,
          datePicker: action.date
        };
      case CLEAR_DATE_PICKER:
        return {
          ...state,
          pageNo: tablesOptionsInitialState.pageNo,
          datePicker: null
        };
      case CLEAR_ALL_SETTINGS:
        return tablesOptionsInitialState;
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
  const setFilters = ({ filters }: { filters: any }) => ({
    type: SET_FILTERS,
    filters
  });
  const openFilter = () => ({
    type: OPEN_FILTER
  });
  const closeFilter = () => ({
    type: CLOSE_FILTER
  });
  const clearFilter = () => ({
    type: CLEAR_FILTER
  });
  const applyFilter = () => ({
    type: APPLY_FILTER
  });
  const clearAllSettings = () => ({
    type: CLEAR_ALL_SETTINGS
  });
  const setDateRange = ({
    startDate,
    endDate
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => ({
    type: SET_DATE_RANGE,
    startDate,
    endDate
  });
  const clearDateRange = () => ({
    type: CLEAR_DATE_RANGE
  });
  const setDatePicker = ({ date }: { date: Moment | null }) => ({
    type: SET_DATE_PICKER,
    date
  });
  const clearDatePicker = () => ({
    type: CLEAR_DATE_PICKER
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
    resetTableSettings,
    setFilters,
    openFilter,
    closeFilter,
    clearFilter,
    applyFilter,
    clearAllSettings,
    setDateRange,
    clearDateRange,
    setDatePicker,
    clearDatePicker
  };
};

export default tableReducer;
