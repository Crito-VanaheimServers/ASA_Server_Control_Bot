"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireWildcard(require("react-select"));

var R = _interopRequireWildcard(require("ramda"));

var _reactCustomScrollbars = _interopRequireDefault(require("react-custom-scrollbars"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop("value")));

var OnlyLabelName = function OnlyLabelName(_ref) {
  var labelName = _ref.labelName;
  return _react.default.createElement("label", {
    htmlFor: "select"
  }, _react.default.createElement("b", null, labelName));
};

var RequiredLabelName = function RequiredLabelName(_ref2) {
  var labelName = _ref2.labelName,
      requiredFieldText = _ref2.requiredFieldText;
  return _react.default.createElement("label", {
    htmlFor: "select"
  }, _react.default.createElement("div", {
    className: "requiredLabel"
  }, _react.default.createElement("b", null, labelName), _react.default.createElement("div", {
    className: "required"
  }, requiredFieldText)));
};

var sortOptionsFunc = function sortOptionsFunc(_ref3) {
  var options = _ref3.options,
      sortOptions = _ref3.sortOptions;
  return sortOptions ? sortByNameCaseInsensitive(options) : options;
};

var ScrollbarsMenu = function ScrollbarsMenu(props) {
  return _react.default.createElement(_reactCustomScrollbars.default, {
    autoHeight: true,
    universal: true,
    renderTrackHorizontal: function renderTrackHorizontal(p) {
      return _react.default.createElement("div", _extends({}, p, {
        style: {
          display: "none"
        },
        className: "track-horizontal"
      }));
    },
    renderThumbHorizontal: function renderThumbHorizontal(vals) {
      return _react.default.createElement("div", _extends({}, vals, {
        className: "thumb-horizontal"
      }));
    },
    renderThumbVertical: function renderThumbVertical(vals) {
      return _react.default.createElement("div", _extends({}, vals, {
        className: "thumb-vertical"
      }));
    }
  }, props.children);
};

var Menu = function Menu(props) {
  return _react.default.createElement(_reactSelect.components.Menu, props, props.menuShouldScrollIntoView ? _react.default.createElement(ScrollbarsMenu, props) : _react.default.createElement("div", {
    className: "arkSelectBody"
  }, props.children));
};

var Dropdown = function Dropdown(_ref4) {
  var labelName = _ref4.labelName,
      selectName = _ref4.selectName,
      change = _ref4.change,
      value = _ref4.value,
      options = _ref4.options,
      _ref4$sortOptions = _ref4.sortOptions,
      sortOptions = _ref4$sortOptions === void 0 ? false : _ref4$sortOptions,
      _ref4$isMulti = _ref4.isMulti,
      isMulti = _ref4$isMulti === void 0 ? false : _ref4$isMulti,
      _ref4$customScrollBar = _ref4.customScrollBars,
      customScrollBars = _ref4$customScrollBar === void 0 ? false : _ref4$customScrollBar,
      _ref4$isDisabled = _ref4.isDisabled,
      isDisabled = _ref4$isDisabled === void 0 ? false : _ref4$isDisabled,
      _ref4$isSearchable = _ref4.isSearchable,
      isSearchable = _ref4$isSearchable === void 0 ? false : _ref4$isSearchable,
      _ref4$isClearable = _ref4.isClearable,
      isClearable = _ref4$isClearable === void 0 ? false : _ref4$isClearable,
      _ref4$closeMenuOnSele = _ref4.closeMenuOnSelect,
      closeMenuOnSelect = _ref4$closeMenuOnSele === void 0 ? true : _ref4$closeMenuOnSele,
      _ref4$noOptionsMessag = _ref4.noOptionsMessage,
      _noOptionsMessage = _ref4$noOptionsMessag === void 0 ? "No Options" : _ref4$noOptionsMessag,
      requiredFieldText = _ref4.requiredFieldText,
      _ref4$placeholder = _ref4.placeholder,
      placeholder = _ref4$placeholder === void 0 ? "Select..." : _ref4$placeholder;

  return _react.default.createElement(_react.default.Fragment, null, !R.isEmpty(labelName) && R.isEmpty(requiredFieldText) ? _react.default.createElement(OnlyLabelName, {
    labelName: labelName
  }) : null, !R.isEmpty(labelName) && !R.isEmpty(requiredFieldText) ? _react.default.createElement(RequiredLabelName, {
    labelName: labelName,
    requiredFieldText: requiredFieldText
  }) : null, _react.default.createElement(_reactSelect.default, {
    isMulti: isMulti,
    className: "arkSelect",
    classNamePrefix: "arkSelect",
    name: selectName,
    value: value,
    onChange: change,
    options: sortOptionsFunc({
      options: options,
      sortOptions: sortOptions
    }),
    isDisabled: isDisabled,
    isSearchable: isSearchable,
    isClearable: isClearable,
    menuShouldScrollIntoView: customScrollBars,
    closeMenuOnSelect: closeMenuOnSelect,
    noOptionsMessage: function noOptionsMessage() {
      return _noOptionsMessage;
    },
    components: {
      Menu: Menu
    },
    placeholder: placeholder
  }));
};

var _default = Dropdown;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLnRzeCJdLCJuYW1lcyI6WyJzb3J0QnlOYW1lQ2FzZUluc2Vuc2l0aXZlIiwiUiIsInNvcnRCeSIsImNvbXBvc2UiLCJ0b0xvd2VyIiwicHJvcCIsIk9ubHlMYWJlbE5hbWUiLCJsYWJlbE5hbWUiLCJSZXF1aXJlZExhYmVsTmFtZSIsInJlcXVpcmVkRmllbGRUZXh0Iiwic29ydE9wdGlvbnNGdW5jIiwib3B0aW9ucyIsInNvcnRPcHRpb25zIiwiU2Nyb2xsYmFyc01lbnUiLCJwcm9wcyIsInAiLCJkaXNwbGF5IiwidmFscyIsImNoaWxkcmVuIiwiTWVudSIsIm1lbnVTaG91bGRTY3JvbGxJbnRvVmlldyIsIkRyb3Bkb3duIiwic2VsZWN0TmFtZSIsImNoYW5nZSIsInZhbHVlIiwiaXNNdWx0aSIsImN1c3RvbVNjcm9sbEJhcnMiLCJpc0Rpc2FibGVkIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJjbG9zZU1lbnVPblNlbGVjdCIsIm5vT3B0aW9uc01lc3NhZ2UiLCJwbGFjZWhvbGRlciIsImlzRW1wdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSx5QkFBeUIsR0FBR0MsQ0FBQyxDQUFDQyxNQUFGLENBQ2hDRCxDQUFDLENBQUNFLE9BQUYsQ0FDRUYsQ0FBQyxDQUFDRyxPQURKLEVBRUVILENBQUMsQ0FBQ0ksSUFBRixDQUFvQixPQUFwQixDQUZGLENBRGdDLENBQWxDOztBQU9BLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0I7QUFBQSxNQUFHQyxTQUFILFFBQUdBLFNBQUg7QUFBQSxTQUNwQjtBQUFPLElBQUEsT0FBTyxFQUFDO0FBQWYsS0FDRSx3Q0FBSUEsU0FBSixDQURGLENBRG9CO0FBQUEsQ0FBdEI7O0FBTUEsSUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQjtBQUFBLE1BQ3hCRCxT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LGlCQUFWLENBQXpCLEdBQ0MsNkJBQUMsYUFBRDtBQUFlLElBQUEsU0FBUyxFQUFFRjtBQUExQixJQURELEdBRUcsSUFITixFQUlHLENBQUNOLENBQUMsQ0FBQ2dDLE9BQUYsQ0FBVTFCLFNBQVYsQ0FBRCxJQUF5QixDQUFDTixDQUFDLENBQUNnQyxPQUFGLENBQVV4QixpQkFBVixDQUExQixHQUNDLDZCQUFDLGlCQUFEO0FBQ0UsSUFBQSxTQUFTLEVBQUVGLFNBRGI7QUFFRSxJQUFBLGlCQUFpQixFQUFFRTtBQUZyQixJQURELEdBS0csSUFUTixFQVVFLDZCQUFDLG9CQUFEO0FBQ0UsSUFBQSxPQUFPLEVBQUVnQixPQURYO0FBRUUsSUFBQSxTQUFTLEVBQUMsV0FGWjtBQUdFLElBQUEsZUFBZSxFQUFDLFdBSGxCO0FBSUUsSUFBQSxJQUFJLEVBQUVILFVBSlI7QUFLRSxJQUFBLEtBQUssRUFBRUUsS0FMVDtBQU1FLElBQUEsUUFBUSxFQUFFRCxNQU5aO0FBT0UsSUFBQSxPQUFPLEVBQUViLGVBQWUsQ0FBQztBQUFFQyxNQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0MsTUFBQUEsV0FBVyxFQUFYQTtBQUFYLEtBQUQsQ0FQMUI7QUFRRSxJQUFBLFVBQVUsRUFBRWUsVUFSZDtBQVNFLElBQUEsWUFBWSxFQUFFQyxZQVRoQjtBQVVFLElBQUEsV0FBVyxFQUFFQyxXQVZmO0FBV0UsSUFBQSx3QkFBd0IsRUFBRUgsZ0JBWDVCO0FBWUUsSUFBQSxpQkFBaUIsRUFBRUksaUJBWnJCO0FBYUUsSUFBQSxnQkFBZ0IsRUFBRTtBQUFBLGFBQU1DLGlCQUFOO0FBQUEsS0FicEI7QUFjRSxJQUFBLFVBQVUsRUFBRTtBQUFFWixNQUFBQSxJQUFJLEVBQUpBO0FBQUYsS0FkZDtBQWVFLElBQUEsV0FBVyxFQUFFYTtBQWZmLElBVkYsQ0FqQ2U7QUFBQSxDQUFqQjs7ZUErRGVYLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3QsIHsgY29tcG9uZW50cyB9IGZyb20gXCJyZWFjdC1zZWxlY3RcIjtcclxuaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcclxuaW1wb3J0IFNjcm9sbGJhcnMgZnJvbSBcInJlYWN0LWN1c3RvbS1zY3JvbGxiYXJzXCI7XHJcblxyXG5jb25zdCBzb3J0QnlOYW1lQ2FzZUluc2Vuc2l0aXZlID0gUi5zb3J0QnkoXHJcbiAgUi5jb21wb3NlKFxyXG4gICAgUi50b0xvd2VyLFxyXG4gICAgUi5wcm9wPGFueSwgc3RyaW5nPihcInZhbHVlXCIpXHJcbiAgKVxyXG4pO1xyXG5cclxuY29uc3QgT25seUxhYmVsTmFtZSA9ICh7IGxhYmVsTmFtZSB9OiB7IGxhYmVsTmFtZT86IHN0cmluZyB9KSA9PiAoXHJcbiAgPGxhYmVsIGh0bWxGb3I9XCJzZWxlY3RcIj5cclxuICAgIDxiPntsYWJlbE5hbWV9PC9iPlxyXG4gIDwvbGFiZWw+XHJcbik7XHJcblxyXG5jb25zdCBSZXF1aXJlZExhYmVsTmFtZSA9ICh7XHJcbiAgbGFiZWxOYW1lLFxyXG4gIHJlcXVpcmVkRmllbGRUZXh0XHJcbn06IHtcclxuICBsYWJlbE5hbWU/OiBzdHJpbmc7XHJcbiAgcmVxdWlyZWRGaWVsZFRleHQ/OiBzdHJpbmc7XHJcbn0pID0+IChcclxuICA8bGFiZWwgaHRtbEZvcj1cInNlbGVjdFwiPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZXF1aXJlZExhYmVsXCI+XHJcbiAgICAgIDxiPntsYWJlbE5hbWV9PC9iPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlcXVpcmVkXCI+e3JlcXVpcmVkRmllbGRUZXh0fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9sYWJlbD5cclxuKTtcclxuXHJcbmNvbnN0IHNvcnRPcHRpb25zRnVuYyA9ICh7XHJcbiAgb3B0aW9ucyxcclxuICBzb3J0T3B0aW9uc1xyXG59OiB7XHJcbiAgb3B0aW9uczogYW55W107XHJcbiAgc29ydE9wdGlvbnM6IGJvb2xlYW47XHJcbn0pID0+IChzb3J0T3B0aW9ucyA/IHNvcnRCeU5hbWVDYXNlSW5zZW5zaXRpdmUob3B0aW9ucykgOiBvcHRpb25zKTtcclxuXHJcbmNvbnN0IFNjcm9sbGJhcnNNZW51ID0gKHByb3BzOiBhbnkpID0+IChcclxuICA8U2Nyb2xsYmFyc1xyXG4gICAgYXV0b0hlaWdodFxyXG4gICAgdW5pdmVyc2FsPXt0cnVlfVxyXG4gICAgcmVuZGVyVHJhY2tIb3Jpem9udGFsPXtwID0+IChcclxuICAgICAgPGRpdiB7Li4ucH0gc3R5bGU9e3sgZGlzcGxheTogXCJub25lXCIgfX0gY2xhc3NOYW1lPVwidHJhY2staG9yaXpvbnRhbFwiIC8+XHJcbiAgICApfVxyXG4gICAgcmVuZGVyVGh1bWJIb3Jpem9udGFsPXt2YWxzID0+IChcclxuICAgICAgPGRpdiB7Li4udmFsc30gY2xhc3NOYW1lPVwidGh1bWItaG9yaXpvbnRhbFwiIC8+XHJcbiAgICApfVxyXG4gICAgcmVuZGVyVGh1bWJWZXJ0aWNhbD17dmFscyA9PiA8ZGl2IHsuLi52YWxzfSBjbGFzc05hbWU9XCJ0aHVtYi12ZXJ0aWNhbFwiIC8+fVxyXG4gID5cclxuICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICA8L1Njcm9sbGJhcnM+XHJcbik7XHJcbmNvbnN0IE1lbnUgPSAocHJvcHM6IGFueSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8Y29tcG9uZW50cy5NZW51IHsuLi5wcm9wc30+XHJcbiAgICAgIHtwcm9wcy5tZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXcgPyAoXHJcbiAgICAgICAgPFNjcm9sbGJhcnNNZW51IHsuLi5wcm9wc30gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFya1NlbGVjdEJvZHlcIj57cHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2NvbXBvbmVudHMuTWVudT5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgRHJvcGRvd24gPSAoe1xyXG4gIGxhYmVsTmFtZSxcclxuICBzZWxlY3ROYW1lLFxyXG4gIGNoYW5nZSxcclxuICB2YWx1ZSxcclxuICBvcHRpb25zLFxyXG4gIHNvcnRPcHRpb25zID0gZmFsc2UsXHJcbiAgaXNNdWx0aSA9IGZhbHNlLFxyXG4gIGN1c3RvbVNjcm9sbEJhcnMgPSBmYWxzZSxcclxuICBpc0Rpc2FibGVkID0gZmFsc2UsXHJcbiAgaXNTZWFyY2hhYmxlID0gZmFsc2UsXHJcbiAgaXNDbGVhcmFibGUgPSBmYWxzZSxcclxuICBjbG9zZU1lbnVPblNlbGVjdCA9IHRydWUsXHJcbiAgbm9PcHRpb25zTWVzc2FnZSA9IFwiTm8gT3B0aW9uc1wiLFxyXG4gIHJlcXVpcmVkRmllbGRUZXh0LFxyXG4gIHBsYWNlaG9sZGVyID0gXCJTZWxlY3QuLi5cIlxyXG59OiB7XHJcbiAgbGFiZWxOYW1lPzogc3RyaW5nO1xyXG4gIHNlbGVjdE5hbWU6IHN0cmluZztcclxuICB2YWx1ZTogYW55W107XHJcbiAgY2hhbmdlOiBhbnk7XHJcbiAgb3B0aW9uczogYW55W107XHJcbiAgc29ydE9wdGlvbnM/OiBib29sZWFuO1xyXG4gIGlzTXVsdGk/OiBib29sZWFuO1xyXG4gIGN1c3RvbVNjcm9sbEJhcnM/OiBib29sZWFuO1xyXG4gIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIGlzU2VhcmNoYWJsZT86IGJvb2xlYW47XHJcbiAgaXNDbGVhcmFibGU/OiBib29sZWFuO1xyXG4gIGNsb3NlTWVudU9uU2VsZWN0PzogYm9vbGVhbjtcclxuICByZXF1aXJlZEZpZWxkVGV4dD86IHN0cmluZztcclxuICBub09wdGlvbnNNZXNzYWdlPzogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG59KSA9PiAoXHJcbiAgPD5cclxuICAgIHshUi5pc0VtcHR5KGxhYmVsTmFtZSkgJiYgUi5pc0VtcHR5KHJlcXVpcmVkRmllbGRUZXh0KSA/IChcclxuICAgICAgPE9ubHlMYWJlbE5hbWUgbGFiZWxOYW1lPXtsYWJlbE5hbWV9IC8+XHJcbiAgICApIDogbnVsbH1cclxuICAgIHshUi5pc0VtcHR5KGxhYmVsTmFtZSkgJiYgIVIuaXNFbXB0eShyZXF1aXJlZEZpZWxkVGV4dCkgPyAoXHJcbiAgICAgIDxSZXF1aXJlZExhYmVsTmFtZVxyXG4gICAgICAgIGxhYmVsTmFtZT17bGFiZWxOYW1lfVxyXG4gICAgICAgIHJlcXVpcmVkRmllbGRUZXh0PXtyZXF1aXJlZEZpZWxkVGV4dH1cclxuICAgICAgLz5cclxuICAgICkgOiBudWxsfVxyXG4gICAgPFNlbGVjdFxyXG4gICAgICBpc011bHRpPXtpc011bHRpfVxyXG4gICAgICBjbGFzc05hbWU9XCJhcmtTZWxlY3RcIlxyXG4gICAgICBjbGFzc05hbWVQcmVmaXg9XCJhcmtTZWxlY3RcIlxyXG4gICAgICBuYW1lPXtzZWxlY3ROYW1lfVxyXG4gICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgIG9uQ2hhbmdlPXtjaGFuZ2V9XHJcbiAgICAgIG9wdGlvbnM9e3NvcnRPcHRpb25zRnVuYyh7IG9wdGlvbnMsIHNvcnRPcHRpb25zIH0pfVxyXG4gICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxyXG4gICAgICBpc1NlYXJjaGFibGU9e2lzU2VhcmNoYWJsZX1cclxuICAgICAgaXNDbGVhcmFibGU9e2lzQ2xlYXJhYmxlfVxyXG4gICAgICBtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXc9e2N1c3RvbVNjcm9sbEJhcnN9XHJcbiAgICAgIGNsb3NlTWVudU9uU2VsZWN0PXtjbG9zZU1lbnVPblNlbGVjdH1cclxuICAgICAgbm9PcHRpb25zTWVzc2FnZT17KCkgPT4gbm9PcHRpb25zTWVzc2FnZX1cclxuICAgICAgY29tcG9uZW50cz17eyBNZW51IH19XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgIC8+XHJcbiAgPC8+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bjtcclxuIl19