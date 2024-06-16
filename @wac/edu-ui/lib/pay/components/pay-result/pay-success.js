"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("../../../design/button"));

// 支付成功，x秒后跳转离开
var PaySuccess = function PaySuccess(_ref) {
  var onJump = _ref.onJump;

  var _React$useState = React.useState(5),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      seconds = _React$useState2[0],
      setSeconds = _React$useState2[1];

  var timer = React.useRef(null);
  React.useEffect(function () {
    countDown(seconds);
    return function () {
      clearTimeout(timer.current);
    };
  }, []); // 倒计时

  function countDown(seconds) {
    timer.current = setTimeout(function () {
      if (seconds > 1) {
        setSeconds(seconds - 1);
        countDown(seconds - 1);
      } else {
        onJump();
      }
    }, 1000);
  } // 渲染支付成功


  return /*#__PURE__*/React.createElement("div", {
    className: "m-pay-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "\u652F\u4ED8\u5DF2\u5B8C\u6210"), /*#__PURE__*/React.createElement("div", {
    className: "jump"
  }, "".concat(seconds, "\u79D2\u540E\u81EA\u52A8\u8DF3\u8F6C")), /*#__PURE__*/React.createElement(_button.default, {
    className: 'btn-has-pay',
    size: 'large',
    type: 'primary',
    shape: 'round',
    onClick: onJump
  }, "\u7ACB\u5373\u8DF3\u8F6C"));
};

var _default = /*#__PURE__*/React.memo(PaySuccess);

exports.default = _default;