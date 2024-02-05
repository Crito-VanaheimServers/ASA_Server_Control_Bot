"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isSameMonth;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isSameMonth(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false; // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow

  return a.month() === b.month() && a.year() === b.year();
}