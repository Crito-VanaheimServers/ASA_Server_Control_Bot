"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isDayVisible;

var _moment = _interopRequireDefault(require("moment"));

var _isBeforeDay = _interopRequireDefault(require("./isBeforeDay"));

var _isAfterDay = _interopRequireDefault(require("./isAfterDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  if (!_moment["default"].isMoment(day)) return false;
  var firstDayOfFirstMonth = month.clone().startOf('month');
  if (enableOutsideDays) firstDayOfFirstMonth = firstDayOfFirstMonth.startOf('week');
  if ((0, _isBeforeDay["default"])(day, firstDayOfFirstMonth)) return false;
  var lastDayOfLastMonth = month.clone().add(numberOfMonths - 1, 'months').endOf('month');
  if (enableOutsideDays) lastDayOfLastMonth = lastDayOfLastMonth.endOf('week');
  return !(0, _isAfterDay["default"])(day, lastDayOfLastMonth);
}