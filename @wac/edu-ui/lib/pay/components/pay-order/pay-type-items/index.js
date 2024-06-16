"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.map.js");

var React = _interopRequireWildcard(require("react"));

require("./index.less");

var PayTypeItems = function PayTypeItems(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      onPaySelected = _ref.onPaySelected,
      selectedPayType = _ref.selectedPayType;
  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-type-wrap"
  }, items.length ? items.map(function (item) {
    return item.isShow ? /*#__PURE__*/React.createElement("div", {
      key: item.payType,
      className: "type-item",
      onClick: function onClick() {
        onPaySelected && onPaySelected(item.payType);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "item-icon"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.logoUrl
    }), /*#__PURE__*/React.createElement("span", null, item.title), item.tips ? /*#__PURE__*/React.isValidElement(item.tips) ? item.tips : /*#__PURE__*/React.createElement("span", {
      className: "tips"
    }, item.tips) : null), /*#__PURE__*/React.createElement("div", {
      className: "item-select"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'img ' + (item.payType === selectedPayType ? 'icon-selected' : 'icon-select')
    }))) : null;
  }) : null);
};

var _default = /*#__PURE__*/React.memo(PayTypeItems);

exports.default = _default;