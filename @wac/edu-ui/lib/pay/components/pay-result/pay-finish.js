"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("../../../design/button"));

var PayFinish = function PayFinish(_ref) {
  var onHasPay = _ref.onHasPay,
      onRetry = _ref.onRetry;
  // 渲染已完成支付
  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "\u5DF2\u5B8C\u6210\u652F\u4ED8\uFF1F"), /*#__PURE__*/React.createElement(_button.default, {
    className: 'btn-pay',
    size: 'large',
    type: "primary",
    shape: 'round',
    onClick: onRetry
  }, "\u672A\u5B8C\u6210\uFF0C\u7EE7\u7EED\u652F\u4ED8"), /*#__PURE__*/React.createElement("a", {
    className: "link-has-pay",
    onClick: function onClick(e) {
      e.preventDefault();
      onHasPay();
    }
  }, "\u6211\u5DF2\u4ED8\u6B3E\uFF0C\u8FD4\u56DE\u67E5\u770B\u8BA2\u5355"));
};

var _default = /*#__PURE__*/React.memo(PayFinish);

exports.default = _default;