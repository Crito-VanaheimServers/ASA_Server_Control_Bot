"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _propTypes["default"].oneOf([_constants.ANCHOR_LEFT, _constants.ANCHOR_RIGHT]);

exports["default"] = _default;