"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNextDay;

var _moment = _interopRequireDefault(require("moment"));

var _isSameDay = _interopRequireDefault(require("./isSameDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNextDay(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false;
  var nextDay = (0, _moment["default"])(a).add(1, 'day');
  return (0, _isSameDay["default"])(nextDay, b);
}