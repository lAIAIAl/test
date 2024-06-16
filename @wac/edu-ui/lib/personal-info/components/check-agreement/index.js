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

var CheckAgreement = function CheckAgreement(_ref) {
  var onChangeCheckbox = _ref.onChangeCheckbox,
      defaultChecked = _ref.defaultChecked,
      templateCode = _ref.templateCode,
      _ref$obviousProductSt = _ref.obviousProductStatus,
      obviousProductStatus = _ref$obviousProductSt === void 0 ? true : _ref$obviousProductSt;

  // 协议模版页面
  function toAgreement() {
    location.href = "/wac/xuexi/agreement-preview?templateCode=".concat(templateCode, "&agreementName=\u670D\u52A1\u534F\u8BAE");
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "m-check-agreement"
  }, templateCode ? obviousProductStatus ? /*#__PURE__*/React.createElement("div", {
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
  }, "\u300A\u670D\u52A1\u534F\u8BAE\u300B")) : null);
};

var _default = /*#__PURE__*/React.memo(CheckAgreement);

exports.default = _default;