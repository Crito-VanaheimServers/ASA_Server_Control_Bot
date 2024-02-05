"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerInterfaceWithDefaultTheme;

var _ThemedStyleSheet = _interopRequireDefault(require("react-with-styles/lib/ThemedStyleSheet"));

var _DefaultTheme = _interopRequireDefault(require("../theme/DefaultTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  _ThemedStyleSheet["default"].registerInterface(reactWithStylesInterface);

  _ThemedStyleSheet["default"].registerTheme(_DefaultTheme["default"]);
}