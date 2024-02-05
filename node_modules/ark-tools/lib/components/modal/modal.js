"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigModal = function ConfigModal(_ref) {
  var open = _ref.open,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? "arkModal" : _ref$id,
      title = _ref.title,
      modalClass = _ref.modalClass,
      headerClass = _ref.headerClass,
      bodyClass = _ref.bodyClass,
      footerClass = _ref.footerClass,
      closeModal = _ref.closeModal,
      modalBody = _ref.modalBody,
      modalFooter = _ref.modalFooter;
  return _react.default.createElement("div", {
    className: "modal ".concat(open ? "appear" : ""),
    id: id,
    role: "dialog",
    "aria-hidden": "true"
  }, _react.default.createElement("div", {
    className: open ? "modalOverlay" : "",
    onClick: closeModal
  }), _react.default.createElement("div", {
    className: "modal-dialog ".concat(modalClass),
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
  }, modalFooter))));
};

var _default = ConfigModal;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzeCJdLCJuYW1lcyI6WyJDb25maWdNb2RhbCIsIm9wZW4iLCJpZCIsInRpdGxlIiwibW9kYWxDbGFzcyIsImhlYWRlckNsYXNzIiwiYm9keUNsYXNzIiwiZm9vdGVyQ2xhc3MiLCJjbG9zZU1vZGFsIiwibW9kYWxCb2R5IiwibW9kYWxGb290ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsTUFDbEJDLElBRGtCLFFBQ2xCQSxJQURrQjtBQUFBLHFCQUVsQkMsRUFGa0I7QUFBQSxNQUVsQkEsRUFGa0Isd0JBRWYsVUFGZTtBQUFBLE1BR2xCQyxLQUhrQixRQUdsQkEsS0FIa0I7QUFBQSxNQUlsQkMsVUFKa0IsUUFJbEJBLFVBSmtCO0FBQUEsTUFLbEJDLFdBTGtCLFFBS2xCQSxXQUxrQjtBQUFBLE1BTWxCQyxTQU5rQixRQU1sQkEsU0FOa0I7QUFBQSxNQU9sQkMsV0FQa0IsUUFPbEJBLFdBUGtCO0FBQUEsTUFRbEJDLFVBUmtCLFFBUWxCQSxVQVJrQjtBQUFBLE1BU2xCQyxTQVRrQixRQVNsQkEsU0FUa0I7QUFBQSxNQVVsQkMsV0FWa0IsUUFVbEJBLFdBVmtCO0FBQUEsU0F1QmxCO0FBQ0UsSUFBQSxTQUFTLGtCQUFXVCxJQUFJLEdBQUcsUUFBSCxHQUFjLEVBQTdCLENBRFg7QUFFRSxJQUFBLEVBQUUsRUFBRUMsRUFGTjtBQUdFLElBQUEsSUFBSSxFQUFDLFFBSFA7QUFJRSxtQkFBWTtBQUpkLEtBTUU7QUFBSyxJQUFBLFNBQVMsRUFBRUQsSUFBSSxHQUFHLGNBQUgsR0FBb0IsRUFBeEM7QUFBNEMsSUFBQSxPQUFPLEVBQUVPO0FBQXJELElBTkYsRUFPRTtBQUFLLElBQUEsU0FBUyx5QkFBa0JKLFVBQWxCLENBQWQ7QUFBOEMsSUFBQSxJQUFJLEVBQUM7QUFBbkQsS0FDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FDRTtBQUFLLElBQUEsU0FBUyx5QkFBa0JDLFdBQWxCO0FBQWQsS0FDRTtBQUFJLElBQUEsU0FBUyxFQUFDO0FBQWQsS0FBNkJGLEtBQTdCLENBREYsQ0FERixFQUlFO0FBQUssSUFBQSxTQUFTLHVCQUFnQkcsU0FBaEI7QUFBZCxLQUE0Q0csU0FBNUMsQ0FKRixFQUtFO0FBQUssSUFBQSxTQUFTLHlCQUFrQkYsV0FBbEI7QUFBZCxLQUFnREcsV0FBaEQsQ0FMRixDQURGLENBUEYsQ0F2QmtCO0FBQUEsQ0FBcEI7O2VBMENlVixXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgQ29uZmlnTW9kYWwgPSAoe1xyXG4gIG9wZW4sXHJcbiAgaWQ9XCJhcmtNb2RhbFwiLFxyXG4gIHRpdGxlLFxyXG4gIG1vZGFsQ2xhc3MsXHJcbiAgaGVhZGVyQ2xhc3MsXHJcbiAgYm9keUNsYXNzLFxyXG4gIGZvb3RlckNsYXNzLFxyXG4gIGNsb3NlTW9kYWwsXHJcbiAgbW9kYWxCb2R5LFxyXG4gIG1vZGFsRm9vdGVyXHJcbn06IHtcclxuICBvcGVuOiBib29sZWFuO1xyXG4gIGlkPzogc3RyaW5nO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIG1vZGFsQ2xhc3M/OiBzdHJpbmc7XHJcbiAgaGVhZGVyQ2xhc3M/OiBzdHJpbmc7XHJcbiAgYm9keUNsYXNzPzogc3RyaW5nO1xyXG4gIGZvb3RlckNsYXNzPzogc3RyaW5nO1xyXG4gIGNsb3NlTW9kYWw/OiBhbnk7XHJcbiAgbW9kYWxCb2R5PzogSlNYLkVsZW1lbnQ7XHJcbiAgbW9kYWxGb290ZXI/OiBKU1guRWxlbWVudDtcclxufSkgPT4gKFxyXG4gIDxkaXZcclxuICAgIGNsYXNzTmFtZT17YG1vZGFsICR7b3BlbiA/IFwiYXBwZWFyXCIgOiBcIlwifWB9XHJcbiAgICBpZD17aWR9XHJcbiAgICByb2xlPVwiZGlhbG9nXCJcclxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9e29wZW4gPyBcIm1vZGFsT3ZlcmxheVwiIDogXCJcIn0gb25DbGljaz17Y2xvc2VNb2RhbH0gLz5cclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgbW9kYWwtZGlhbG9nICR7bW9kYWxDbGFzc31gfSByb2xlPVwiZG9jdW1lbnRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Btb2RhbC1oZWFkZXIgJHtoZWFkZXJDbGFzc31gfT5cclxuICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aXRsZX08L2g1PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbW9kYWwtYm9keSAke2JvZHlDbGFzc31gfT57bW9kYWxCb2R5fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbW9kYWwtZm9vdGVyICR7Zm9vdGVyQ2xhc3N9YH0+e21vZGFsRm9vdGVyfTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnTW9kYWw7XHJcbiJdfQ==