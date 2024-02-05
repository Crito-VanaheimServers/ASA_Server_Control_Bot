"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isInclusivelyAfterDay;

var _moment = _interopRequireDefault(require("moment"));

var _isBeforeDay = _interopRequireDefault(require("./isBeforeDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isInclusivelyAfterDay(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false;
  return !(0, _isBeforeDay["default"])(a, b);
}