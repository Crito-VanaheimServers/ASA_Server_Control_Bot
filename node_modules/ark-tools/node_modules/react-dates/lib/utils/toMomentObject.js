"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toMomentObject;

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function toMomentObject(dateString, customFormat) {
  var dateFormats = customFormat ? [customFormat, _constants.DISPLAY_FORMAT, _constants.ISO_FORMAT] : [_constants.DISPLAY_FORMAT, _constants.ISO_FORMAT];
  var date = (0, _moment["default"])(dateString, dateFormats, true);
  return date.isValid() ? date.hour(12) : null;
}