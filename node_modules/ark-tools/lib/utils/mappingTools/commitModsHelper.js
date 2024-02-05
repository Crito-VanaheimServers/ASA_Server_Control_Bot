"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.moment = exports.sanctuaryConcat = exports.reader = void 0;

var _Reader = _interopRequireDefault(require("ramda-fantasy/src/Reader"));

var _sanctuary = require("sanctuary");

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reader = _Reader.default;
exports.reader = reader;

var sanctuaryConcat = function sanctuaryConcat(f1, f2) {
  return (0, _sanctuary.concat)(f1, f2);
};

exports.sanctuaryConcat = sanctuaryConcat;
var moment = (0, _momentRange.extendMoment)(_moment.default);
exports.moment = moment;
var _default = reader;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXBwaW5nVG9vbHMvY29tbWl0TW9kc0hlbHBlci5qcyJdLCJuYW1lcyI6WyJyZWFkZXIiLCJSZWFkZXIiLCJzYW5jdHVhcnlDb25jYXQiLCJmMSIsImYyIiwibW9tZW50IiwiTW9tZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSxNQUFNLEdBQUdDLGVBQWY7OztBQUVBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsRUFBRCxFQUFLQyxFQUFMO0FBQUEsU0FBWSx1QkFBT0QsRUFBUCxFQUFXQyxFQUFYLENBQVo7QUFBQSxDQUF4Qjs7O0FBRUEsSUFBTUMsTUFBTSxHQUFHLCtCQUFhQyxlQUFiLENBQWY7O2VBRVFOLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhZGVyIGZyb20gXCJyYW1kYS1mYW50YXN5L3NyYy9SZWFkZXJcIjtcclxuaW1wb3J0IHsgY29uY2F0IH0gZnJvbSBcInNhbmN0dWFyeVwiO1xyXG5pbXBvcnQgTW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgZXh0ZW5kTW9tZW50IH0gZnJvbSBcIm1vbWVudC1yYW5nZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRlciA9IFJlYWRlcjtcclxuXHJcbmV4cG9ydCBjb25zdCBzYW5jdHVhcnlDb25jYXQgPSAoZjEsIGYyKSA9PiBjb25jYXQoZjEsIGYyKTtcclxuXHJcbmV4cG9ydCBjb25zdCBtb21lbnQgPSBleHRlbmRNb21lbnQoTW9tZW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlYWRlcjtcclxuIl19