"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("react-dates/initialize");

var _recompose = require("recompose");

var _moment = _interopRequireDefault(require("moment"));

var _reactDates = require("react-dates");

require("react-dates/lib/css/_datepicker.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function DatePicker(_ref) {
  var start = _ref.start,
      end = _ref.end,
      updateRange = _ref.updateRange,
      setFocusedInput = _ref.setFocusedInput,
      format = _ref.format,
      focusedInput = _ref.focusedInput,
      _ref$startPlaceHolder = _ref.startPlaceHolder,
      startPlaceHolder = _ref$startPlaceHolder === void 0 ? "From Date" : _ref$startPlaceHolder,
      _ref$endPlaceHolder = _ref.endPlaceHolder,
      endPlaceHolder = _ref$endPlaceHolder === void 0 ? "To Date" : _ref$endPlaceHolder,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? "datePicker" : _ref$id;
  return _react.default.createElement(_reactDates.DateRangePicker, {
    startDate: start,
    startDatePlaceholderText: startPlaceHolder,
    startDateId: "".concat(id, "_fromDate"),
    endDate: end,
    endDatePlaceholderText: endPlaceHolder,
    endDateId: "".concat(id, "_toDate"),
    onDatesChange: updateRange,
    focusedInput: focusedInput,
    onFocusChange: setFocusedInput,
    showClearDates: true,
    small: true,
    isOutsideRange: function isOutsideRange() {
      return false;
    },
    hideKeyboardShortcutsPanel: true,
    displayFormat: format
  });
};

var setRange = function setRange(_ref2) {
  var startDate = _ref2.startDate,
      endDate = _ref2.endDate,
      updateStart = _ref2.updateStart,
      updateEnd = _ref2.updateEnd,
      setDate = _ref2.setDate,
      format = _ref2.format;
  updateStart(startDate);
  updateEnd(endDate);

  if (startDate !== null && endDate !== null) {
    setDate({
      startDate: (0, _moment.default)(startDate).format(format),
      endDate: (0, _moment.default)(endDate).format(format)
    });
  } else if (startDate === null && endDate === null) {
    setDate({
      startDate: null,
      endDate: null
    });
  }
};

var _default = (0, _recompose.compose)((0, _recompose.withState)("focusedInput", "updateFocusedInput", null), (0, _recompose.withHandlers)({
  updateRange: function updateRange(_ref3) {
    var updateStart = _ref3.updateStart,
        updateEnd = _ref3.updateEnd,
        setDate = _ref3.setDate,
        format = _ref3.format;
    return function (_ref4) {
      var startDate = _ref4.startDate,
          endDate = _ref4.endDate;
      return setRange({
        startDate: startDate,
        endDate: endDate,
        updateStart: updateStart,
        updateEnd: updateEnd,
        setDate: setDate,
        format: format
      });
    };
  },
  setFocusedInput: function setFocusedInput(props) {
    return function (focusedInput) {
      return props.updateFocusedInput(focusedInput);
    };
  }
}))(DatePicker);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RhdGVSYW5nZS9kYXRlUmFuZ2UudHN4Il0sIm5hbWVzIjpbIkRhdGVQaWNrZXIiLCJzdGFydCIsImVuZCIsInVwZGF0ZVJhbmdlIiwic2V0Rm9jdXNlZElucHV0IiwiZm9ybWF0IiwiZm9jdXNlZElucHV0Iiwic3RhcnRQbGFjZUhvbGRlciIsImVuZFBsYWNlSG9sZGVyIiwiaWQiLCJzZXRSYW5nZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJ1cGRhdGVTdGFydCIsInVwZGF0ZUVuZCIsInNldERhdGUiLCJwcm9wcyIsInVwZGF0ZUZvY3VzZWRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVBQWE7QUFBQSxNQUNqQkMsS0FEaUIsUUFDakJBLEtBRGlCO0FBQUEsTUFFakJDLEdBRmlCLFFBRWpCQSxHQUZpQjtBQUFBLE1BR2pCQyxXQUhpQixRQUdqQkEsV0FIaUI7QUFBQSxNQUlqQkMsZUFKaUIsUUFJakJBLGVBSmlCO0FBQUEsTUFLakJDLE1BTGlCLFFBS2pCQSxNQUxpQjtBQUFBLE1BTWpCQyxZQU5pQixRQU1qQkEsWUFOaUI7QUFBQSxtQ0FPakJDLGdCQVBpQjtBQUFBLE1BT2pCQSxnQkFQaUIsc0NBT0UsV0FQRjtBQUFBLGlDQVFqQkMsY0FSaUI7QUFBQSxNQVFqQkEsY0FSaUIsb0NBUUEsU0FSQTtBQUFBLHFCQVNqQkMsRUFUaUI7QUFBQSxNQVNqQkEsRUFUaUIsd0JBU1osWUFUWTtBQUFBLFNBV2pCLDZCQUFDLDJCQUFEO0FBQ0UsSUFBQSxTQUFTLEVBQUVSLEtBRGI7QUFFRSxJQUFBLHdCQUF3QixFQUFFTSxnQkFGNUI7QUFHRSxJQUFBLFdBQVcsWUFBS0UsRUFBTCxjQUhiO0FBSUUsSUFBQSxPQUFPLEVBQUVQLEdBSlg7QUFLRSxJQUFBLHNCQUFzQixFQUFFTSxjQUwxQjtBQU1FLElBQUEsU0FBUyxZQUFLQyxFQUFMLFlBTlg7QUFPRSxJQUFBLGFBQWEsRUFBRU4sV0FQakI7QUFRRSxJQUFBLFlBQVksRUFBRUcsWUFSaEI7QUFTRSxJQUFBLGFBQWEsRUFBRUYsZUFUakI7QUFVRSxJQUFBLGNBQWMsTUFWaEI7QUFXRSxJQUFBLEtBQUssTUFYUDtBQVlFLElBQUEsY0FBYyxFQUFFO0FBQUEsYUFBTSxLQUFOO0FBQUEsS0FabEI7QUFhRSxJQUFBLDBCQUEwQixNQWI1QjtBQWNFLElBQUEsYUFBYSxFQUFFQztBQWRqQixJQVhpQjtBQUFBLENBQW5COztBQThDQSxJQUFNSyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxRQWNYO0FBQUEsTUFiSkMsU0FhSSxTQWJKQSxTQWFJO0FBQUEsTUFaSkMsT0FZSSxTQVpKQSxPQVlJO0FBQUEsTUFYSkMsV0FXSSxTQVhKQSxXQVdJO0FBQUEsTUFWSkMsU0FVSSxTQVZKQSxTQVVJO0FBQUEsTUFUSkMsT0FTSSxTQVRKQSxPQVNJO0FBQUEsTUFSSlYsTUFRSSxTQVJKQSxNQVFJO0FBQ0pRLEVBQUFBLFdBQVcsQ0FBQ0YsU0FBRCxDQUFYO0FBQ0FHLEVBQUFBLFNBQVMsQ0FBQ0YsT0FBRCxDQUFUOztBQUNBLE1BQUlELFNBQVMsS0FBSyxJQUFkLElBQXNCQyxPQUFPLEtBQUssSUFBdEMsRUFBNEM7QUFDMUNHLElBQUFBLE9BQU8sQ0FBQztBQUNOSixNQUFBQSxTQUFTLEVBQUUscUJBQU9BLFNBQVAsRUFBa0JOLE1BQWxCLENBQXlCQSxNQUF6QixDQURMO0FBRU5PLE1BQUFBLE9BQU8sRUFBRSxxQkFBT0EsT0FBUCxFQUFnQlAsTUFBaEIsQ0FBdUJBLE1BQXZCO0FBRkgsS0FBRCxDQUFQO0FBSUQsR0FMRCxNQUtPLElBQUlNLFNBQVMsS0FBSyxJQUFkLElBQXNCQyxPQUFPLEtBQUssSUFBdEMsRUFBNEM7QUFDakRHLElBQUFBLE9BQU8sQ0FBQztBQUFFSixNQUFBQSxTQUFTLEVBQUUsSUFBYjtBQUFtQkMsTUFBQUEsT0FBTyxFQUFFO0FBQTVCLEtBQUQsQ0FBUDtBQUNEO0FBQ0YsQ0F6QkQ7O2VBMkJlLHdCQUNiLDBCQUFVLGNBQVYsRUFBMEIsb0JBQTFCLEVBQWdELElBQWhELENBRGEsRUFFYiw2QkFBYTtBQUNYVCxFQUFBQSxXQUFXLEVBQUU7QUFBQSxRQUNYVSxXQURXLFNBQ1hBLFdBRFc7QUFBQSxRQUVYQyxTQUZXLFNBRVhBLFNBRlc7QUFBQSxRQUdYQyxPQUhXLFNBR1hBLE9BSFc7QUFBQSxRQUlYVixNQUpXLFNBSVhBLE1BSlc7QUFBQSxXQVVQO0FBQUEsVUFBR00sU0FBSCxTQUFHQSxTQUFIO0FBQUEsVUFBY0MsT0FBZCxTQUFjQSxPQUFkO0FBQUEsYUFDSkYsUUFBUSxDQUFDO0FBQ1BDLFFBQUFBLFNBQVMsRUFBVEEsU0FETztBQUVQQyxRQUFBQSxPQUFPLEVBQVBBLE9BRk87QUFHUEMsUUFBQUEsV0FBVyxFQUFYQSxXQUhPO0FBSVBDLFFBQUFBLFNBQVMsRUFBVEEsU0FKTztBQUtQQyxRQUFBQSxPQUFPLEVBQVBBLE9BTE87QUFNUFYsUUFBQUEsTUFBTSxFQUFOQTtBQU5PLE9BQUQsQ0FESjtBQUFBLEtBVk87QUFBQSxHQURGO0FBb0JYRCxFQUFBQSxlQUFlLEVBQUUseUJBQUNZLEtBQUQ7QUFBQSxXQUFnQixVQUFDVixZQUFEO0FBQUEsYUFDL0JVLEtBQUssQ0FBQ0Msa0JBQU4sQ0FBeUJYLFlBQXpCLENBRCtCO0FBQUEsS0FBaEI7QUFBQTtBQXBCTixDQUFiLENBRmEsRUF5QmJOLFVBekJhLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBcInJlYWN0LWRhdGVzL2luaXRpYWxpemVcIjtcclxuaW1wb3J0IHsgY29tcG9zZSwgd2l0aEhhbmRsZXJzLCB3aXRoU3RhdGUgfSBmcm9tIFwicmVjb21wb3NlXCI7XHJcbmltcG9ydCBtb21lbnQsIHsgTW9tZW50IH0gZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgeyBEYXRlUmFuZ2VQaWNrZXIgfSBmcm9tIFwicmVhY3QtZGF0ZXNcIjtcclxuaW1wb3J0IFwicmVhY3QtZGF0ZXMvbGliL2Nzcy9fZGF0ZXBpY2tlci5jc3NcIjtcclxuXHJcbmNvbnN0IERhdGVQaWNrZXIgPSAoe1xyXG4gIHN0YXJ0LFxyXG4gIGVuZCxcclxuICB1cGRhdGVSYW5nZSxcclxuICBzZXRGb2N1c2VkSW5wdXQsXHJcbiAgZm9ybWF0LFxyXG4gIGZvY3VzZWRJbnB1dCxcclxuICBzdGFydFBsYWNlSG9sZGVyID0gXCJGcm9tIERhdGVcIixcclxuICBlbmRQbGFjZUhvbGRlciA9IFwiVG8gRGF0ZVwiLFxyXG4gIGlkID0gXCJkYXRlUGlja2VyXCJcclxufTogT3V0cHV0UHJvcHMpID0+IChcclxuICA8RGF0ZVJhbmdlUGlja2VyXHJcbiAgICBzdGFydERhdGU9e3N0YXJ0fVxyXG4gICAgc3RhcnREYXRlUGxhY2Vob2xkZXJUZXh0PXtzdGFydFBsYWNlSG9sZGVyfVxyXG4gICAgc3RhcnREYXRlSWQ9e2Ake2lkfV9mcm9tRGF0ZWB9XHJcbiAgICBlbmREYXRlPXtlbmR9XHJcbiAgICBlbmREYXRlUGxhY2Vob2xkZXJUZXh0PXtlbmRQbGFjZUhvbGRlcn1cclxuICAgIGVuZERhdGVJZD17YCR7aWR9X3RvRGF0ZWB9XHJcbiAgICBvbkRhdGVzQ2hhbmdlPXt1cGRhdGVSYW5nZX1cclxuICAgIGZvY3VzZWRJbnB1dD17Zm9jdXNlZElucHV0fVxyXG4gICAgb25Gb2N1c0NoYW5nZT17c2V0Rm9jdXNlZElucHV0fVxyXG4gICAgc2hvd0NsZWFyRGF0ZXNcclxuICAgIHNtYWxsXHJcbiAgICBpc091dHNpZGVSYW5nZT17KCkgPT4gZmFsc2V9XHJcbiAgICBoaWRlS2V5Ym9hcmRTaG9ydGN1dHNQYW5lbFxyXG4gICAgZGlzcGxheUZvcm1hdD17Zm9ybWF0fVxyXG4gIC8+XHJcbik7XHJcblxyXG5leHBvcnQgdHlwZSBJbnB1dFByb3BzID0ge1xyXG4gIHN0YXJ0OiBNb21lbnQgfCBudWxsO1xyXG4gIHVwZGF0ZVN0YXJ0OiBhbnk7XHJcbiAgZW5kOiBNb21lbnQgfCBudWxsO1xyXG4gIHVwZGF0ZUVuZDogYW55O1xyXG4gIHNldERhdGU6IGFueTtcclxuICBmb3JtYXQ6IHN0cmluZztcclxuICBzdGFydFBsYWNlSG9sZGVyPzogc3RyaW5nO1xyXG4gIGVuZFBsYWNlSG9sZGVyPzogc3RyaW5nO1xyXG4gIGlkPzogc3RyaW5nO1xyXG59O1xyXG5leHBvcnQgdHlwZSBPdXRwdXRQcm9wcyA9IElucHV0UHJvcHMgJiB7XHJcbiAgdXBkYXRlUmFuZ2U6IGFueTtcclxuICBzZXRGb2N1c2VkSW5wdXQ6IGFueTtcclxuICBmb2N1c2VkSW5wdXQ6IGFueTtcclxufTtcclxuXHJcbmNvbnN0IHNldFJhbmdlID0gKHtcclxuICBzdGFydERhdGUsXHJcbiAgZW5kRGF0ZSxcclxuICB1cGRhdGVTdGFydCxcclxuICB1cGRhdGVFbmQsXHJcbiAgc2V0RGF0ZSxcclxuICBmb3JtYXRcclxufToge1xyXG4gIHN0YXJ0RGF0ZTogYW55O1xyXG4gIGVuZERhdGU6IGFueTtcclxuICB1cGRhdGVTdGFydDogYW55O1xyXG4gIHVwZGF0ZUVuZDogYW55O1xyXG4gIHNldERhdGU6IGFueTtcclxuICBmb3JtYXQ6IHN0cmluZztcclxufSkgPT4ge1xyXG4gIHVwZGF0ZVN0YXJ0KHN0YXJ0RGF0ZSk7XHJcbiAgdXBkYXRlRW5kKGVuZERhdGUpO1xyXG4gIGlmIChzdGFydERhdGUgIT09IG51bGwgJiYgZW5kRGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgc2V0RGF0ZSh7XHJcbiAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KHN0YXJ0RGF0ZSkuZm9ybWF0KGZvcm1hdCksXHJcbiAgICAgIGVuZERhdGU6IG1vbWVudChlbmREYXRlKS5mb3JtYXQoZm9ybWF0KVxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChzdGFydERhdGUgPT09IG51bGwgJiYgZW5kRGF0ZSA9PT0gbnVsbCkge1xyXG4gICAgc2V0RGF0ZSh7IHN0YXJ0RGF0ZTogbnVsbCwgZW5kRGF0ZTogbnVsbCB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlPE91dHB1dFByb3BzLCBJbnB1dFByb3BzPihcclxuICB3aXRoU3RhdGUoXCJmb2N1c2VkSW5wdXRcIiwgXCJ1cGRhdGVGb2N1c2VkSW5wdXRcIiwgbnVsbCksXHJcbiAgd2l0aEhhbmRsZXJzKHtcclxuICAgIHVwZGF0ZVJhbmdlOiAoe1xyXG4gICAgICB1cGRhdGVTdGFydCxcclxuICAgICAgdXBkYXRlRW5kLFxyXG4gICAgICBzZXREYXRlLFxyXG4gICAgICBmb3JtYXRcclxuICAgIH06IHtcclxuICAgICAgdXBkYXRlU3RhcnQ6IGFueTtcclxuICAgICAgdXBkYXRlRW5kOiBhbnk7XHJcbiAgICAgIHNldERhdGU6IGFueTtcclxuICAgICAgZm9ybWF0OiBzdHJpbmc7XHJcbiAgICB9KSA9PiAoeyBzdGFydERhdGUsIGVuZERhdGUgfTogUmVjb3JkPFwic3RhcnREYXRlXCIgfCBcImVuZERhdGVcIiwgc3RyaW5nPikgPT5cclxuICAgICAgc2V0UmFuZ2Uoe1xyXG4gICAgICAgIHN0YXJ0RGF0ZSxcclxuICAgICAgICBlbmREYXRlLFxyXG4gICAgICAgIHVwZGF0ZVN0YXJ0LFxyXG4gICAgICAgIHVwZGF0ZUVuZCxcclxuICAgICAgICBzZXREYXRlLFxyXG4gICAgICAgIGZvcm1hdFxyXG4gICAgICB9KSxcclxuICAgIHNldEZvY3VzZWRJbnB1dDogKHByb3BzOiBhbnkpID0+IChmb2N1c2VkSW5wdXQ6IHN0cmluZykgPT5cclxuICAgICAgcHJvcHMudXBkYXRlRm9jdXNlZElucHV0KGZvY3VzZWRJbnB1dClcclxuICB9KVxyXG4pKERhdGVQaWNrZXIpO1xyXG4iXX0=