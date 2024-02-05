"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isInclusivelyBeforeDay;

var _moment = _interopRequireDefault(require("moment"));

var _isAfterDay = _interopRequireDefault(require("./isAfterDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isInclusivelyBeforeDay(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false;
  return !(0, _isAfterDay["default"])(a, b);
}