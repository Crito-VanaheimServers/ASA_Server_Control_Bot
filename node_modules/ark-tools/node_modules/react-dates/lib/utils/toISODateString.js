"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toISODateString;

var _moment = _interopRequireDefault(require("moment"));

var _toMomentObject = _interopRequireDefault(require("./toMomentObject"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function toISODateString(date, currentFormat) {
  var dateObj = _moment["default"].isMoment(date) ? date : (0, _toMomentObject["default"])(date, currentFormat);
  if (!dateObj) return null;
  return dateObj.format(_constants.ISO_FORMAT);
}