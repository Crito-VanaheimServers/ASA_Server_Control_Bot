const tableReducer = ({
  key,
  filterState = false,
  filters = [],
  filterOrig = []
}: {
  key: string;
  filterState?: boolean;
  filters?: {};
  filterOrig?: any[];
}) => {
  const SET_FILTERS = `${key}/SET_FILTERS`;
  const OPEN_FILTER = `${key}/OPEN_FILTER`;
  const CLOSE_FILTER = `${key}/CLOSE_FILTER`;
  const CLEAR_FILTER = `${key}/CLEAR_FILTER`;
  const APPLY_FILTER = `${key}/APPLY_FILTER`;
  const CLEAR_ALL_SETTINGS = `${key}/CLEAR_ALL_SETTINGS`;

  const tablesOptionsInitialState = {
    filterState,
    filters,
    filterOrig
  };

  const tableOptionsReducer = (
    state = tablesOptionsInitialState,
    action: any
  ) => {
    switch (action.type) {
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
          filterState: tablesOptionsInitialState.filterState,
          filters: tablesOptionsInitialState.filters
        };
      case APPLY_FILTER:
        return {
          ...state,
          filterState: false,
          filterOrig: state.filters
        };
      case CLEAR_ALL_SETTINGS:
        return tablesOptionsInitialState;
      default:
        return state;
    }
  };

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

  return {
    tableOptionsReducer,
    setFilters,
    openFilter,
    closeFilter,
    clearFilter,
    applyFilter,
    clearAllSettings
  };
};

export default tableReducer;
