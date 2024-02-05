"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader(_ref) {
  var load = _ref.load,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? "arkLoader" : _ref$id,
      loadIcon = _ref.loadIcon;
  return _react.default.createElement("div", {
    className: "loadOverlay ".concat(load ? "spin" : ""),
    id: id
  }, _react.default.createElement("div", {
    className: "loadContainer"
  }, _react.default.createElement("i", {
    className: loadIcon
  })));
};

var _default = Loader;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRlcnMvbG9hZGVyLnRzeCJdLCJuYW1lcyI6WyJMb2FkZXIiLCJsb2FkIiwiaWQiLCJsb2FkSWNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVM7QUFBQSxNQUNiQyxJQURhLFFBQ2JBLElBRGE7QUFBQSxxQkFFYkMsRUFGYTtBQUFBLE1BRWJBLEVBRmEsd0JBRVYsV0FGVTtBQUFBLE1BR2JDLFFBSGEsUUFHYkEsUUFIYTtBQUFBLFNBU2I7QUFBSyxJQUFBLFNBQVMsd0JBQWlCRixJQUFJLEdBQUcsTUFBSCxHQUFZLEVBQWpDLENBQWQ7QUFBcUQsSUFBQSxFQUFFLEVBQUVDO0FBQXpELEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBRyxJQUFBLFNBQVMsRUFBRUM7QUFBZCxJQURGLENBREYsQ0FUYTtBQUFBLENBQWY7O2VBZ0JlSCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgTG9hZGVyID0gKHtcclxuICBsb2FkLFxyXG4gIGlkPVwiYXJrTG9hZGVyXCIsXHJcbiAgbG9hZEljb25cclxufToge1xyXG4gIGxvYWQ6IGJvb2xlYW47XHJcbiAgaWQ6IHN0cmluZztcclxuICBsb2FkSWNvbjogc3RyaW5nO1xyXG59KSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWU9e2Bsb2FkT3ZlcmxheSAke2xvYWQgPyBcInNwaW5cIiA6IFwiXCJ9YH0gaWQ9e2lkfT5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZENvbnRhaW5lclwiPlxyXG4gICAgICA8aSBjbGFzc05hbWU9e2xvYWRJY29ufSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XHJcbiJdfQ==