"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isAfterDay;

var _moment = _interopRequireDefault(require("moment"));

var _isBeforeDay = _interopRequireDefault(require("./isBeforeDay"));

var _isSameDay = _interopRequireDefault(require("./isSameDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isAfterDay(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false;
  return !(0, _isBeforeDay["default"])(a, b) && !(0, _isSameDay["default"])(a, b);
}