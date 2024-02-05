"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

var _recompose = require("recompose");

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

var NumericInput = function NumericInput(_ref3) {
  var value = _ref3.value,
      change = _ref3.change,
      _ref3$inputClassName = _ref3.inputClassName,
      inputClassName = _ref3$inputClassName === void 0 ? "" : _ref3$inputClassName,
      _ref3$id = _ref3.id,
      id = _ref3$id === void 0 ? "arkNumberInput" : _ref3$id,
      _ref3$labelName = _ref3.labelName,
      labelName = _ref3$labelName === void 0 ? "" : _ref3$labelName,
      _ref3$readOnly = _ref3.readOnly,
      readOnly = _ref3$readOnly === void 0 ? false : _ref3$readOnly,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      _ref3$autoComplete = _ref3.autoComplete,
      autoComplete = _ref3$autoComplete === void 0 ? "on" : _ref3$autoComplete,
      _ref3$step = _ref3.step,
      step = _ref3$step === void 0 ? "1" : _ref3$step,
      min = _ref3.min,
      max = _ref3.max,
      _ref3$requiredFieldTe = _ref3.requiredFieldText,
      requiredFieldText = _ref3$requiredFieldTe === void 0 ? "" : _ref3$requiredFieldTe,
      _ref3$placeholder = _ref3.placeholder,
      placeholder = _ref3$placeholder === void 0 ? "" : _ref3$placeholder;
  return _react.default.createElement("div", null, !R.isEmpty(labelName) && R.isEmpty(requiredFieldText) ? _react.default.createElement(OnlyLabelName, {
    labelName: labelName
  }) : null, !R.isEmpty(labelName) && !R.isEmpty(requiredFieldText) ? _react.default.createElement(RequiredLabelName, {
    labelName: labelName,
    requiredFieldText: requiredFieldText
  }) : null, _react.default.createElement("input", {
    type: "number",
    className: "form-control arkNumberInput ".concat(inputClassName, " ").concat(disabled || readOnly ? "disabled" : ""),
    value: value,
    placeholder: placeholder,
    id: id,
    readOnly: readOnly,
    max: max,
    min: min,
    step: step,
    autoComplete: autoComplete,
    disabled: disabled,
    onChange: change
  }));
};

var _default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  change: function change(_ref4) {
    var update = _ref4.update,
        max = _ref4.max,
        min = _ref4.min;
    return function (e) {
      var val = e.target.value;

      if (min !== undefined || max !== undefined) {
        var minTest = min !== undefined && parseFloat(val) < min;
        var maxTest = max !== undefined && parseFloat(val) > max;
        debugger;
        return R.any(R.equals(true))([minTest, maxTest]) ? update("") : update(val);
      }

      return update(val);
    };
  }
}))(NumericInput);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL251bWVyaWNJbnB1dC9udW1lcmljSW5wdXQudHN4Il0sIm5hbWVzIjpbIk9ubHlMYWJlbE5hbWUiLCJsYWJlbE5hbWUiLCJSZXF1aXJlZExhYmVsTmFtZSIsInJlcXVpcmVkRmllbGRUZXh0IiwiTnVtZXJpY0lucHV0IiwidmFsdWUiLCJjaGFuZ2UiLCJpbnB1dENsYXNzTmFtZSIsImlkIiwicmVhZE9ubHkiLCJkaXNhYmxlZCIsImF1dG9Db21wbGV0ZSIsInN0ZXAiLCJtaW4iLCJtYXgiLCJwbGFjZWhvbGRlciIsIlIiLCJpc0VtcHR5IiwidXBkYXRlIiwiZSIsInZhbCIsInRhcmdldCIsInVuZGVmaW5lZCIsIm1pblRlc3QiLCJwYXJzZUZsb2F0IiwibWF4VGVzdCIsImFueSIsImVxdWFscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsTUFBR0MsU0FBSCxRQUFHQSxTQUFIO0FBQUEsU0FDcEI7QUFBTyxJQUFBLE9BQU8sRUFBQztBQUFmLEtBQ0Usd0NBQUlBLFNBQUosQ0FERixDQURvQjtBQUFBLENBQXRCOztBQUtBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0I7QUFBQSxNQUN4QkQsU0FEd0IsU0FDeEJBLFNBRHdCO0FBQUEsTUFFeEJFLGlCQUZ3QixTQUV4QkEsaUJBRndCO0FBQUEsU0FPeEI7QUFBTyxJQUFBLE9BQU8sRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0Usd0NBQUlGLFNBQUosQ0FERixFQUVFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUEyQkUsaUJBQTNCLENBRkYsQ0FERixDQVB3QjtBQUFBLENBQTFCOztBQW1DQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLE1BQ25CQyxLQURtQixTQUNuQkEsS0FEbUI7QUFBQSxNQUVuQkMs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QUNFLEdBQUQsQ0FGVjtBQUdEOztBQUNELGFBQU9GLE1BQU0sQ0FBQ0UsR0FBRCxDQUFiO0FBQ0QsS0FuQk87QUFBQTtBQURHLENBQWIsQ0FEYSxFQXVCYmhCLFlBdkJhLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XHJcbmltcG9ydCB7IGNvbXBvc2UsIHdpdGhIYW5kbGVycyB9IGZyb20gXCJyZWNvbXBvc2VcIjtcclxuXHJcbmNvbnN0IE9ubHlMYWJlbE5hbWUgPSAoeyBsYWJlbE5hbWUgfTogeyBsYWJlbE5hbWU/OiBzdHJpbmcgfSkgPT4gKFxyXG4gIDxsYWJlbCBodG1sRm9yPVwic2VsZWN0XCI+XHJcbiAgICA8Yj57bGFiZWxOYW1lfTwvYj5cclxuICA8L2xhYmVsPlxyXG4pO1xyXG5jb25zdCBSZXF1aXJlZExhYmVsTmFtZSA9ICh7XHJcbiAgbGFiZWxOYW1lLFxyXG4gIHJlcXVpcmVkRmllbGRUZXh0XHJcbn06IHtcclxuICBsYWJlbE5hbWU/OiBzdHJpbmc7XHJcbiAgcmVxdWlyZWRGaWVsZFRleHQ/OiBzdHJpbmc7XHJcbn0pID0+IChcclxuICA8bGFiZWwgaHRtbEZvcj1cInNlbGVjdFwiPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZXF1aXJlZExhYmVsXCI+XHJcbiAgICAgIDxiPntsYWJlbE5hbWV9PC9iPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlcXVpcmVkXCI+e3JlcXVpcmVkRmllbGRUZXh0fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9sYWJlbD5cclxuKTtcclxuXHJcbmV4cG9ydCB0eXBlIElucHV0UHJvcHMgPSB7XHJcbiAgdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICB1cGRhdGU6IGFueTtcclxuICBpbnB1dENsYXNzTmFtZT86IHN0cmluZztcclxuICBpZD86IHN0cmluZztcclxuICBsYWJlbE5hbWU/OiBzdHJpbmc7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBhdXRvQ29tcGxldGU/OiBzdHJpbmc7XHJcbiAgcmVxdWlyZWRGaWVsZFRleHQ/OiBzdHJpbmc7XHJcbiAgc3RlcD86IHN0cmluZztcclxuICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICBtYXg/OiBudW1iZXI7XHJcbiAgbWluPzogbnVtYmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgT3V0cHV0UHJvcHMgPSBJbnB1dFByb3BzICYge1xyXG4gIGNoYW5nZTogYW55O1xyXG59O1xyXG5cclxuY29uc3QgTnVtZXJpY0lucHV0ID0gKHtcclxuICB2YWx1ZSxcclxuICBjaGFuZ2UsXHJcbiAgaW5wdXRDbGFzc05hbWUgPSBcIlwiLFxyXG4gIGlkID0gXCJhcmtOdW1iZXJJbnB1dFwiLFxyXG4gIGxhYmVsTmFtZSA9IFwiXCIsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIGF1dG9Db21wbGV0ZSA9IFwib25cIixcclxuICBzdGVwID0gXCIxXCIsXHJcbiAgbWluLFxyXG4gIG1heCxcclxuICByZXF1aXJlZEZpZWxkVGV4dCA9IFwiXCIsXHJcbiAgcGxhY2Vob2xkZXIgPSBcIlwiXHJcbn06IE91dHB1dFByb3BzKSA9PiAoXHJcbiAgPGRpdj5cclxuICAgIHshUi5pc0VtcHR5KGxhYmVsTmFtZSkgJiYgUi5pc0VtcHR5KHJlcXVpcmVkRmllbGRUZXh0KSA/IChcclxuICAgICAgPE9ubHlMYWJlbE5hbWUgbGFiZWxOYW1lPXtsYWJlbE5hbWV9IC8+XHJcbiAgICApIDogbnVsbH1cclxuICAgIHshUi5pc0VtcHR5KGxhYmVsTmFtZSkgJiYgIVIuaXNFbXB0eShyZXF1aXJlZEZpZWxkVGV4dCkgPyAoXHJcbiAgICAgIDxSZXF1aXJlZExhYmVsTmFtZVxyXG4gICAgICAgIGxhYmVsTmFtZT17bGFiZWxOYW1lfVxyXG4gICAgICAgIHJlcXVpcmVkRmllbGRUZXh0PXtyZXF1aXJlZEZpZWxkVGV4dH1cclxuICAgICAgLz5cclxuICAgICkgOiBudWxsfVxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgYXJrTnVtYmVySW5wdXQgJHtpbnB1dENsYXNzTmFtZX0gJHtcclxuICAgICAgICBkaXNhYmxlZCB8fCByZWFkT25seSA/IFwiZGlzYWJsZWRcIiA6IFwiXCJcclxuICAgICAgfWB9XHJcbiAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICBpZD17aWR9XHJcbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgbWF4PXttYXh9XHJcbiAgICAgIG1pbj17bWlufVxyXG4gICAgICBzdGVwPXtzdGVwfVxyXG4gICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBvbkNoYW5nZT17Y2hhbmdlfVxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2U8T3V0cHV0UHJvcHMsIElucHV0UHJvcHM+KFxyXG4gIHdpdGhIYW5kbGVycyh7XHJcbiAgICBjaGFuZ2U6ICh7XHJcbiAgICAgIHVwZGF0ZSxcclxuICAgICAgbWF4LFxyXG4gICAgICBtaW5cclxuICAgIH06IHtcclxuICAgICAgdXBkYXRlOiBhbnk7XHJcbiAgICAgIG1heD86IG51bWJlcjtcclxuICAgICAgbWluPzogbnVtYmVyO1xyXG4gICAgfSkgPT4gKGU6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkIHx8IG1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgbWluVGVzdCA9IG1pbiAhPT0gdW5kZWZpbmVkICYmIHBhcnNlRmxvYXQodmFsKSA8IG1pbjtcclxuICAgICAgICBjb25zdCBtYXhUZXN0ID0gbWF4ICE9PSB1bmRlZmluZWQgJiYgcGFyc2VGbG9hdCh2YWwpID4gbWF4O1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHJldHVybiBSLmFueShSLmVxdWFscyh0cnVlKSkoW21pblRlc3QsIG1heFRlc3RdKVxyXG4gICAgICAgICAgPyB1cGRhdGUoXCJcIilcclxuICAgICAgICAgIDogdXBkYXRlKHZhbCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHVwZGF0ZSh2YWwpO1xyXG4gICAgfVxyXG4gIH0pXHJcbikoTnVtZXJpY0lucHV0KTtcclxuIl19