"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCalendarDaySettings;

var _getPhrase = _interopRequireDefault(require("./getPhrase"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases) {
  var chooseAvailableDate = phrases.chooseAvailableDate,
      dateIsUnavailable = phrases.dateIsUnavailable,
      dateIsSelected = phrases.dateIsSelected,
      dateIsSelectedAsStartDate = phrases.dateIsSelectedAsStartDate,
      dateIsSelectedAsEndDate = phrases.dateIsSelectedAsEndDate;
  var daySizeStyles = {
    width: daySize,
    height: daySize - 1
  };
  var useDefaultCursor = modifiers.has('blocked-minimum-nights') || modifiers.has('blocked-calendar') || modifiers.has('blocked-out-of-range');
  var selected = modifiers.has('selected') || modifiers.has('selected-start') || modifiers.has('selected-end');
  var hoveredSpan = !selected && (modifiers.has('hovered-span') || modifiers.has('after-hovered-start'));
  var isOutsideRange = modifiers.has('blocked-out-of-range');
  var formattedDate = {
    date: day.format(ariaLabelFormat)
  };
  var ariaLabel = (0, _getPhrase["default"])(chooseAvailableDate, formattedDate);

  if (selected) {
    if (modifiers.has('selected-start') && dateIsSelectedAsStartDate) {
      ariaLabel = (0, _getPhrase["default"])(dateIsSelectedAsStartDate, formattedDate);
    } else if (modifiers.has('selected-end') && dateIsSelectedAsEndDate) {
      ariaLabel = (0, _getPhrase["default"])(dateIsSelectedAsEndDate, formattedDate);
    } else {
      ariaLabel = (0, _getPhrase["default"])(dateIsSelected, formattedDate);
    }
  } else if (modifiers.has(_constants.BLOCKED_MODIFIER)) {
    ariaLabel = (0, _getPhrase["default"])(dateIsUnavailable, formattedDate);
  }

  return {
    daySizeStyles: daySizeStyles,
    useDefaultCursor: useDefaultCursor,
    selected: selected,
    hoveredSpan: hoveredSpan,
    isOutsideRange: isOutsideRange,
    ariaLabel: ariaLabel
  };
}