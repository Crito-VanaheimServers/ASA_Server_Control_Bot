"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigModal = function ConfigModal(_ref) {
  var open = _ref.open,
      id = _ref.id,
      title = _ref.title,
      headerClass = _ref.headerClass,
      bodyClass = _ref.bodyClass,
      footerClass = _ref.footerClass,
      closeModal = _ref.closeModal,
      modalBody = _ref.modalBody,
      clear = _ref.clear,
      filter = _ref.filter,
      disableFilter = _ref.disableFilter;
  return _react.default.createElement("div", {
    className: "modal ".concat(open ? "appear" : ""),
    id: id,
    role: "dialog",
    "aria-hidden": "true"
  }, _react.default.createElement("div", {
    className: open ? "modalOverlay" : "",
    onClick: closeModal
  }), _react.default.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, _react.default.createElement("div", {
    className: "modal-content"
  }, _react.default.createElement("div", {
    className: "modal-header ".concat(headerClass)
  }, _react.default.createElement("h5", {
    className: "modal-title"
  }, title)), _react.default.createElement("div", {
    className: "modal-body ".concat(bodyClass)
  }, modalBody), _react.default.createElement("div", {
    className: "modal-footer ".concat(footerClass)
  }, _react.default.createElement("button", {
    type: "button",
    className: "btn btn-default filter cancelFilter",
    onClick: closeModal
  }, "Cancel"), _react.default.createElement("button", {
    type: "button",
    className: "btn btn-danger filter clearFilter",
    onClick: clear
  }, "Clear"), _react.default.createElement("button", {
    type: "button",
    className: "btn btn-danger filter filterSubmit",
    onClick: filter,
    disabled: disableFilter
  }, "Filter")))));
};

var _default = ConfigModal;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL2ZsdGVyTW9kYWwudHN4Il0sIm5hbWVzIjpbIkNvbmZpZ01vZGFsIiwib3BlbiIsImlkIiwidGl0bGUiLCJoZWFkZXJDbGFzcyIsImJvZHlDbGFzcyIsImZvb3RlckNsYXNzIiwiY2xvc2VNb2RhbCIsIm1vZGFsQm9keSIsImNsZWFyIiwiZmlsdGVyIiwiZGlzYWJsZUZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxNQUNsQkMsSUFEa0IsUUFDbEJBLElBRGtCO0FBQUEsTUFFbEJDLEVBRmtCLFFBRWxCQSxFQUZrQjtBQUFBLE1BR2xCQyxLQUhrQixRQUdsQkEsS0FIa0I7QUFBQSxNQUlsQkMsV0FKa0IsUUFJbEJBLFdBSmtCO0FBQUEsTUFLbEJDLFNBTGtCLFFBS2xCQSxTQUxrQjtBQUFBLE1BTWxCQyxXQU5rQixRQU1sQkEsV0FOa0I7QUFBQSxNQU9sQkMsVUFQa0IsUUFPbEJBLFVBUGtCO0FBQUEsTUFRbEJDLFNBUmtCLFFBUWxCQSxTQVJrQjtBQUFBLE1BU2xCQyxLQVRrQixRQVNsQkEsS0FUa0I7QUFBQSxNQVVsQkMsTUFWa0IsUUFVbEJBLE1BVmtCO0FBQUEsTUFXbEJDLGFBWGtCLFFBV2xCQSxhQVhrQjtBQUFBLFNBeUJsQjtBQUNFLElBQUEsU0FBUyxrQkFBV1YsSUFBSSxHQUFHLFFBQUgsR0FBYyxFQUE3QixDQURYO0FBRUUsSUFBQSxFQUFFLEVBQUVDLEVBRk47QUFHRSxJQUFBLElBQUksRUFBQyxRQUhQO0FBSUUsbUJBQVk7QUFKZCxLQU1FO0FBQUssSUFBQSxTQUFTLEVBQUVELElBQUksR0FBRyxjQUFILEdBQW9CLEVBQXhDO0FBQTRDLElBQUEsT0FBTyxFQUFFTTtBQUFyRCxJQU5GLEVBT0U7QUFBSyxJQUFBLFNBQVMsRUFBQyxjQUFmO0FBQThCLElBQUEsSUFBSSxFQUFDO0FBQW5DLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMseUJBQWtCSCxXQUFsQjtBQUFkLEtBQ0U7QUFBSSxJQUFBLFNBQVMsRUFBQztBQUFkLEtBQTZCRCxLQUE3QixDQURGLENBREYsRUFJRTtBQUFLLElBQUEsU0FBUyx1QkFBZ0JFLFNBQWhCO0FBQWQsS0FBNENHLFNBQTVDLENBSkYsRUFLRTtBQUFLLElBQUEsU0FBUyx5QkFBa0JGLFdBQWxCO0FBQWQsS0FDRTtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLFNBQVMsRUFBQyxxQ0FGWjtBQUdFLElBQUEsT0FBTyxFQUFFQztBQUhYLGNBREYsRUFRRTtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLFNBQVMsRUFBQyxtQ0FGWjtBQUdFLElBQUEsT0FBTyxFQUFFRTtBQUhYLGFBUkYsRUFlRTtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLFNBQVMsRUFBQyxvQ0FGWjtBQUdFLElBQUEsT0FBTyxFQUFFQyxNQUhYO0FBSUUsSUFBQSxRQUFRLEVBQUVDO0FBSlosY0FmRixDQUxGLENBREYsQ0FQRixDQXpCa0I7QUFBQSxDQUFwQjs7ZUFtRWVYLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBDb25maWdNb2RhbCA9ICh7XHJcbiAgb3BlbixcclxuICBpZCxcclxuICB0aXRsZSxcclxuICBoZWFkZXJDbGFzcyxcclxuICBib2R5Q2xhc3MsXHJcbiAgZm9vdGVyQ2xhc3MsXHJcbiAgY2xvc2VNb2RhbCxcclxuICBtb2RhbEJvZHksXHJcbiAgY2xlYXIsXHJcbiAgZmlsdGVyLFxyXG4gIGRpc2FibGVGaWx0ZXJcclxufToge1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgaWQ/OiBzdHJpbmc7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgaGVhZGVyQ2xhc3M/OiBzdHJpbmc7XHJcbiAgYm9keUNsYXNzPzogc3RyaW5nO1xyXG4gIGZvb3RlckNsYXNzPzogc3RyaW5nO1xyXG4gIGNsb3NlTW9kYWw/OiBhbnk7XHJcbiAgbW9kYWxCb2R5PzogSlNYLkVsZW1lbnQ7XHJcbiAgY2xlYXI6IGFueTtcclxuICBmaWx0ZXI6IGFueTtcclxuICBkaXNhYmxlRmlsdGVyPzogYW55O1xyXG59KSA9PiAoXHJcbiAgPGRpdlxyXG4gICAgY2xhc3NOYW1lPXtgbW9kYWwgJHtvcGVuID8gXCJhcHBlYXJcIiA6IFwiXCJ9YH1cclxuICAgIGlkPXtpZH1cclxuICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICA+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17b3BlbiA/IFwibW9kYWxPdmVybGF5XCIgOiBcIlwifSBvbkNsaWNrPXtjbG9zZU1vZGFsfSAvPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Btb2RhbC1oZWFkZXIgJHtoZWFkZXJDbGFzc31gfT5cclxuICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aXRsZX08L2g1PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbW9kYWwtYm9keSAke2JvZHlDbGFzc31gfT57bW9kYWxCb2R5fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbW9kYWwtZm9vdGVyICR7Zm9vdGVyQ2xhc3N9YH0+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgZmlsdGVyIGNhbmNlbEZpbHRlclwiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlTW9kYWx9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBmaWx0ZXIgY2xlYXJGaWx0ZXJcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXtjbGVhcn1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgQ2xlYXJcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgZmlsdGVyIGZpbHRlclN1Ym1pdFwiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2ZpbHRlcn1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVGaWx0ZXJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIEZpbHRlclxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWdNb2RhbDtcclxuIl19