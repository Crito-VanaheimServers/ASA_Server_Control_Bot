"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tableReducer = function tableReducer(_ref) {
  var key = _ref.key,
      _ref$filterState = _ref.filterState,
      filterState = _ref$filterState === void 0 ? false : _ref$filterState,
      _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? [] : _ref$filters,
      _ref$filterOrig = _ref.filterOrig,
      filterOrig = _ref$filterOrig === void 0 ? [] : _ref$filterOrig;
  var SET_FILTERS = "".concat(key, "/SET_FILTERS");
  var OPEN_FILTER = "".concat(key, "/OPEN_FILTER");
  var CLOSE_FILTER = "".concat(key, "/CLOSE_FILTER");
  var CLEAR_FILTER = "".concat(key, "/CLEAR_FILTER");
  var APPLY_FILTER = "".concat(key, "/APPLY_FILTER");
  var CLEAR_ALL_SETTINGS = "".concat(key, "/CLEAR_ALL_SETTINGS");
  var tablesOptionsInitialState = {
    filterState: filterState,
    filters: filters,
    filterOrig: filterOrig
  };

  var tableOptionsReducer = function tableOptionsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tablesOptionsInitialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case SET_FILTERS:
        return _objectSpread({}, state, {
          filters: action.filters
        });

      case OPEN_FILTER:
        return _objectSpread({}, state, {
          filterState: true,
          filterOrig: state.filters
        });

      case CLOSE_FILTER:
        return _objectSpread({}, state, {
          filterState: false,
          filters: state.filterOrig
        });

      case CLEAR_FILTER:
        return _objectSpread({}, state, {
          filterState: tablesOptionsInitialState.filterState,
          filters: tablesOptionsInitialState.filters
        });

      case APPLY_FILTER:
        return _objectSpread({}, state, {
          filterState: false,
          filterOrig: state.filters
        });

      case CLEAR_ALL_SETTINGS:
        return tablesOptionsInitialState;

      default:
        return state;
    }
  };

  var setFilters = function setFilters(_ref2) {
    var filters = _ref2.filters;
    return {
      type: SET_FILTERS,
      filters: filters
    };
  };

  var openFilter = function openFilter() {
    return {
      type: OPEN_FILTER
    };
  };

  var closeFilter = function closeFilter() {
    return {
      type: CLOSE_FILTER
    };
  };

  var clearFilter = function clearFilter() {
    return {
      type: CLEAR_FILTER
    };
  };

  var applyFilter = function applyFilter() {
    return {
      type: APPLY_FILTER
    };
  };

  var clearAllSettings = function clearAllSettings() {
    return {
      type: CLEAR_ALL_SETTINGS
    };
  };

  return {
    tableOptionsReducer: tableOptionsReducer,
    setFilters: setFilters,
    openFilter: openFilter,
    closeFilter: closeFilter,
    clearFilter: clearFilter,
    applyFilter: applyFilter,
    clearAllSettings: clearAllSettings
  };
};

var _default = tableReducer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9maWx0ZXJSZWR1Y2VyLnRzIl0sIm5hbWVzIjpbInRhYmxlUmVkdWNlciIsImtleSIsImZpbHRlclN0YXRlIiwiZmlsdGVycyIsImZpbHRlck9yaWciLCJTRVRfRklMVEVSUyIsIk9QRU5fRklMVEVSIiwiQ0xPU0VfRklMVEVSIiwiQ0xFQVJfRklMVEVSIiwiQVBQTFlfRklMVEVSIiwiQ0xFQVJfQUxMX1NFVFRJTkdTIiwidGFibGVzT3B0aW9uc0luaXRpYWxTdGF0ZSIsInRhYmxlT3B0aW9uc1JlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJzZXRGaWx0ZXJzIiwib3BlbkZpbHRlciIsImNsb3NlRmlsdGVyIiwiY2xlYXJGaWx0ZXIiLCJhcHBseUZpbHRlciIsImNsZWFyQWxsU2V0dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsT0FVZjtBQUFBLE1BVEpDLEdBU0ksUUFUSkEsR0FTSTtBQUFBLDhCQVJKQyxXQVFJO0FBQUEsTUFSSkEsV0FRSSxpQ0FSVSxLQVFWO0FBQUEsMEJBUEpDLE9BT0k7QUFBQSxNQVBKQSxPQU9JLDZCQVBNLEVBT047QUFBQSw2QkFOSkMsVUFNSTtBQUFBLE1BTkpBLFVBTUksZ0NBTlMsRUFNVDtBQUNKLE1BQU1DLFdBQVcsYUFBTUosR0FBTixpQkFBakI7QUFDQSxNQUFNSyxXQUFXLGFBQU1MLEdBQU4saUJBQWpCO0FBQ0EsTUFBTU0sWUFBWSxhQUFNTixHQUFOLGtCQUFsQjtBQUNBLE1BQU1PLFlBQVksYUFBTVAsR0FBTixrQkFBbEI7QUFDQSxNQUFNUSxZQUFZLGFBQU1SLEdBQU4sa0JBQWxCO0FBQ0EsTUFBTVMsa0JBQWtCLGFBQU1ULEdBQU4sd0JBQXhCO0FBRUEsTUFBTVUseUJBQXlCLEdBQUc7QUFDaENULElBQUFBLFdBQVcsRUFBWEEsV0FEZ0M7QUFFaENDLElBQUFBLE9BQU8sRUFBUEEsT0FGZ0M7QUFHaENDLElBQUFBLFVBQVUsRUFBVkE7QUFIZ0MsR0FBbEM7O0FBTUEsTUFBTVEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixHQUd2QjtBQUFBLFFBRkhDLEtBRUcsdUVBRktGLHlCQUVMO0FBQUEsUUFESEcsTUFDRzs7QUFDSCxZQUFRQSxNQUFNLENBQUNDLElBQWY7QUFDRSxXQUFLVixXQUFMO0FBQ0UsaUNBQ0tRLEtBREw7QUFFRVYsVUFBQUEsT0FBTyxFQUFFVyxNQUFNLENBQUNYO0FBRmxCOztBQUlGLFdBQUtHLFdBQUw7QUFDRSxpQ0FDS08sS0FETDtBQUVFWCxVQUFBQSxXQUFXLEVBQUUsSUFGZjtBQUdFRSxVQUFBQSxVQUFVLEVBQUVTLEtBQUssQ0FBQ1Y7QUFIcEI7O0FBS0YsV0FBS0ksWUFBTDtBQUNFLGlDQUNLTSxLQURMO0FBRUVYLFVBQUFBLFdBQVcsRUFBRSxLQUZmO0FBR0VDLFVBQUFBLE9BQU8sRUFBRVUsS0FBSyxDQUFDVDtBQUhqQjs7QUFLRixXQUFLSSxZQUFMO0FBQ0UsaUNBQ0tLLEtBREw7QUFFRVgsVUFBQUEsV0FBVyxFQUFFUyx5QkFBeUIsQ0FBQ1QsV0FGekM7QUFHRUMsVUFBQUEsT0FBTyxFQUFFUSx5QkFBeUIsQ0FBQ1I7QUFIckM7O0FBS0YsV0FBS00sWUFBTDtBQUNFLGlDQUNLSSxLQURMO0FBRUVYLFVBQUFBLFdBQVcsRUFBRSxLQUZmO0FBR0VFLFVBQUFBLFVBQVUsRUFBRVMsS0FBSyxDQUFDVjtBQUhwQjs7QUFLRixXQUFLTyxrQkFBTDtBQUNFLGVBQU9DLHlCQUFQOztBQUNGO0FBQ0UsZUFBT0UsS0FBUDtBQWpDSjtBQW1DRCxHQXZDRDs7QUF5Q0EsTUFBTUcsVUFBVSxHQUFHLFNBQWJBLFVBQWE7QUFBQSxRQUFHYixPQUFILFNBQUdBLE9BQUg7QUFBQSxXQUFvQztBQUNyRFksTUFBQUEsSUFBSSxFQUFFVixXQUQrQztBQUVyREYsTUFBQUEsT0FBTyxFQUFQQTtBQUZxRCxLQUFwQztBQUFBLEdBQW5COztBQUlBLE1BQU1jLFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUEsV0FBTztBQUN4QkYsTUFBQUEsSUFBSSxFQUFFVDtBQURrQixLQUFQO0FBQUEsR0FBbkI7O0FBR0EsTUFBTVksV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxXQUFPO0FBQ3pCSCxNQUFBQSxJQUFJLEVBQUVSO0FBRG1CLEtBQVA7QUFBQSxHQUFwQjs7QUFHQSxNQUFNWSxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLFdBQU87QUFDekJKLE1BQUFBLElBQUksRUFBRVA7QUFEbUIsS0FBUDtBQUFBLEdBQXBCOztBQUdBLE1BQU1ZLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsV0FBTztBQUN6QkwsTUFBQUEsSUFBSSxFQUFFTjtBQURtQixLQUFQO0FBQUEsR0FBcEI7O0FBR0EsTUFBTVksZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLFdBQU87QUFDOUJOLE1BQUFBLElBQUksRUFBRUw7QUFEd0IsS0FBUDtBQUFBLEdBQXpCOztBQUlBLFNBQU87QUFDTEUsSUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFESztBQUVMSSxJQUFBQSxVQUFVLEVBQVZBLFVBRks7QUFHTEMsSUFBQUEsVUFBVSxFQUFWQSxVQUhLO0FBSUxDLElBQUFBLFdBQVcsRUFBWEEsV0FKSztBQUtMQyxJQUFBQSxXQUFXLEVBQVhBLFdBTEs7QUFNTEMsSUFBQUEsV0FBVyxFQUFYQSxXQU5LO0FBT0xDLElBQUFBLGdCQUFnQixFQUFoQkE7QUFQSyxHQUFQO0FBU0QsQ0E5RkQ7O2VBZ0dlckIsWSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRhYmxlUmVkdWNlciA9ICh7XHJcbiAga2V5LFxyXG4gIGZpbHRlclN0YXRlID0gZmFsc2UsXHJcbiAgZmlsdGVycyA9IFtdLFxyXG4gIGZpbHRlck9yaWcgPSBbXVxyXG59OiB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgZmlsdGVyU3RhdGU/OiBib29sZWFuO1xyXG4gIGZpbHRlcnM/OiB7fTtcclxuICBmaWx0ZXJPcmlnPzogYW55W107XHJcbn0pID0+IHtcclxuICBjb25zdCBTRVRfRklMVEVSUyA9IGAke2tleX0vU0VUX0ZJTFRFUlNgO1xyXG4gIGNvbnN0IE9QRU5fRklMVEVSID0gYCR7a2V5fS9PUEVOX0ZJTFRFUmA7XHJcbiAgY29uc3QgQ0xPU0VfRklMVEVSID0gYCR7a2V5fS9DTE9TRV9GSUxURVJgO1xyXG4gIGNvbnN0IENMRUFSX0ZJTFRFUiA9IGAke2tleX0vQ0xFQVJfRklMVEVSYDtcclxuICBjb25zdCBBUFBMWV9GSUxURVIgPSBgJHtrZXl9L0FQUExZX0ZJTFRFUmA7XHJcbiAgY29uc3QgQ0xFQVJfQUxMX1NFVFRJTkdTID0gYCR7a2V5fS9DTEVBUl9BTExfU0VUVElOR1NgO1xyXG5cclxuICBjb25zdCB0YWJsZXNPcHRpb25zSW5pdGlhbFN0YXRlID0ge1xyXG4gICAgZmlsdGVyU3RhdGUsXHJcbiAgICBmaWx0ZXJzLFxyXG4gICAgZmlsdGVyT3JpZ1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHRhYmxlT3B0aW9uc1JlZHVjZXIgPSAoXHJcbiAgICBzdGF0ZSA9IHRhYmxlc09wdGlvbnNJbml0aWFsU3RhdGUsXHJcbiAgICBhY3Rpb246IGFueVxyXG4gICkgPT4ge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFNFVF9GSUxURVJTOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgIGZpbHRlcnM6IGFjdGlvbi5maWx0ZXJzXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSBPUEVOX0ZJTFRFUjpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICBmaWx0ZXJTdGF0ZTogdHJ1ZSxcclxuICAgICAgICAgIGZpbHRlck9yaWc6IHN0YXRlLmZpbHRlcnNcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlIENMT1NFX0ZJTFRFUjpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICBmaWx0ZXJTdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJPcmlnXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSBDTEVBUl9GSUxURVI6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgZmlsdGVyU3RhdGU6IHRhYmxlc09wdGlvbnNJbml0aWFsU3RhdGUuZmlsdGVyU3RhdGUsXHJcbiAgICAgICAgICBmaWx0ZXJzOiB0YWJsZXNPcHRpb25zSW5pdGlhbFN0YXRlLmZpbHRlcnNcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlIEFQUExZX0ZJTFRFUjpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICBmaWx0ZXJTdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICBmaWx0ZXJPcmlnOiBzdGF0ZS5maWx0ZXJzXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSBDTEVBUl9BTExfU0VUVElOR1M6XHJcbiAgICAgICAgcmV0dXJuIHRhYmxlc09wdGlvbnNJbml0aWFsU3RhdGU7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNldEZpbHRlcnMgPSAoeyBmaWx0ZXJzIH06IHsgZmlsdGVyczogYW55IH0pID0+ICh7XHJcbiAgICB0eXBlOiBTRVRfRklMVEVSUyxcclxuICAgIGZpbHRlcnNcclxuICB9KTtcclxuICBjb25zdCBvcGVuRmlsdGVyID0gKCkgPT4gKHtcclxuICAgIHR5cGU6IE9QRU5fRklMVEVSXHJcbiAgfSk7XHJcbiAgY29uc3QgY2xvc2VGaWx0ZXIgPSAoKSA9PiAoe1xyXG4gICAgdHlwZTogQ0xPU0VfRklMVEVSXHJcbiAgfSk7XHJcbiAgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiAoe1xyXG4gICAgdHlwZTogQ0xFQVJfRklMVEVSXHJcbiAgfSk7XHJcbiAgY29uc3QgYXBwbHlGaWx0ZXIgPSAoKSA9PiAoe1xyXG4gICAgdHlwZTogQVBQTFlfRklMVEVSXHJcbiAgfSk7XHJcbiAgY29uc3QgY2xlYXJBbGxTZXR0aW5ncyA9ICgpID0+ICh7XHJcbiAgICB0eXBlOiBDTEVBUl9BTExfU0VUVElOR1NcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRhYmxlT3B0aW9uc1JlZHVjZXIsXHJcbiAgICBzZXRGaWx0ZXJzLFxyXG4gICAgb3BlbkZpbHRlcixcclxuICAgIGNsb3NlRmlsdGVyLFxyXG4gICAgY2xlYXJGaWx0ZXIsXHJcbiAgICBhcHBseUZpbHRlcixcclxuICAgIGNsZWFyQWxsU2V0dGluZ3NcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFibGVSZWR1Y2VyO1xyXG4iXX0=