"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.deleteItemHelper = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var checkPrimaryKey = function checkPrimaryKey(_ref) {
  var row = _ref.row,
      pks = _ref.pks;
  return R.allPass(R.map(R.eqProps, pks))(row);
};

var alterMatch = R.curry(function (_ref2) {
  var data = _ref2.data,
      row = _ref2.row,
      pks = _ref2.pks,
      func = _ref2.func;
  return R.map(R.ifElse(checkPrimaryKey({
    row: row,
    pks: pks
  }), func, R.identity), data);
});

var deleteItemHelper = function deleteItemHelper(_ref3) {
  var data = _ref3.data,
      row = _ref3.row,
      pks = _ref3.pks;
  return alterMatch({
    data: data,
    row: row,
    pks: pks,
    func: R.assoc("mod", "Delete")
  });
};

exports.deleteItemHelper = deleteItemHelper;
var _default = deleteItemHelper;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXBwaW5nVG9vbHMvZGVsZXRlSXRlbS50cyJdLCJuYW1lcyI6WyJjaGVja1ByaW1hcnlLZXkiLCJyb3ciLCJwa3MiLCJSIiwiYWxsUGFzcyIsIm1hcCIsImVxUHJvcHMiLCJhbHRlck1hdGNoIiwiY3VycnkiLCJkYXRhIiwiZnVuYyIsImlmRWxzZSIsImlkZW50aXR5IiwiZGVsZXRlSXRlbUhlbHBlciIsImFzc29jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEsTUFBR0MsR0FBSCxRQUFHQSxHQUFIO0FBQUEsTUFBUUMsR0FBUixRQUFRQSxHQUFSO0FBQUEsU0FDdEJDLENBQUMsQ0FBQ0MsT0FBRixDQUFVRCxDQUFDLENBQUNFLEdBQUYsQ0FBTUYsQ0FBQyxDQUFDRyxPQUFSLEVBQWlCSixHQUFqQixDQUFWLEVBQWlDRCxHQUFqQyxDQURzQjtBQUFBLENBQXhCOztBQUdBLElBQU1NLFVBQVUsR0FBR0osQ0FBQyxDQUFDSyxLQUFGLENBQ2pCO0FBQUEsTUFBR0MsSUFBSCxTQUFHQSxJQUFIO0FBQUEsTUFBU1IsR0FBVCxTQUFTQSxHQUFUO0FBQUEsTUFBY0MsR0FBZCxTQUFjQSxHQUFkO0FBQUEsTUFBbUJRLElBQW5CLFNBQW1CQSxJQUFuQjtBQUFBLFNBQ0VQLENBQUMsQ0FBQ0UsR0FBRixDQUFNRixDQUFDLENBQUNRLE1BQUYsQ0FBU1gsZUFBZSxDQUFDO0FBQUVDLElBQUFBLEdBQUcsRUFBSEEsR0FBRjtBQUFPQyxJQUFBQSxHQUFHLEVBQUhBO0FBQVAsR0FBRCxDQUF4QixFQUF3Q1EsSUFBeEMsRUFBOENQLENBQUMsQ0FBQ1MsUUFBaEQsQ0FBTixFQUFpRUgsSUFBakUsQ0FERjtBQUFBLENBRGlCLENBQW5COztBQUtPLElBQU1JLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUM5QkosSUFEOEIsU0FDOUJBLElBRDhCO0FBQUEsTUFFOUJSLEdBRjhCLFNBRTlCQSxHQUY4QjtBQUFBLE1BRzlCQyxHQUg4QixTQUc5QkEsR0FIOEI7QUFBQSxTQVExQkssVUFBVSxDQUFDO0FBQUVFLElBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRUixJQUFBQSxHQUFHLEVBQUhBLEdBQVI7QUFBYUMsSUFBQUEsR0FBRyxFQUFIQSxHQUFiO0FBQWtCUSxJQUFBQSxJQUFJLEVBQUVQLENBQUMsQ0FBQ1csS0FBRixDQUFRLEtBQVIsRUFBZSxRQUFmO0FBQXhCLEdBQUQsQ0FSZ0I7QUFBQSxDQUF6Qjs7O2VBVVFELGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcclxuXHJcbmNvbnN0IGNoZWNrUHJpbWFyeUtleSA9ICh7IHJvdywgcGtzIH06IHsgcm93OiBhbnk7IHBrczogYW55IH0pOiBhbnkgPT5cclxuICBSLmFsbFBhc3MoUi5tYXAoUi5lcVByb3BzLCBwa3MpKShyb3cpO1xyXG5cclxuY29uc3QgYWx0ZXJNYXRjaCA9IFIuY3VycnkoXHJcbiAgKHsgZGF0YSwgcm93LCBwa3MsIGZ1bmMgfTogeyBkYXRhOiBhbnk7IHJvdzogYW55OyBwa3M6IGFueTsgZnVuYzogYW55IH0pID0+XHJcbiAgICBSLm1hcChSLmlmRWxzZShjaGVja1ByaW1hcnlLZXkoeyByb3csIHBrcyB9KSwgZnVuYywgUi5pZGVudGl0eSksIGRhdGEpXHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlSXRlbUhlbHBlciA9ICh7XHJcbiAgZGF0YSxcclxuICByb3csXHJcbiAgcGtzXHJcbn06IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgcm93OiBhbnk7XHJcbiAgcGtzOiBhbnk7XHJcbn0pID0+IGFsdGVyTWF0Y2goeyBkYXRhLCByb3csIHBrcywgZnVuYzogUi5hc3NvYyhcIm1vZFwiLCBcIkRlbGV0ZVwiKSB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZUl0ZW1IZWxwZXI7XHJcbiJdfQ==