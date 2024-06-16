"use strict";

require("core-js/modules/es6.reflect.construct.js");

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

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.promise.js");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _payResult = _interopRequireDefault(require("./components/pay-result"));

var _payOrder = _interopRequireDefault(require("./components/pay-order"));

var _payNotice = _interopRequireDefault(require("./components/pay-notice"));

var _constant = require("./constant");

require("./index.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PayContainer = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(PayContainer, _React$Component);

  var _super = _createSuper(PayContainer);

  function PayContainer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PayContainer);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setPayState", function (data) {
      _this.setState(_objectSpread({}, data));
    });
    _this.state = {
      // 支付状态
      payStatus: props.orderInfo.status || _constant.PAY_STATUS.INIT,
      pid: props.pid || '',
      agreementChecked: props.orderInfo.agreementChecked !== false // 协议是否勾选，默认true

    };
    return _this;
  }

  (0, _createClass2.default)(PayContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          successUrl = _this$props.successUrl,
          from = _this$props.from,
          isShowOnlineService = _this$props.isShowOnlineService,
          payResultProps = _this$props.payResultProps,
          orderInfo = _this$props.orderInfo,
          loginMobile = _this$props.loginMobile,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["successUrl", "from", "isShowOnlineService", "payResultProps", "orderInfo", "loginMobile"]);
      var _this$state = this.state,
          payStatus = _this$state.payStatus,
          pid = _this$state.pid;
      return /*#__PURE__*/React.createElement("div", {
        className: 'm-pay-container'
      }, pid || payStatus !== _constant.PAY_STATUS.INIT ? /*#__PURE__*/React.createElement(_payResult.default, (0, _extends2.default)({
        pid: pid,
        status: payStatus,
        jumpUrl: successUrl,
        retry: from === 'live' ? function () {
          _this2.setPayState({
            payStatus: _constant.PAY_STATUS.INIT,
            pid: ''
          });
        } : null,
        from: from,
        loginMobile: loginMobile,
        orderInfo: orderInfo
      }, payResultProps)) : /*#__PURE__*/React.createElement(_payOrder.default, (0, _extends2.default)({}, restProps, {
        from: from,
        loginMobile: loginMobile,
        orderInfo: orderInfo,
        setPayState: this.setPayState,
        checkClickPay: function checkClickPay() {
          if (orderInfo.obviousProductStatus) {
            return new Promise(function (resolve) {
              if (_this2.state.agreementChecked) {
                resolve({
                  code: 0
                });
              } else {
                resolve({
                  code: 1,
                  error: '请阅读并勾选页面协议'
                });
              }
            });
          } else {
            return Promise.resolve();
          }
        }
      }), /*#__PURE__*/React.createElement(_payNotice.default, {
        isShowOnlineService: isShowOnlineService,
        orderInfo: orderInfo,
        defaultChecked: this.state.agreementChecked,
        onChangeCheckbox: function onChangeCheckbox(checked) {
          _this2.setState({
            agreementChecked: checked
          });
        }
      })));
    }
  }]);
  return PayContainer;
}(React.Component);

exports.default = PayContainer;
(0, _defineProperty2.default)(PayContainer, "defaultProps", {
  isShowOnlineService: true,
  from: '',
  // 支付来源，比如 live-直播间
  orderInfo: {},
  couponInfo: {}
});