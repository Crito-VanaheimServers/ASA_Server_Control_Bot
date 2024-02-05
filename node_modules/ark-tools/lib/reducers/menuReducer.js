"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var menuReducer = function menuReducer(_ref) {
  var key = _ref.key;
  var TOGGLE_MENU_STATE = "".concat(key, "/TOGGLE_MENU_STATE");
  var TOGGLE_PINNED_STATE = "".concat(key, "/TOGGLE_PINNED_STATE");
  var menuReducerState = {
    open: false,
    pinned: false
  };

  var menuStateReducer = function menuStateReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : menuReducerState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case TOGGLE_MENU_STATE:
        return R.evolve({
          open: R.not
        }, state);

      case TOGGLE_PINNED_STATE:
        return R.evolve({
          pinned: R.not
        }, state);

      default:
        return menuReducerState;
    }
  };

  var toggleMenu = function toggleMenu() {
    return {
      type: TOGGLE_MENU_STATE
    };
  };

  var togglePinned = function togglePinned() {
    return {
      type: TOGGLE_PINNED_STATE
    };
  };

  return {
    menuStateReducer: menuStateReducer,
    toggleMenu: toggleMenu,
    togglePinned: togglePinned
  };
};

var _default = menuReducer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tZW51UmVkdWNlci50cyJdLCJuYW1lcyI6WyJtZW51UmVkdWNlciIsImtleSIsIlRPR0dMRV9NRU5VX1NUQVRFIiwiVE9HR0xFX1BJTk5FRF9TVEFURSIsIm1lbnVSZWR1Y2VyU3RhdGUiLCJvcGVuIiwicGlubmVkIiwibWVudVN0YXRlUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIlIiLCJldm9sdmUiLCJub3QiLCJ0b2dnbGVNZW51IiwidG9nZ2xlUGlubmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxPQUE4QjtBQUFBLE1BQTNCQyxHQUEyQixRQUEzQkEsR0FBMkI7QUFDaEQsTUFBTUMsaUJBQWlCLGFBQU1ELEdBQU4sdUJBQXZCO0FBQ0EsTUFBTUUsbUJBQW1CLGFBQU1GLEdBQU4seUJBQXpCO0FBRUEsTUFBTUcsZ0JBQWdCLEdBQUc7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZUMsSUFBQUEsTUFBTSxFQUFFO0FBQXZCLEdBQXpCOztBQUVBLE1BQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsR0FBMkM7QUFBQSxRQUExQ0MsS0FBMEMsdUVBQWxDSixnQkFBa0M7QUFBQSxRQUFoQkssTUFBZ0I7O0FBQ2xFLFlBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtBQUNFLFdBQUtSLGlCQUFMO0FBQ0UsZUFBT1MsQ0FBQyxDQUFDQyxNQUFGLENBQVM7QUFBRVAsVUFBQUEsSUFBSSxFQUFFTSxDQUFDLENBQUNFO0FBQVYsU0FBVCxFQUEwQkwsS0FBMUIsQ0FBUDs7QUFDRixXQUFLTCxtQkFBTDtBQUNFLGVBQU9RLENBQUMsQ0FBQ0MsTUFBRixDQUFTO0FBQUVOLFVBQUFBLE1BQU0sRUFBRUssQ0FBQyxDQUFDRTtBQUFaLFNBQVQsRUFBNEJMLEtBQTVCLENBQVA7O0FBQ0Y7QUFDRSxlQUFPSixnQkFBUDtBQU5KO0FBUUQsR0FURDs7QUFXQSxNQUFNVSxVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLFdBQU87QUFBRUosTUFBQUEsSUFBSSxFQUFFUjtBQUFSLEtBQVA7QUFBQSxHQUFuQjs7QUFDQSxNQUFNYSxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLFdBQU87QUFBRUwsTUFBQUEsSUFBSSxFQUFFUDtBQUFSLEtBQVA7QUFBQSxHQUFyQjs7QUFFQSxTQUFPO0FBQ0xJLElBQUFBLGdCQUFnQixFQUFoQkEsZ0JBREs7QUFFTE8sSUFBQUEsVUFBVSxFQUFWQSxVQUZLO0FBR0xDLElBQUFBLFlBQVksRUFBWkE7QUFISyxHQUFQO0FBS0QsQ0F6QkQ7O2VBMkJlZixXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcclxuXHJcbmNvbnN0IG1lbnVSZWR1Y2VyID0gKHsga2V5IH06IHsga2V5OiBzdHJpbmcgfSkgPT4ge1xyXG4gIGNvbnN0IFRPR0dMRV9NRU5VX1NUQVRFID0gYCR7a2V5fS9UT0dHTEVfTUVOVV9TVEFURWA7XHJcbiAgY29uc3QgVE9HR0xFX1BJTk5FRF9TVEFURSA9IGAke2tleX0vVE9HR0xFX1BJTk5FRF9TVEFURWA7XHJcblxyXG4gIGNvbnN0IG1lbnVSZWR1Y2VyU3RhdGUgPSB7IG9wZW46IGZhbHNlLCBwaW5uZWQ6IGZhbHNlIH07XHJcblxyXG4gIGNvbnN0IG1lbnVTdGF0ZVJlZHVjZXIgPSAoc3RhdGUgPSBtZW51UmVkdWNlclN0YXRlLCBhY3Rpb246IGFueSkgPT4ge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFRPR0dMRV9NRU5VX1NUQVRFOlxyXG4gICAgICAgIHJldHVybiBSLmV2b2x2ZSh7IG9wZW46IFIubm90IH0sIHN0YXRlKTtcclxuICAgICAgY2FzZSBUT0dHTEVfUElOTkVEX1NUQVRFOlxyXG4gICAgICAgIHJldHVybiBSLmV2b2x2ZSh7IHBpbm5lZDogUi5ub3QgfSwgc3RhdGUpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBtZW51UmVkdWNlclN0YXRlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKSA9PiAoeyB0eXBlOiBUT0dHTEVfTUVOVV9TVEFURSB9KTtcclxuICBjb25zdCB0b2dnbGVQaW5uZWQgPSAoKSA9PiAoeyB0eXBlOiBUT0dHTEVfUElOTkVEX1NUQVRFIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbWVudVN0YXRlUmVkdWNlcixcclxuICAgIHRvZ2dsZU1lbnUsXHJcbiAgICB0b2dnbGVQaW5uZWRcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVudVJlZHVjZXI7XHJcbiJdfQ==