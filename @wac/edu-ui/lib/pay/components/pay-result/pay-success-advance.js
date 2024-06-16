"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

// 直播间内购买进阶课，渲染支付成功
var PaySuccessAdvance = function PaySuccessAdvance() {
  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-result"
  }, /*#__PURE__*/React.createElement("img", {
    src: require('../../images/img-advance-success.png'),
    className: "img-advance-success"
  }));
};

var _default = /*#__PURE__*/React.memo(PaySuccessAdvance);

exports.default = _default;