"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.buildRequest = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var dataChecker = R.pipe(R.filter(R.propSatisfies(function (x) {
  return x !== "Delete";
}, "mod")), R.map(R.map(function (x) {
  return R.equals(x, "") ? null : x;
})));

var buildRequest = function buildRequest(_ref) {
  var data = _ref.data,
      eTag = _ref.eTag,
      type = _ref.type;
  return {
    table: dataChecker(data),
    eTag: eTag,
    type: type
  };
};

exports.buildRequest = buildRequest;
var _default = buildRequest;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXBwaW5nVG9vbHMvYnVpbGRSZXF1ZXN0LnRzIl0sIm5hbWVzIjpbImRhdGFDaGVja2VyIiwiUiIsInBpcGUiLCJmaWx0ZXIiLCJwcm9wU2F0aXNmaWVzIiwieCIsIm1hcCIsImVxdWFscyIsImJ1aWxkUmVxdWVzdCIsImRhdGEiLCJlVGFnIiwidHlwZSIsInRhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxXQUFXLEdBQUdDLENBQUMsQ0FBQ0MsSUFBRixDQUNsQkQsQ0FBQyxDQUFDRSxNQUFGLENBQW1CRixDQUFDLENBQUNHLGFBQUYsQ0FBZ0IsVUFBQUMsQ0FBQztBQUFBLFNBQUlBLENBQUMsS0FBSyxRQUFWO0FBQUEsQ0FBakIsRUFBcUMsS0FBckMsQ0FBbkIsQ0FEa0IsRUFFbEJKLENBQUMsQ0FBQ0ssR0FBRixDQUFNTCxDQUFDLENBQUNLLEdBQUYsQ0FBTSxVQUFBRCxDQUFDO0FBQUEsU0FBS0osQ0FBQyxDQUFDTSxNQUFGLENBQVNGLENBQVQsRUFBWSxFQUFaLElBQWtCLElBQWxCLEdBQXlCQSxDQUE5QjtBQUFBLENBQVAsQ0FBTixDQUZrQixDQUFwQjs7QUFLTyxJQUFNRyxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLE1BQzFCQyxJQUQwQixRQUMxQkEsSUFEMEI7QUFBQSxNQUUxQkMsSUFGMEIsUUFFMUJBLElBRjBCO0FBQUEsTUFHMUJDLElBSDBCLFFBRzFCQSxJQUgwQjtBQUFBLFNBUXJCO0FBQ0xDLElBQUFBLEtBQUssRUFBRVosV0FBVyxDQUFDUyxJQUFELENBRGI7QUFFTEMsSUFBQUEsSUFBSSxFQUFKQSxJQUZLO0FBR0xDLElBQUFBLElBQUksRUFBSkE7QUFISyxHQVJxQjtBQUFBLENBQXJCOzs7ZUFjUUgsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XHJcblxyXG5jb25zdCBkYXRhQ2hlY2tlciA9IFIucGlwZShcclxuICBSLmZpbHRlcjxhbnksIGFueT4oUi5wcm9wU2F0aXNmaWVzKHggPT4geCAhPT0gXCJEZWxldGVcIiwgXCJtb2RcIikpLFxyXG4gIFIubWFwKFIubWFwKHggPT4gKFIuZXF1YWxzKHgsIFwiXCIpID8gbnVsbCA6IHgpKSlcclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBidWlsZFJlcXVlc3QgPSAoe1xyXG4gIGRhdGEsXHJcbiAgZVRhZyxcclxuICB0eXBlXHJcbn06IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgZVRhZzogc3RyaW5nO1xyXG4gIHR5cGU6IHN0cmluZztcclxufSkgPT4gKHtcclxuICB0YWJsZTogZGF0YUNoZWNrZXIoZGF0YSksXHJcbiAgZVRhZyxcclxuICB0eXBlXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRSZXF1ZXN0O1xyXG4iXX0=