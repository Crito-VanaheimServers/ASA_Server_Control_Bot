"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("react-dates/initialize");

var R = _interopRequireWildcard(require("ramda"));

var _recompose = require("recompose");

var _reactDates = require("react-dates");

require("react-dates/lib/css/_datepicker.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OnlyLabelName = function OnlyLabelName(_ref) {
  var labelName = _ref.labelName;
  return _react.default.createElement("label", {
    htmlFor: "select"
  }, _react.default.createElement("b", null, labelName));
};

var RequiredLabelName = function RequiredLabelName(_ref2) {
  var labelName = _ref2.labelName,
      requiredFieldText = _ref2.requiredFieldText;
  return _react.default.createElement("label", {
    htmlFor: "select"
  }, _react.default.createElement("div", {
    className: "requiredLabel"
  }, _react.default.createElement("b", null, labelName), _react.default.createElement("div", {
    className: "required"
  }, requiredFieldText)));
};

var DatePicker = function DatePicker(_ref3) {
  var labelName = _ref3.labelName,
      requiredFieldText = _ref3.requiredFieldText,
      value = _ref3.value,
      _ref3$id = _ref3.id,
      id = _ref3$id === void 0 ? "arkDatePicker" : _ref3$id,
      changeData = _ref3.changeData,
      focusedInput = _ref3.focusedInput,
      setFocusedInput = _ref3.setFocusedInput,
      format = _ref3.format,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      _ref3$readOnly = _ref3.readOnly,
      readOnly = _ref3$readOnly === void 0 ? false : _ref3$readOnly,
      _ref3$placeHolder = _ref3.placeHolder,
      placeHolder = _ref3$placeHolder === void 0 ? "Choose Date" : _ref3$placeHolder,
      _ref3$withPortal = _ref3.withPortal,
      withPortal = _ref3$withPortal === void 0 ? false : _ref3$withPortal,
      _ref3$numberOfMonths = _ref3.numberOfMonths,
      numberOfMonths = _ref3$numberOfMonths === void 0 ? 1 : _ref3$numberOfMonths;
  return _react.default.createElement(_react.default.Fragment, null, !R.isEmpty(labelName) && R.isEmpty(requiredFieldText) ? _react.default.createElement(OnlyLabelName, {
    labelName: labelName
  }) : null, !R.isEmpty(labelName) && !R.isEmpty(requiredFieldText) ? _react.default.createElement(RequiredLabelName, {
    labelName: labelName,
    requiredFieldText: requiredFieldText
  }) : null, _react.default.createElement(_reactDates.SingleDatePicker, {
    id: id,
    date: value,
    focused: focusedInput,
    onDateChange: changeData,
    onFocusChange: setFocusedInput,
    showClearDate: true,
    small: true,
    disabled: disabled,
    readOnly: readOnly,
    hideKeyboardShortcutsPanel: true,
    displayFormat: format,
    numberOfMonths: numberOfMonths,
    withPortal: withPortal,
    placeholder: placeHolder
  }));
};

var _default = (0, _recompose.compose)((0, _recompose.withState)("focusedInput", "updateFocusedInput", false), (0, _recompose.withHandlers)({
  changeData: function changeData(_ref4) {
    var update = _ref4.update;
    return function (val) {
      return update(val);
    };
  },
  setFocusedInput: function setFocusedInput(props) {
    return function (_ref5) {
      var focused = _ref5.focused;
      return props.updateFocusedInput(focused);
    };
  }
}))(DatePicker);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RhdGVQaWNrZXIvZGF0ZVBpY2tlci50c3giXSwibmFtZXMiOlsiT25seUxhYmVsTmFtZSIsImxhYmVsTmFtZSIsIlJlcXVpcmVkTGFiZWxOYW1lIiwicmVxdWlyZWRGaWVsZFRleHQiLCJEYXRlUGlja2VyIiwidmFsdWUiLCJpZCIsImNoYW5nZURhdGEiLCJmb2N1c2VkSW5wdXQiLCJzZXRGb2N1c2VkSW5wdXQiLCJmb3JtYXQiLCJkaXNhYmxlZCIsInJlYWRPbmx5IiwicGxhY2VIb2xkZXIiLCJ3aXRoUG9ydGFsIiwibnVtYmVyT2ZNb250aHMiLCJSIiwiaXNFbXB0eSIsInVwZGF0ZSIsInZhbCIsInByb3BzIiwiZm9jdXNlZCIsInVwZGF0ZUZvY3VzZWRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsTUFBR0MsU0FBSCxRQUFHQSxTQUFIO0FBQUEsU0FDcEI7QUFBTyxJQUFBLE9BQU8sRUFBQztBQUFmLEtBQ0Usd0NBQUlBLFNBQUosQ0FERixDQURvQjtBQUFBLENBQXRCOztBQU1BLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0I7QUFBQSxNQUN4QkQsU0FEd0IsU0FDeEJBLFNBRHdCO0FBQUEsTUFFeEJFLGlCQUZ3QixTQUV4QkEsaUJBRndCO0FBQUEsU0FPeEI7QUFBTyxJQUFBLE9BQU8sRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0Usd0NBQUlGLFNBQUosQ0FERixFQUVFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUEyQkUsaUJBQTNCLENBRkYsQ0FERixDQVB3QjtBQUFBLENBQTFCOztBQWVBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUEsTUFDakJILFNBRGlCLFNBQ2pCQSxTQURpQjtBQUFBLE1BRWpCRSxpQkFGaUIsU0FFakJBLGlCQUZpQjtBQUFBLE1BR2pCRSxLQUhpQixTQUdqQkEsS0FIaUI7QUFBQSx1QkFJakJDLEVBSmlCO0FBQUEsTUFJakJBLEVBSmlCLHlCQUlaLGVBSlk7QUFBQSxNQUtqQkMsVUFMaUIsU0FLakJBLFVBTGlCO0FBQUEsTUFNakJDLFlBTmlCLFNBTWpCQSxZQU5pQjtBQUFBLE1BT2pCQyxlQVBpQixTQU9qQkEsZUFQaUI7QUFBQSxNQVFqQkMsTUFSaUIsU0FRakJBLE1BUmlCO0FBQUEsNkJBU2pCQyxRQVRpQjtBQUFBLE1BU2pCQSxRQVRpQiwrQkFTTixLQVRNO0FBQUEsNkJBVWpCQyxRQVZpQjtBQUFBLE1BVWpCQSxRQVZpQiwrQkFVTixLQVZNO0FBQUEsZ0NBV2pCQyxXQVhpQjtBQUFBLE1BV2pCQSxXQVhpQixrQ0FXSCxhQVhHO0FBQUEsK0JBWWpCQyxVQVppQjtBQUFBLE1BWWpCQSxVQVppQixpQ0FZSixLQVpJO0FBQUEsbUNBYWpCQyxjQWJpQjtBQUFBLE1BYWpCQSxjQWJpQixxQ0FhQSxDQWJBO0FBQUEsU0FlakIsNERBQ0csQ0FBQ0MsQ0FBQyxDQUFDQyxPQUFGLENBQVVoQixTQUFWLENBQUQsSUFBeUJlLENBQUMsQ0FBQ0MsT0FBRixDQUFVZCxpQkFBVixDQUF6QixHQUNDLDZCQUFDLGFBQUQ7QUFBZSxJQUFBLFNBQVMsRUFBRUY7QUFBMUIsSUFERCxHQUVHLElBSE4sRUFJRyxDQUFDZSxDQUFDLENBQUNDLE9BQUYsQ0FBVWhCLFNBQVYsQ0FBRCxJQUF5QixDQUFDZSxDQUFDLENBQUNDLE9BQUYsQ0FBVWQsaUJBQVYsQ0FBMUIsR0FDQyw2QkFBQyxpQkFBRDtBQUNFLElBQUEsU0FBUyxFQUFFRixTQURiO0FBRUUsSUFBQSxpQkFBaUIsRUFBRUU7QUFGckIsSUFERCxHQUtHLElBVE4sRUFVRSw2QkFBQyw0QkFBRDtBQUNFLElBQUEsRUFBRSxFQUFFRyxFQUROO0FBRUUsSUFBQSxJQUFJLEVBQUVELEtBRlI7QUFHRSxJQUFBLE9BQU8sRUFBRUcsWUFIWDtBQUlFLElBQUEsWUFBWSxFQUFFRCxVQUpoQjtBQUtFLElBQUEsYUFBYSxFQUFFRSxlQUxqQjtBQU1FLElBQUEsYUFBYSxNQU5mO0FBT0UsSUFBQSxLQUFLLE1BUFA7QUFRRSxJQUFBLFFBQVEsRUFBRUUsUUFSWjtBQVNFLElBQUEsUUFBUSxFQUFFQyxRQVRaO0FBVUUsSUFBQSwwQkFBMEIsTUFWNUI7QUFXRSxJQUFBLGFBQWEsRUFBRUYsTUFYakI7QUFZRSxJQUFBLGNBQWMsRUFBRUssY0FabEI7QUFhRSxJQUFBLFVBQVUsRUFBRUQsVUFiZDtBQWNFLElBQUEsV0FBVyxFQUFFRDtBQWRmLElBVkYsQ0FmaUI7QUFBQSxDQUFuQjs7ZUErRGUsd0JBQ2IsMEJBQVUsY0FBVixFQUEwQixvQkFBMUIsRUFBZ0QsS0FBaEQsQ0FEYSxFQUViLDZCQUFhO0FBQ1hOLEVBQUFBLFVBQVUsRUFBRTtBQUFBLFFBQUdXLE1BQUgsU0FBR0EsTUFBSDtBQUFBLFdBQWlDLFVBQUNDLEdBQUQ7QUFBQSxhQUFjRCxNQUFNLENBQUNDLEdBQUQsQ0FBcEI7QUFBQSxLQUFqQztBQUFBLEdBREQ7QUFFWFYsRUFBQUEsZUFBZSxFQUFFLHlCQUFDVyxLQUFEO0FBQUEsV0FBZ0I7QUFBQSxVQUFHQyxPQUFILFNBQUdBLE9BQUg7QUFBQSxhQUMvQkQsS0FBSyxDQUFDRSxrQkFBTixDQUF5QkQsT0FBekIsQ0FEK0I7QUFBQSxLQUFoQjtBQUFBO0FBRk4sQ0FBYixDQUZhLEVBT2JqQixVQVBhLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBcInJlYWN0LWRhdGVzL2luaXRpYWxpemVcIjtcclxuaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcclxuaW1wb3J0IHsgY29tcG9zZSwgd2l0aEhhbmRsZXJzLCB3aXRoU3RhdGUgfSBmcm9tIFwicmVjb21wb3NlXCI7XHJcbmltcG9ydCBtb21lbnQsIHsgTW9tZW50IH0gZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgeyBTaW5nbGVEYXRlUGlja2VyIH0gZnJvbSBcInJlYWN0LWRhdGVzXCI7XHJcbmltcG9ydCBcInJlYWN0LWRhdGVzL2xpYi9jc3MvX2RhdGVwaWNrZXIuY3NzXCI7XHJcblxyXG5jb25zdCBPbmx5TGFiZWxOYW1lID0gKHsgbGFiZWxOYW1lIH06IHsgbGFiZWxOYW1lPzogc3RyaW5nIH0pID0+IChcclxuICA8bGFiZWwgaHRtbEZvcj1cInNlbGVjdFwiPlxyXG4gICAgPGI+e2xhYmVsTmFtZX08L2I+XHJcbiAgPC9sYWJlbD5cclxuKTtcclxuXHJcbmNvbnN0IFJlcXVpcmVkTGFiZWxOYW1lID0gKHtcclxuICBsYWJlbE5hbWUsXHJcbiAgcmVxdWlyZWRGaWVsZFRleHRcclxufToge1xyXG4gIGxhYmVsTmFtZT86IHN0cmluZztcclxuICByZXF1aXJlZEZpZWxkVGV4dD86IHN0cmluZztcclxufSkgPT4gKFxyXG4gIDxsYWJlbCBodG1sRm9yPVwic2VsZWN0XCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlcXVpcmVkTGFiZWxcIj5cclxuICAgICAgPGI+e2xhYmVsTmFtZX08L2I+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVxdWlyZWRcIj57cmVxdWlyZWRGaWVsZFRleHR9PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2xhYmVsPlxyXG4pO1xyXG5cclxuY29uc3QgRGF0ZVBpY2tlciA9ICh7XHJcbiAgbGFiZWxOYW1lLFxyXG4gIHJlcXVpcmVkRmllbGRUZXh0LFxyXG4gIHZhbHVlLFxyXG4gIGlkID0gXCJhcmtEYXRlUGlja2VyXCIsXHJcbiAgY2hhbmdlRGF0YSxcclxuICBmb2N1c2VkSW5wdXQsXHJcbiAgc2V0Rm9jdXNlZElucHV0LFxyXG4gIGZvcm1hdCxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgcGxhY2VIb2xkZXIgPSBcIkNob29zZSBEYXRlXCIsXHJcbiAgd2l0aFBvcnRhbCA9IGZhbHNlLFxyXG4gIG51bWJlck9mTW9udGhzID0gMVxyXG59OiBPdXRwdXRQcm9wcykgPT4gKFxyXG4gIDw+XHJcbiAgICB7IVIuaXNFbXB0eShsYWJlbE5hbWUpICYmIFIuaXNFbXB0eShyZXF1aXJlZEZpZWxkVGV4dCkgPyAoXHJcbiAgICAgIDxPbmx5TGFiZWxOYW1lIGxhYmVsTmFtZT17bGFiZWxOYW1lfSAvPlxyXG4gICAgKSA6IG51bGx9XHJcbiAgICB7IVIuaXNFbXB0eShsYWJlbE5hbWUpICYmICFSLmlzRW1wdHkocmVxdWlyZWRGaWVsZFRleHQpID8gKFxyXG4gICAgICA8UmVxdWlyZWRMYWJlbE5hbWVcclxuICAgICAgICBsYWJlbE5hbWU9e2xhYmVsTmFtZX1cclxuICAgICAgICByZXF1aXJlZEZpZWxkVGV4dD17cmVxdWlyZWRGaWVsZFRleHR9XHJcbiAgICAgIC8+XHJcbiAgICApIDogbnVsbH1cclxuICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgIGlkPXtpZH1cclxuICAgICAgZGF0ZT17dmFsdWV9XHJcbiAgICAgIGZvY3VzZWQ9e2ZvY3VzZWRJbnB1dH1cclxuICAgICAgb25EYXRlQ2hhbmdlPXtjaGFuZ2VEYXRhfVxyXG4gICAgICBvbkZvY3VzQ2hhbmdlPXtzZXRGb2N1c2VkSW5wdXR9XHJcbiAgICAgIHNob3dDbGVhckRhdGVcclxuICAgICAgc21hbGxcclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgIGhpZGVLZXlib2FyZFNob3J0Y3V0c1BhbmVsXHJcbiAgICAgIGRpc3BsYXlGb3JtYXQ9e2Zvcm1hdH1cclxuICAgICAgbnVtYmVyT2ZNb250aHM9e251bWJlck9mTW9udGhzfVxyXG4gICAgICB3aXRoUG9ydGFsPXt3aXRoUG9ydGFsfVxyXG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2VIb2xkZXJ9XHJcbiAgICAvPlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuZXhwb3J0IHR5cGUgSW5wdXRQcm9wcyA9IHtcclxuICBsYWJlbE5hbWU/OiBzdHJpbmc7XHJcbiAgcmVxdWlyZWRGaWVsZFRleHQ/OiBzdHJpbmc7XHJcbiAgdmFsdWU6IE1vbWVudCB8IG51bGw7XHJcbiAgdXBkYXRlOiBhbnk7XHJcbiAgZm9ybWF0OiBzdHJpbmc7XHJcbiAgcGxhY2VIb2xkZXI/OiBzdHJpbmc7XHJcbiAgbnVtYmVyT2ZNb250aHM/OiBudW1iZXI7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHdpdGhQb3J0YWw/OiBib29sZWFuO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBpZD86IHN0cmluZztcclxufTtcclxuZXhwb3J0IHR5cGUgT3V0cHV0UHJvcHMgPSBJbnB1dFByb3BzICYge1xyXG4gIGNoYW5nZURhdGE6IGFueTtcclxuICBzZXRGb2N1c2VkSW5wdXQ6IGFueTtcclxuICBmb2N1c2VkSW5wdXQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlPE91dHB1dFByb3BzLCBJbnB1dFByb3BzPihcclxuICB3aXRoU3RhdGUoXCJmb2N1c2VkSW5wdXRcIiwgXCJ1cGRhdGVGb2N1c2VkSW5wdXRcIiwgZmFsc2UpLFxyXG4gIHdpdGhIYW5kbGVycyh7XHJcbiAgICBjaGFuZ2VEYXRhOiAoeyB1cGRhdGUgfTogeyB1cGRhdGU6IGFueSB9KSA9PiAodmFsOiBhbnkpID0+IHVwZGF0ZSh2YWwpLFxyXG4gICAgc2V0Rm9jdXNlZElucHV0OiAocHJvcHM6IGFueSkgPT4gKHsgZm9jdXNlZCB9OiB7IGZvY3VzZWQ6IHN0cmluZyB9KSA9PlxyXG4gICAgICBwcm9wcy51cGRhdGVGb2N1c2VkSW5wdXQoZm9jdXNlZClcclxuICB9KVxyXG4pKERhdGVQaWNrZXIpO1xyXG4iXX0=