"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commitChangesHelper = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _ramdaFantasy = require("ramda-fantasy");

var _sanctuary = require("sanctuary");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __ = R.__;

var checkPrimaryKey = function checkPrimaryKey(_ref) {
  var row = _ref.row,
      pks = _ref.pks;
  return R.allPass(R.map(R.eqProps, pks))(row);
};
/* eslint max-params: ["error", 5] */


var alterMatch = R.curry(function (fn, state, row, pks) {
  return (
    /* eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/
    R.map(R.ifElse(checkPrimaryKey({
      row: row,
      pks: pks
    }), fn, R.identity), state)
  );
});

var nonPrimaryKeyValuesAltered = function nonPrimaryKeyValuesAltered(modalData, pks, errMsg) {
  return R.equals(R.omit(pks, modalData.row), R.omit(pks, modalData.orig)) ? (0, _sanctuary.Left)(errMsg) : (0, _sanctuary.Right)(modalData);
};

var excludesPrimaryKey = R.curry(function (tableData, modalData, pks, errMsg) {
  return (
    /* eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/
    tableData.filter(checkPrimaryKey({
      row: modalData.row,
      pks: pks
    })).length > 0 ? (0, _sanctuary.Left)([errMsg]) : (0, _sanctuary.Right)(modalData)
  );
});

var primaryKeyValuesMatch = function primaryKeyValuesMatch(modalData, pks, errMsg) {
  return R.all(function (x) {
    return R.equals(modalData.row[x], modalData.orig[x]);
  }, pks) ? (0, _sanctuary.Right)(modalData) : (0, _sanctuary.Left)([errMsg]);
};

var onlyNonPrimaryAltered = function onlyNonPrimaryAltered(modalData, pks, errMsg) {
  return R.pipe(function (x) {
    return primaryKeyValuesMatch(x, pks, errMsg);
  }, R.chain(function (x) {
    return nonPrimaryKeyValuesAltered(x, pks, errMsg);
  }))(modalData);
};

var addOrUpdate = function addOrUpdate(tableData, pks, errMsg) {
  return function (modalData) {
    var t1 = excludesPrimaryKey(tableData, modalData, pks, errMsg);
    var t2 = onlyNonPrimaryAltered(modalData, pks, errMsg);
    return (0, _sanctuary.concat)(t1, t2);
  };
};

var isUpdate = R.ifElse(R.propEq("type", "Update Mapping"), _sanctuary.Right, R.always((0, _sanctuary.Left)([])));
var getUpdater = (0, _ramdaFantasy.Reader)(function (_ref2) {
  var _ref3 = _slicedToArray(_ref2, 4),
      pks = _ref3[0],
      errMsg = _ref3[1],
      modalData = _ref3[2],
      tableData = _ref3[3];

  return R.pipe(isUpdate, R.chain(addOrUpdate(tableData, pks, errMsg)), R.map(function (m) {
    return R.assoc("mod", m.type, m.row);
  }), R.map(R.assoc("original", modalData.orig.original || modalData.orig)), R.map(function (updated) {
    return alterMatch(R.always(updated), tableData, modalData.orig, pks);
  }))(modalData);
});
var isAdd = R.ifElse(R.propEq("type", "Add Mapping"), _sanctuary.Right, R.always((0, _sanctuary.Left)([])));
/* eslint array-element-newline: ["error", { "multiline": true }] */

var getAdder = (0, _ramdaFantasy.Reader)(function (_ref4) {
  var _ref5 = _slicedToArray(_ref4, 4),
      pks = _ref5[0],
      errMsg = _ref5[1],
      modalData = _ref5[2],
      tableData = _ref5[3];

  return R.pipe(isAdd, R.chain(function (x) {
    return excludesPrimaryKey(tableData, x, pks, errMsg);
  }), R.map(function (m) {
    return R.assoc("mod", m.type, m.row);
  }), R.map(R.prepend(__, tableData)))(modalData);
});
var getModifiers = R.sequence(_ramdaFantasy.Reader.of, [getUpdater, getAdder]).map( // eslint-disable-next-line
R.apply(_sanctuary.concat));
var commitChangesHelper = getModifiers.run;
exports.commitChangesHelper = commitChangesHelper;
var _default = commitChangesHelper;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXBwaW5nVG9vbHMvY29tbWl0TW9kaWZpY2F0aW9uMi5qcyJdLCJuYW1lcyI6WyJfXyIsIlIiLCJjaGVja1ByaW1hcnlLZXkiLCJyb3ciLCJwa3MiLCJhbGxQYXNzIiwibWFwIiwiZXFQcm9wcyIsImFsdGVyTWF0Y2giLCJjdXJyeSIsImZuIiwic3RhdGUiLCJpZkVsc2UiLCJpZGVudGl0eSIsIm5vblByaW1hcnlLZXlWYWx1ZXNBbHRlcmVkIiwibW9kYWxEYXRhIiwiZXJyTXNnIiwiZXF1YWxzIiwib21pdCIsIm9yaWciLCJleGNsdWRlc1ByaW1hcnlLZXkiLCJ0YWJsZURhdGEiLCJmaWx0ZXIiLCJsZW5ndGgiLCJwcmltYXJ5S2V5VmFsdWVzTWF0Y2giLCJhbGwiLCJ4Iiwib25seU5vblByaW1hcnlBbHRlcmVkIiwicGlwZSIsImNoYWluIiwiYWRkT3JVcGRhdGUiLCJ0MSIsInQyIiwiaXNVcGRhdGUiLCJwcm9wRXEiLCJSaWdodCIsImFsd2F5cyIsImdldFVwZGF0ZXIiLCJtIiwiYXNzb2MiLCJ0eXBlIiwib3JpZ2luYWwiLCJ1cGRhdGVkIiwiaXNBZGQiLCJnZXRBZGRlciIsInByZXBlbmQiLCJnZXRNb2RpZmllcnMiLCJzZXF1ZW5jZSIsIlJlYWRlciIsIm9mIiwiYXBwbHkiLCJjb25jYXQiLCJjb21taXRDaGFuZ2VzSGVscGVyIiwicnVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVRQSxFLEdBQU9DLEMsQ0FBUEQsRTs7QUFFUixJQUFNRSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEsTUFBR0MsR0FBSCxRQUFHQSxHQUFIO0FBQUEsTUFBUUMsR0FBUixRQUFRQSxHQUFSO0FBQUEsU0FBa0JILENBQUMsQ0FBQ0ksT0FBRixDQUFVSixDQUFDLENBQUNLLEdBQUYsQ0FBTUwsQ0FBQyxDQUFDTSxPQUFSLEVBQWlCSCxHQUFqQixDQUFWLEVBQWlDRCxHQUFqQyxD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Rm1CLENBQXJCO0FBS08sSUFBTUMsbUJBQW1CLEdBQUdOLFlBQVksQ0FBQ08sR0FBekM7O2VBRVFELG1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcclxuaW1wb3J0IHsgUmVhZGVyIH0gZnJvbSBcInJhbWRhLWZhbnRhc3lcIjtcclxuaW1wb3J0IHsgTGVmdCwgUmlnaHQsIGNvbmNhdCB9IGZyb20gXCJzYW5jdHVhcnlcIjtcclxuXHJcbmNvbnN0IHsgX18gfSA9IFI7XHJcblxyXG5jb25zdCBjaGVja1ByaW1hcnlLZXkgPSAoeyByb3csIHBrcyB9KSA9PiBSLmFsbFBhc3MoUi5tYXAoUi5lcVByb3BzLCBwa3MpKShyb3cpO1xyXG5cclxuLyogZXNsaW50IG1heC1wYXJhbXM6IFtcImVycm9yXCIsIDVdICovXHJcbmNvbnN0IGFsdGVyTWF0Y2ggPSBSLmN1cnJ5KChmbiwgc3RhdGUsIHJvdywgcGtzKSA9PlxyXG4gIC8qIGVzbGludCBvYmplY3QtcHJvcGVydHktbmV3bGluZTogW1wiZXJyb3JcIiwgeyBcImFsbG93QWxsUHJvcGVydGllc09uU2FtZUxpbmVcIjogdHJ1ZSB9XSovXHJcbiAgUi5tYXAoUi5pZkVsc2UoY2hlY2tQcmltYXJ5S2V5KHsgcm93LCBwa3MgfSksIGZuLCBSLmlkZW50aXR5KSwgc3RhdGUpXHJcbik7XHJcbmNvbnN0IG5vblByaW1hcnlLZXlWYWx1ZXNBbHRlcmVkID0gKG1vZGFsRGF0YSwgcGtzLCBlcnJNc2cpID0+XHJcbiAgUi5lcXVhbHMoUi5vbWl0KHBrcywgbW9kYWxEYXRhLnJvdyksIFIub21pdChwa3MsIG1vZGFsRGF0YS5vcmlnKSlcclxuICAgID8gTGVmdChlcnJNc2cpXHJcbiAgICA6IFJpZ2h0KG1vZGFsRGF0YSk7XHJcblxyXG5jb25zdCBleGNsdWRlc1ByaW1hcnlLZXkgPSBSLmN1cnJ5KCh0YWJsZURhdGEsIG1vZGFsRGF0YSwgcGtzLCBlcnJNc2cpID0+XHJcbiAgLyogZXNsaW50IG9iamVjdC1wcm9wZXJ0eS1uZXdsaW5lOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dBbGxQcm9wZXJ0aWVzT25TYW1lTGluZVwiOiB0cnVlIH1dKi9cclxuICB0YWJsZURhdGEuZmlsdGVyKGNoZWNrUHJpbWFyeUtleSh7IHJvdzogbW9kYWxEYXRhLnJvdywgcGtzIH0pKS5sZW5ndGggPiAwXHJcbiAgICA/IExlZnQoW2Vyck1zZ10pXHJcbiAgICA6IFJpZ2h0KG1vZGFsRGF0YSlcclxuKTtcclxuXHJcbmNvbnN0IHByaW1hcnlLZXlWYWx1ZXNNYXRjaCA9IChtb2RhbERhdGEsIHBrcywgZXJyTXNnKSA9PlxyXG4gIFIuYWxsKHggPT4gUi5lcXVhbHMobW9kYWxEYXRhLnJvd1t4XSwgbW9kYWxEYXRhLm9yaWdbeF0pLCBwa3MpXHJcbiAgICA/IFJpZ2h0KG1vZGFsRGF0YSlcclxuICAgIDogTGVmdChbZXJyTXNnXSk7XHJcblxyXG5jb25zdCBvbmx5Tm9uUHJpbWFyeUFsdGVyZWQgPSAobW9kYWxEYXRhLCBwa3MsIGVyck1zZykgPT5cclxuICBSLnBpcGUoXHJcbiAgICB4ID0+IHByaW1hcnlLZXlWYWx1ZXNNYXRjaCh4LCBwa3MsIGVyck1zZyksXHJcbiAgICBSLmNoYWluKHggPT4gbm9uUHJpbWFyeUtleVZhbHVlc0FsdGVyZWQoeCwgcGtzLCBlcnJNc2cpKVxyXG4gICkobW9kYWxEYXRhKTtcclxuY29uc3QgYWRkT3JVcGRhdGUgPSAodGFibGVEYXRhLCBwa3MsIGVyck1zZykgPT4gbW9kYWxEYXRhID0+IHtcclxuICBjb25zdCB0MSA9IGV4Y2x1ZGVzUHJpbWFyeUtleSh0YWJsZURhdGEsIG1vZGFsRGF0YSwgcGtzLCBlcnJNc2cpO1xyXG4gIGNvbnN0IHQyID0gb25seU5vblByaW1hcnlBbHRlcmVkKG1vZGFsRGF0YSwgcGtzLCBlcnJNc2cpO1xyXG4gIHJldHVybiBjb25jYXQodDEsIHQyKTtcclxufTtcclxuXHJcbmNvbnN0IGlzVXBkYXRlID0gUi5pZkVsc2UoXHJcbiAgUi5wcm9wRXEoXCJ0eXBlXCIsIFwiVXBkYXRlIE1hcHBpbmdcIiksXHJcbiAgUmlnaHQsXHJcbiAgUi5hbHdheXMoTGVmdChbXSkpXHJcbik7XHJcbmNvbnN0IGdldFVwZGF0ZXIgPSBSZWFkZXIoKFtwa3MsIGVyck1zZywgbW9kYWxEYXRhLCB0YWJsZURhdGFdKSA9PlxyXG4gIFIucGlwZShcclxuICAgIGlzVXBkYXRlLFxyXG4gICAgUi5jaGFpbihhZGRPclVwZGF0ZSh0YWJsZURhdGEsIHBrcywgZXJyTXNnKSksXHJcbiAgICBSLm1hcChtID0+IFIuYXNzb2MoXCJtb2RcIiwgbS50eXBlLCBtLnJvdykpLFxyXG4gICAgUi5tYXAoUi5hc3NvYyhcIm9yaWdpbmFsXCIsIG1vZGFsRGF0YS5vcmlnLm9yaWdpbmFsIHx8IG1vZGFsRGF0YS5vcmlnKSksXHJcbiAgICBSLm1hcCh1cGRhdGVkID0+XHJcbiAgICAgIGFsdGVyTWF0Y2goUi5hbHdheXModXBkYXRlZCksIHRhYmxlRGF0YSwgbW9kYWxEYXRhLm9yaWcsIHBrcylcclxuICAgIClcclxuICApKG1vZGFsRGF0YSlcclxuKTtcclxuXHJcbmNvbnN0IGlzQWRkID0gUi5pZkVsc2UoXHJcbiAgUi5wcm9wRXEoXCJ0eXBlXCIsIFwiQWRkIE1hcHBpbmdcIiksXHJcbiAgUmlnaHQsXHJcbiAgUi5hbHdheXMoTGVmdChbXSkpXHJcbik7XHJcbi8qIGVzbGludCBhcnJheS1lbGVtZW50LW5ld2xpbmU6IFtcImVycm9yXCIsIHsgXCJtdWx0aWxpbmVcIjogdHJ1ZSB9XSAqL1xyXG5jb25zdCBnZXRBZGRlciA9IFJlYWRlcigoW3BrcywgZXJyTXNnLCBtb2RhbERhdGEsIHRhYmxlRGF0YV0pID0+XHJcbiAgUi5waXBlKFxyXG4gICAgaXNBZGQsXHJcbiAgICBSLmNoYWluKHggPT4gZXhjbHVkZXNQcmltYXJ5S2V5KHRhYmxlRGF0YSwgeCwgcGtzLCBlcnJNc2cpKSxcclxuICAgIFIubWFwKG0gPT4gUi5hc3NvYyhcIm1vZFwiLCBtLnR5cGUsIG0ucm93KSksXHJcbiAgICBSLm1hcChSLnByZXBlbmQoX18sIHRhYmxlRGF0YSkpXHJcbiAgKShtb2RhbERhdGEpXHJcbik7XHJcbmNvbnN0IGdldE1vZGlmaWVycyA9IFIuc2VxdWVuY2UoUmVhZGVyLm9mLCBbZ2V0VXBkYXRlciwgZ2V0QWRkZXJdKS5tYXAoXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgUi5hcHBseShjb25jYXQpXHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgY29tbWl0Q2hhbmdlc0hlbHBlciA9IGdldE1vZGlmaWVycy5ydW47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21taXRDaGFuZ2VzSGVscGVyO1xyXG4iXX0=