"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

require("./index.less");

var _checkbox = _interopRequireDefault(require("../../../design/checkbox"));

var PayNotice = function PayNotice(_ref) {
  var noticeText = _ref.noticeText,
      isShowOnlineService = _ref.isShowOnlineService,
      orderInfo = _ref.orderInfo,
      onChangeCheckbox = _ref.onChangeCheckbox,
      defaultChecked = _ref.defaultChecked;

  var _ref2 = orderInfo || {},
      templateCode = _ref2.templateCode,
      obviousProductStatus = _ref2.obviousProductStatus; // 协议模版页面


  function toAgreement() {
    location.href = "/wac/xuexi/agreement-preview?templateCode=".concat(templateCode, "&agreementName=\u670D\u52A1\u534F\u8BAE");
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-notice"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notice-title"
  }, "\u6E29\u99A8\u63D0\u793A\uFF1A"), noticeText || '您将购买的课程为线上课程内容服务，购买后不支持退款或转让，请您知悉并理解。购买后可在“钱堂教育学习中心”公众号上点击“已购课程”查看。', templateCode ? obviousProductStatus ? /*#__PURE__*/React.createElement("div", {
    className: "notice-agreement-checked"
  }, /*#__PURE__*/React.createElement(_checkbox.default, {
    defaultChecked: defaultChecked,
    onChange: function onChange(checked) {
      onChangeCheckbox && onChangeCheckbox(checked);
    }
  }), "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F", /*#__PURE__*/React.createElement("span", {
    onClick: toAgreement
  }, "\u300A\u670D\u52A1\u534F\u8BAE\u300B")) : /*#__PURE__*/React.createElement("div", {
    className: "notice-agreement"
  }, "\u70B9\u51FB\u4ED8\u6B3E\u6309\u94AE\u5373\u4EE3\u8868\u9605\u8BFB\u5E76\u540C\u610F", /*#__PURE__*/React.createElement("span", {
    onClick: toAgreement
  }, "\u300A\u670D\u52A1\u534F\u8BAE\u300B")) : null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), isShowOnlineService ? /*#__PURE__*/React.createElement("div", {
    className: "online-service"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://help.wacai.com/help/customerCenter/common/entrance?entranceId=9017"
  }, "\u5728\u7EBF\u5BA2\u670D")) : null);
};

var _default = /*#__PURE__*/React.memo(PayNotice);

exports.default = _default;