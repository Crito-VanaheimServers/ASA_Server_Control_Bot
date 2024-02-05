"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.removeModificationHelper = void 0;

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

var removeModificationHelper = function removeModificationHelper(_ref3) {
  var data = _ref3.data,
      row = _ref3.row,
      pks = _ref3.pks;

  switch (row.mod) {
    case "Add Mapping":
      return R.filter(R.complement(checkPrimaryKey({
        row: row,
        pks: pks
      })), data);

    case "Delete":
      return alterMatch({
        func: R.dissoc("mod"),
        data: data,
        row: row,
        pks: pks
      });

    case "Update Mapping":
      return alterMatch({
        func: R.prop("original"),
        data: data,
        row: row,
        pks: pks
      });

    default:
      return data;
  }
};

exports.removeModificationHelper = removeModificationHelper;
var _default = removeModificationHelper;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXBwaW5nVG9vbHMvcmVtb3ZlTW9kaWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbImNoZWNrUHJpbWFyeUtleSIsInJvdyIsInBrcyIsIlIiLCJhbGxQYXNzIiwibWFwIiwiZXFQcm9wcyIsImFsdGVyTWF0Y2giLCJjdXJyeSIsImRhdGEiLCJmdW5jIiwiaWZFbHNlIiwiaWRlbnRpdHkiLCJyZW1vdmVNb2RpZmljYXRpb25IZWxwZXIiLCJtb2QiLCJmaWx0ZXIiLCJjb21wbGVtZW50IiwiZGlzc29jIiwicHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUdDLEdBQUgsUUFBR0EsR0FBSDtBQUFBLE1BQVFDLEdBQVIsUUFBUUEsR0FBUjtBQUFBLFNBQ3RCQyxDQUFDLENBQUNDLE9BQUYsQ0FBVUQsQ0FBQyxDQUFDRSxHQUFGLENBQU1GLENBQUMsQ0FBQ0csT0FBUixFQUFpQkosR0FBakIsQ0FBVixFQUFpQ0QsR0FBakMsQ0FEc0I7QUFBQSxDQUF4Qjs7QUFHQSxJQUFNTSxVQUFVLEdBQUdKLENBQUMsQ0FBQ0ssS0FBRixDQUNqQjtBQUFBLE1BQUdDLElBQUgsU0FBR0EsSUFBSDtBQUFBLE1BQVNSLEdBQVQsU0FBU0EsR0FBVDtBQUFBLE1BQWNDLEdBQWQsU0FBY0EsR0FBZDtBQUFBLE1BQW1CUSxJQUFuQixTQUFtQkEsSUFBbkI7QUFBQSxTQUNFUCxDQUFDLENBQUNFLEdBQUYsQ0FBTUYsQ0FBQyxDQUFDUSxNQUFGLENBQVNYLGVBQWUsQ0FBQztBQUFFQyxJQUFBQSxHQUFHLEVBQUhBLEdBQUY7QUFBT0MsSUFBQUEsR0FBRyxFQUFIQTtBQUFQLEdBQUQsQ0FBeEIsRUFBd0NRLElBQXhDLEVBQThDUCxDQUFDLENBQUNTLFFBQWhELENBQU4sRUFBaUVILElBQWpFLENBREY7QUFBQSxDQURpQixDQUFuQjs7QUFLTyxJQUFNSSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCLFFBUWxDO0FBQUEsTUFQSkosSUFPSSxTQVBKQSxJQU9JO0FBQUEsTUFOSlIsR0FNSSxTQU5KQSxHQU1JO0FBQUEsTUFMSkMsR0FLSSxTQUxKQSxHQUtJOztBQUNKLFVBQVFELEdBQUcsQ0FBQ2EsR0FBWjtBQUNFLFNBQUssYUFBTDtBQUNFLGFBQU9YLENBQUMsQ0FBQ1ksTUFBRixDQUFTWixDQUFDLENBQUNhLFVBQUYsQ0FBYWhCLGVBQWUsQ0FBQztBQUFFQyxRQUFBQSxHQUFHLEVBQUhBLEdBQUY7QUFBT0MsUUFBQUEsR0FBRyxFQUFIQTtBQUFQLE9BQUQsQ0FBNUIsQ0FBVCxFQUFzRE8sSUFBdEQsQ0FBUDs7QUFDRixTQUFLLFFBQUw7QUFDRSxhQUFPRixVQUFVLENBQUM7QUFBRUcsUUFBQUEsSUFBSSxFQUFFUCxDQUFDLENBQUNjLE1BQUYsQ0FBUyxLQUFULENBQVI7QUFBeUJSLFFBQUFBLElBQUksRUFBSkEsSUFBekI7QUFBK0JSLFFBQUFBLEdBQUcsRUFBSEEsR0FBL0I7QUFBb0NDLFFBQUFBLEdBQUcsRUFBSEE7QUFBcEMsT0FBRCxDQUFqQjs7QUFDRixTQUFLLGdCQUFMO0FBQ0UsYUFBT0ssVUFBVSxDQUFDO0FBQUVHLFFBQUFBLElBQUksRUFBRVAsQ0FBQyxDQUFDZSxJQUFGLENBQU8sVUFBUCxDQUFSO0FBQTRCVCxRQUFBQSxJQUFJLEVBQUpBLElBQTVCO0FBQWtDUixRQUFBQSxHQUFHLEVBQUhBLEdBQWxDO0FBQXVDQyxRQUFBQSxHQUFHLEVBQUhBO0FBQXZDLE9BQUQsQ0FBakI7O0FBQ0Y7QUFDRSxhQUFPTyxJQUFQO0FBUko7QUFVRCxDQW5CTTs7O2VBcUJRSSx3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XHJcblxyXG5jb25zdCBjaGVja1ByaW1hcnlLZXkgPSAoeyByb3csIHBrcyB9OiB7IHJvdzogYW55OyBwa3M6IGFueSB9KTogYW55ID0+XHJcbiAgUi5hbGxQYXNzKFIubWFwKFIuZXFQcm9wcywgcGtzKSkocm93KTtcclxuXHJcbmNvbnN0IGFsdGVyTWF0Y2ggPSBSLmN1cnJ5KFxyXG4gICh7IGRhdGEsIHJvdywgcGtzLCBmdW5jIH06IHsgZGF0YTogYW55OyByb3c6IGFueTsgcGtzOiBhbnk7IGZ1bmM6IGFueSB9KSA9PlxyXG4gICAgUi5tYXAoUi5pZkVsc2UoY2hlY2tQcmltYXJ5S2V5KHsgcm93LCBwa3MgfSksIGZ1bmMsIFIuaWRlbnRpdHkpLCBkYXRhKVxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZU1vZGlmaWNhdGlvbkhlbHBlciA9ICh7XHJcbiAgZGF0YSxcclxuICByb3csXHJcbiAgcGtzXHJcbn06IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgcm93OiBhbnk7XHJcbiAgcGtzOiBhbnk7XHJcbn0pID0+IHtcclxuICBzd2l0Y2ggKHJvdy5tb2QpIHtcclxuICAgIGNhc2UgXCJBZGQgTWFwcGluZ1wiOlxyXG4gICAgICByZXR1cm4gUi5maWx0ZXIoUi5jb21wbGVtZW50KGNoZWNrUHJpbWFyeUtleSh7IHJvdywgcGtzIH0pKSwgZGF0YSk7XHJcbiAgICBjYXNlIFwiRGVsZXRlXCI6XHJcbiAgICAgIHJldHVybiBhbHRlck1hdGNoKHsgZnVuYzogUi5kaXNzb2MoXCJtb2RcIiksIGRhdGEsIHJvdywgcGtzIH0pO1xyXG4gICAgY2FzZSBcIlVwZGF0ZSBNYXBwaW5nXCI6XHJcbiAgICAgIHJldHVybiBhbHRlck1hdGNoKHsgZnVuYzogUi5wcm9wKFwib3JpZ2luYWxcIiksIGRhdGEsIHJvdywgcGtzIH0pO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVtb3ZlTW9kaWZpY2F0aW9uSGVscGVyO1xyXG4iXX0=