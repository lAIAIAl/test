"use strict";

require("core-js/modules/es6.object.keys.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.array.filter.js");

require("core-js/modules/es6.object.get-own-property-descriptor.js");

require("core-js/modules/es7.object.get-own-property-descriptors.js");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _qrcode = _interopRequireDefault(require("qrcode.react"));

var _api = require("../../../api");

require("./index.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PayQrCode = function PayQrCode(props) {
  var orderId = props.orderId,
      couponId = props.couponId,
      paySubmitData = props.paySubmitData;

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      payQrCodeData = _React$useState2[0],
      setPayQrCodeData = _React$useState2[1];

  var getPayQrCodeData = function getPayQrCodeData() {
    (0, _api.submitPayByAliPayQrCode)(_objectSpread({
      orderId: orderId,
      couponId: couponId
    }, paySubmitData)).then(function (data) {
      setPayQrCodeData(data);
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-qrcode-wrapper"
  }, (!payQrCodeData || !payQrCodeData.qrCodeUrl) && /*#__PURE__*/React.createElement("div", {
    className: "m-get-qrcode",
    onClick: getPayQrCodeData
  }), payQrCodeData && payQrCodeData.qrCodeUrl && /*#__PURE__*/React.createElement("div", {
    className: "m-pay-qrcode"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-qrcode"
  }, payQrCodeData && payQrCodeData.qrCodeUrl && /*#__PURE__*/React.createElement(_qrcode.default, {
    renderAs: 'canvas',
    value: payQrCodeData.qrCodeUrl,
    size: 60
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-qrcode-tips"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tip tip-title"
  }, "\u652F\u4ED8\u9047\u5230\u95EE\u9898\uFF1F"), /*#__PURE__*/React.createElement("div", {
    className: "tip tip-info"
  }, "\u6253\u5F00", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FFCC00'
    }
  }, "\u201C\u652F\u4ED8\u5B9D\u201D"), "\u626B\u7801\u6216\u8005\u622A\u5C4F\u4FDD\u5B58\u5230\u672C\u5730\u76F8\u518C\u8BC6\u522B\u652F\u4ED8"), /*#__PURE__*/React.createElement("span", {
    className: "tip tip-exp-time"
  }, "\u652F\u4ED8\u7801\u5931\u6548\u65F6\u95F4\uFF1A", payQrCodeData.briefTimeout))));
};

var _default = /*#__PURE__*/React.memo(PayQrCode);

exports.default = _default;