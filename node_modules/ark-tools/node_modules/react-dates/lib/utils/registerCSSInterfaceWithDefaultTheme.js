"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerCSSInterfaceWithDefaultTheme;

var _reactWithStylesInterfaceCss = _interopRequireDefault(require("react-with-styles-interface-css"));

var _registerInterfaceWithDefaultTheme = _interopRequireDefault(require("./registerInterfaceWithDefaultTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function registerCSSInterfaceWithDefaultTheme() {
  (0, _registerInterfaceWithDefaultTheme["default"])(_reactWithStylesInterfaceCss["default"]);
}