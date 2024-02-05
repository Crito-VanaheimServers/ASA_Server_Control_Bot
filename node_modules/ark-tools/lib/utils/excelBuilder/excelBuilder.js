"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.excelBuilder = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _helper = require("./helper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var createExcelRow = function createExcelRow(_ref) {
  var data = _ref.data,
      list = _ref.list;
  var val = [];
  list.map(function (x) {
    val.push([x.colName, R.prop(x.propName, data)]);
  });
  return R.pipe(R.fromPairs)(val);
};

var excelBuilder = function excelBuilder(_ref2) {
  var arr = _ref2.arr,
      list = _ref2.list,
      fileName = _ref2.fileName;
  return R.pipe(R.map(function (data) {
    return createExcelRow({
      data: data,
      list: list
    });
  }), function (data) {
    return (0, _helper.downloadExcel)({
      data: data,
      fileName: fileName
    });
  })(arr);
};

exports.excelBuilder = excelBuilder;
var _default = excelBuilder;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9leGNlbEJ1aWxkZXIvZXhjZWxCdWlsZGVyLnRzIl0sIm5hbWVzIjpbImNyZWF0ZUV4Y2VsUm93IiwiZGF0YSIsImxpc3QiLCJ2YWwiLCJtYXAiLCJ4IiwicHVzaCIsImNvbE5hbWUiLCJSIiwicHJvcCIsInByb3BOYW1lIiwicGlwZSIsImZyb21QYWlycyIsImV4Y2VsQnVpbGRlciIsImFyciIsImZpbGVOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLE9BQThDO0FBQUEsTUFBM0NDLElBQTJDLFFBQTNDQSxJQUEyQztBQUFBLE1BQXJDQyxJQUFxQyxRQUFyQ0EsSUFBcUM7QUFDbkUsTUFBTUMsR0FBUSxHQUFHLEVBQWpCO0FBQ0FELEVBQUFBLElBQUksQ0FBQ0UsR0FBTCxDQUFTLFVBQUNDLENBQUQsRUFBWTtBQUNuQkYsSUFBQUEsR0FBRyxDQUFDRyxJQUFKLENBQVMsQ0FBQ0QsQ0FBQyxDQUFDRSxPQUFILEVBQVlDLENBQUMsQ0FBQ0MsSUFBRixDQUFPSixDQUFDLENBQUNLLFFBQVQsRUFBbUJULElBQW5CLENBQVosQ0FBVDtBQUNELEdBRkQ7QUFHQSxTQUFPTyxDQUFDLENBQUNHLElBQUYsQ0FBaUJILENBQUMsQ0FBQ0ksU0FBbkIsRUFBOEJULEdBQTlCLENBQVA7QUFDRCxDQU5EOztBQVFPLElBQU1VLFlBQVksR0FBRyxTQUFmQSxZQUFlO0FBQUEsTUFDMUJDLEdBRDBCLFNBQzFCQSxHQUQwQjtBQUFBLE1BRTFCWixJQUYwQixTQUUxQkEsSUFGMEI7QUFBQSxNQUcxQmEsUUFIMEIsU0FHMUJBLFFBSDBCO0FBQUEsU0FTMUJQLENBQUMsQ0FBQ0csSUFBRixDQUNFSCxDQUFDLENBQUNKLEdBQUYsQ0FBTSxVQUFDSCxJQUFEO0FBQUEsV0FBZUQsY0FBYyxDQUFDO0FBQUVDLE1BQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRQyxNQUFBQSxJQUFJLEVBQUpBO0FBQVIsS0FBRCxDQUE3QjtBQUFBLEdBQU4sQ0FERixFQUVFLFVBQUNELElBQUQ7QUFBQSxXQUFlLDJCQUFjO0FBQUVBLE1BQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRYyxNQUFBQSxRQUFRLEVBQVJBO0FBQVIsS0FBZCxDQUFmO0FBQUEsR0FGRixFQUdFRCxHQUhGLENBVDBCO0FBQUEsQ0FBckI7OztlQWNRRCxZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcclxuaW1wb3J0IHsgZG93bmxvYWRFeGNlbCB9IGZyb20gXCIuL2hlbHBlclwiO1xyXG5cclxuY29uc3QgY3JlYXRlRXhjZWxSb3cgPSAoeyBkYXRhLCBsaXN0IH06IHsgZGF0YTogYW55OyBsaXN0OiBhbnkgfSkgPT4ge1xyXG4gIGNvbnN0IHZhbDogYW55ID0gW107XHJcbiAgbGlzdC5tYXAoKHg6IGFueSkgPT4ge1xyXG4gICAgdmFsLnB1c2goW3guY29sTmFtZSwgUi5wcm9wKHgucHJvcE5hbWUsIGRhdGEpXSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIFIucGlwZTxhbnksIGFueT4oUi5mcm9tUGFpcnMpKHZhbCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXhjZWxCdWlsZGVyID0gKHtcclxuICBhcnIsXHJcbiAgbGlzdCxcclxuICBmaWxlTmFtZVxyXG59OiB7XHJcbiAgYXJyOiBhbnk7XHJcbiAgbGlzdDogYW55O1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbn0pID0+XHJcbiAgUi5waXBlKFxyXG4gICAgUi5tYXAoKGRhdGE6IGFueSkgPT4gY3JlYXRlRXhjZWxSb3coeyBkYXRhLCBsaXN0IH0pKSxcclxuICAgIChkYXRhOiBhbnkpID0+IGRvd25sb2FkRXhjZWwoeyBkYXRhLCBmaWxlTmFtZSB9KVxyXG4gICkoYXJyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4Y2VsQnVpbGRlcjtcclxuIl19