"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("../../../design/button"));

var _icon = _interopRequireDefault(require("../../../design/icon"));

var PayFailOrCancel = function PayFailOrCancel(_ref) {
  var title = _ref.title,
      onRetry = _ref.onRetry;
  // 渲染支付失败（含取消支付）
  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-icon"
  }, /*#__PURE__*/React.createElement(_icon.default, {
    type: "pay-failure"
  })), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, title)), /*#__PURE__*/React.createElement(_button.default, {
    className: 'btn-has-pay',
    size: 'large',
    type: 'primary',
    shape: 'round',
    onClick: onRetry
  }, "\u652F\u4ED8\u9047\u5230\u95EE\u9898\uFF0C\u91CD\u65B0\u652F\u4ED8"));
};

var _default = /*#__PURE__*/React.memo(PayFailOrCancel);

exports.default = _default;