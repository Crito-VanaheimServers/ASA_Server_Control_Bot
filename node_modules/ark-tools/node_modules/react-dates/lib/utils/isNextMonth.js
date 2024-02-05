"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNextMonth;

var _moment = _interopRequireDefault(require("moment"));

var _isSameMonth = _interopRequireDefault(require("./isSameMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNextMonth(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false;
  return (0, _isSameMonth["default"])(a.clone().add(1, 'month'), b);
}