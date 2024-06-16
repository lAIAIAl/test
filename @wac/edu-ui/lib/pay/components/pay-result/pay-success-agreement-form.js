"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _icon = _interopRequireDefault(require("../../../design/icon"));

var _personalInfo = _interopRequireDefault(require("../../../personal-info"));

// 直播间内购买需要展示信息的课，渲染支付成功后展示表单信息
var PaySuccessAgreementForm = function PaySuccessAgreementForm(_ref) {
  var from = _ref.from,
      orderInfo = _ref.orderInfo,
      loginMobile = _ref.loginMobile,
      onSubmit = _ref.onSubmit;
  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-icon"
  }, /*#__PURE__*/React.createElement(_icon.default, {
    type: "pay-success"
  })), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "\u5DF2\u652F\u4ED8\u6210\u529F\uFF01")), /*#__PURE__*/React.createElement(_personalInfo.default, (0, _extends2.default)({
    source: from === 'live' ? 'live_broadcast' : 'page'
  }, orderInfo, {
    loginMobile: loginMobile,
    onSubmitCallBack: onSubmit
  })));
};

var _default = /*#__PURE__*/React.memo(PaySuccessAgreementForm);

exports.default = _default;