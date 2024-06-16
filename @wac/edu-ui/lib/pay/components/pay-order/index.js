"use strict";

require("core-js/modules/es6.reflect.construct.js");

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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.string.includes.js");

require("core-js/modules/es7.array.includes.js");

require("core-js/modules/es6.array.map.js");

require("core-js/modules/es6.object.keys.js");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("../../../design/button"));

var _toast = _interopRequireDefault(require("../../../design/toast"));

var _payTypeItems = _interopRequireDefault(require("./pay-type-items"));

var _constant = require("../../constant");

require("./index.less");

var _api = require("../../api");

var _api2 = require("../../../personal-info/api");

var _payQrcode = _interopRequireDefault(require("./pay-qrcode"));

var _utils = require("../../../common/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PayOrder = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(PayOrder, _React$Component);

  var _super = _createSuper(PayOrder);

  function PayOrder(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PayOrder);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "wxTradeType", function () {
      var wxPayParam = _this.props.wxPayParam;
      var payType = _this.state.payType;

      if (payType === _constant.PAY_TYPES.ALIPAY) {
        return 'WAP';
      } else {
        return wxPayParam && wxPayParam.openId ? 'JSAPI' : 'H5';
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleUrl", function (url, key, value) {
      var newUrl = url;

      if (url.includes("".concat(key, "="))) {
        return url;
      }

      newUrl = url + (url.includes('?') ? '&' : '?') + "".concat(key, "=").concat(value);
      return newUrl;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "mackRecord", function () {
      var _this$props = _this.props,
          orderInfo = _this$props.orderInfo,
          from = _this$props.from;

      var _ref = orderInfo || {},
          templateCode = _ref.templateCode,
          templateVersion = _ref.templateVersion,
          orderId = _ref.orderId,
          productId = _ref.productId;

      var params = {
        type: 'agreement_marks',
        source: from === 'live' ? 'live_broadcast' : 'page',
        productId: productId,
        orderId: orderId,
        templateCode: templateCode,
        templateVersion: templateVersion
      };
      return (0, _api2.insetRecord)(params, _this.props.axiosConfig);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "checkPayTypeCanPay", function (payType) {
      var _this$props2 = _this.props,
          showWechatPay = _this$props2.showWechatPay,
          showAliPay = _this$props2.showAliPay,
          showJdPay = _this$props2.showJdPay;
      return payType === _constant.PAY_TYPES.WECHAT && showWechatPay || payType === _constant.PAY_TYPES.ALIPAY && showAliPay || payType === _constant.PAY_TYPES.JDPAY && showJdPay;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handlePay", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var payType, _this$props3, orderInfo, couponInfo, wxPayParam, paySubmitData, beforePaySubmit, paySubmitSuccessCallback, checkClickPay, _ref3, openId, appId, res, aliPayQuitUrl, aliPaySuccUrl, loading, params;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payType = _this.state.payType;

              if (_this.checkPayTypeCanPay(payType)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", _toast.default.message('请选择支付方式'));

            case 3:
              _this$props3 = _this.props, orderInfo = _this$props3.orderInfo, couponInfo = _this$props3.couponInfo, wxPayParam = _this$props3.wxPayParam, paySubmitData = _this$props3.paySubmitData, beforePaySubmit = _this$props3.beforePaySubmit, paySubmitSuccessCallback = _this$props3.paySubmitSuccessCallback, checkClickPay = _this$props3.checkClickPay;
              _ref3 = wxPayParam || {}, openId = _ref3.openId, appId = _ref3.appId;

              if (!checkClickPay) {
                _context.next = 14;
                break;
              }

              _context.next = 8;
              return checkClickPay();

            case 8:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 11;
                break;
              }

              _context.t0 = {};

            case 11:
              res = _context.t0;

              if (!res.error) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", _toast.default.message(res.error));

            case 14:
              // 存在协议模版code，留痕
              if (orderInfo && orderInfo.templateCode) {
                _this.mackRecord();
              }

              aliPayQuitUrl = '';
              aliPaySuccUrl = '';

              if (payType !== _constant.PAY_TYPES.WECHAT) {
                // 支付宝&京东中断返回url
                aliPayQuitUrl = _this.handleUrl(location.href, 'payStatus', -1); // 支付宝&京东成功返回url

                aliPaySuccUrl = location.href;
              }

              loading = _toast.default.loading('支付中，请稍后', true);
              params = _objectSpread(_objectSpread({}, orderInfo), {}, {
                couponId: couponInfo.id,
                payType: payType,
                appId: appId,
                map: {
                  openId: openId,
                  wxTradeType: _this.wxTradeType(),
                  redirectUrl: aliPaySuccUrl,
                  quitUrl: aliPayQuitUrl
                }
              }, paySubmitData);

              if (beforePaySubmit) {
                beforePaySubmit({
                  paySubmitData: params
                });
              }

              (0, _api.submitPay)(params, _this.props.axiosConfig || {}).then(function (result) {
                loading.close();

                _this.props.setPayState({
                  payStatus: result.payStatus,
                  pid: result.payId
                });

                paySubmitSuccessCallback && paySubmitSuccessCallback({
                  paySubmitData: params,
                  payResultData: result
                }); // 支付中

                if (result.payStatus === _constant.PAY_STATUS.DOING) {
                  switch (payType) {
                    case _constant.PAY_TYPES.ALIPAY:
                      // 处理支付宝支付
                      _this.handleAliPay(result);

                      break;

                    case _constant.PAY_TYPES.WECHAT:
                      // 处理微信支付
                      _this.handleWechatPay(result);

                      break;

                    case _constant.PAY_TYPES.JDPAY:
                      // 处理京东支付
                      _this.handleJdPay(result);

                  }
                }
              }).catch(function (e) {
                loading.close();
                var errMsg = e.msg || e.error || '请求失败，请重试';

                _toast.default.message(errMsg);
              });

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleJdPay", function (result) {
      var _ref4 = result || {
        JDPAYAPPPAY_PREPARE: ''
      },
          JDPAYAPPPAY_PREPARE = _ref4.JDPAYAPPPAY_PREPARE;

      if (!JDPAYAPPPAY_PREPARE) {
        return _toast.default.message('请求失败，请重试');
      }

      var params = JSON.parse(JDPAYAPPPAY_PREPARE);
      /* const params = {
        "amount": "58b0c329a98b1c6c",
        "bizTp": "5dfc41d4836db33084ae1cbbdcbe88e6",
        "callbackUrl": "8d7575c9cb08edb3b57eb35a02133789ad402e459542d849f7a5403e419721f4",
        "currency": "ac7132c57f10d3ce",
        "merchant": "22294531",
        "notifyUrl": "c92951906485faee27423d8a6557b0b7ea7c35f21e633b53",
        "orderType": "e5a6c3761ab9ddaf",
        "sign": "YbhA8UFUzoYWuxZE6G5cI3KUZQBro6y1An3rgl6UnjytpRtqo/0qD96HOl5Je1BoTclUp84LVz+i/fQ3QpTSYMlyz4SvbSqPGusI+SE8CUik5dbDlcW4kGXlqXwZqSVqKHNzDTT4ZcjEEUbhuEVHw0/T8Sg2+G1g96+xUgQ3LFE=",
        "tradeName": "c5fd30ac8e2df9ab280388c20dd9802063d005db06ece948",
        "tradeNum": "8a10a617584916a32d9893879ab87447f99fcb73da81cf8d128818b32cb7add670c56f74a8a20cdc",
        "tradeTime": "ad570edfa4c23d3480666bc2c722799a38309ef3ab6c53d2",
        "userId": "86da0d8709c1fab3169318d221ffc89e",
        "version": "V2.0"
      } */

      var data = Object.keys(params).map(function (key) {
        return "".concat(key, "=").concat(encodeURIComponent(params[key]));
      }).join('&');
      location.href = "/wac/xuexi/jd-pay?".concat(data);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleWechatPay", function (result) {
      var wxPayParam = _this.props.wxPayParam;

      if (wxPayParam && wxPayParam.openId) {
        // 微信内，JSAPI支付
        _this.jsapiPay(result.payId, result.WEIXINAPPPAY_PREPARE);
      } else {
        // 跳转微信支付中间页
        var redirectUrl = window.location.href + (window.location.href.includes('?') ? '&' : '?') + "pid=".concat(result.payId);
        var url = result.WEIXINAPPPAY_PREPARE && result.WEIXINAPPPAY_PREPARE.mweburl + '&redirect_url=' + encodeURIComponent(redirectUrl);
        location.href = url;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAliPay", function (result) {
      if (!result.ALIPAYAPPPAY_PREPARE) {
        return _toast.default.message('请求失败，请重试');
      }

      var _this$props4 = _this.props,
          token = _this$props4.token,
          isWechatEnv = _this$props4.isWechatEnv;
      var url = result.ALIPAYAPPPAY_PREPARE;

      if (isWechatEnv) {
        location.href = "/wac/xuexi/open-browser?openUrl=".concat(encodeURIComponent(url), "&wctk=").concat(token);
        return;
      }

      location.href = url;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "jsapiPay", /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(pid, payData) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // 唤起微信支付

                /* eslint-disable-next-line */
                if (WeixinJSBridge && pid) {
                  // 微信支付 https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6

                  /* eslint-disable-next-line */
                  WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    appId: payData.appid,
                    nonceStr: payData.noncestr,
                    package: payData.package,
                    signType: payData.signType,
                    timeStamp: payData.timestamp,
                    paySign: payData.paySign
                  }, function (res) {
                    var payStatus = '';

                    if (res.err_msg === 'get_brand_wcpay_request:fail') {
                      // 支付失败
                      payStatus = _constant.PAY_STATUS.FAIL;
                    }

                    if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                      // 支付取消
                      payStatus = _constant.PAY_STATUS.CANCEL;
                    } else if (res.err_msg === 'get_brand_wcpay_request:ok') {// 支付成功，使用轮询接口判断
                    }

                    _this.props.setPayState({
                      pid: pid,
                      payStatus: payStatus
                    });
                  });
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref5.apply(this, arguments);
      };
    }());
    _this.state = {
      // 支付方式
      payType: props.payType
    };
    return _this;
  }

  (0, _createClass2.default)(PayOrder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _utils.saveLocalStorageWithKey)('payType', this.props.payType);
    } // 获取对应支付方式的场景

  }, {
    key: "onPaySelected",
    value: // 现在支付方式
    function onPaySelected(type) {
      (0, _utils.saveLocalStorageWithKey)('payType', type);
      this.setState({
        payType: type
      });
    }
    /**
     * 渲染支付显示页
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          orderInfo = _this$props5.orderInfo,
          couponInfo = _this$props5.couponInfo,
          showAliPayQrCode = _this$props5.showAliPayQrCode,
          showAliPay = _this$props5.showAliPay,
          showJdPay = _this$props5.showJdPay,
          showWechatPay = _this$props5.showWechatPay,
          paySubmitData = _this$props5.paySubmitData;
      var payType = this.state.payType;
      return /*#__PURE__*/React.createElement("div", {
        className: "m-pay-order-wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "m-price-wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "price-wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "price-desc"
      }, orderInfo.title), /*#__PURE__*/React.createElement("div", {
        className: "name"
      }, /*#__PURE__*/React.createElement("span", {
        className: "price price-current"
      }, "\uFFE5", (orderInfo.orderAmount / 100).toFixed(2)), (orderInfo.showPrice || 0) > 0 ? /*#__PURE__*/React.createElement("span", {
        className: "price price-show"
      }, "\uFFE5", ((orderInfo.showPrice || 0) / 100).toFixed(2)) : null)), couponInfo && couponInfo.id ? /*#__PURE__*/React.createElement("div", {
        className: "price-wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "price-desc"
      }, "\u9650\u65F6\u4F18\u60E0"), /*#__PURE__*/React.createElement("div", {
        className: "name"
      }, /*#__PURE__*/React.createElement("span", {
        className: "price price-coupon"
      }, "-\uFFE5", (orderInfo.couponAmount / 100).toFixed(2)))) : /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
        className: "pay-type-title"
      }, "\u652F\u4ED8\u65B9\u5F0F"), /*#__PURE__*/React.createElement(_payTypeItems.default, {
        items: [{
          payType: _constant.PAY_TYPES.WECHAT,
          title: '微信支付',
          logoUrl: 'https://s1.wacdn.com/wis/524/20dc98343ccf55dd_48x42.png',
          isShow: showWechatPay
        }, {
          payType: _constant.PAY_TYPES.ALIPAY,
          title: '支付宝支付',
          tips: /*#__PURE__*/React.createElement("span", {
            className: "tips tips-alipay"
          }, "\u652F\u6301\u82B1\u5457\u5206\u671F"),
          logoUrl: 'https://s1.wacdn.com/wis/538/5f3393b428945c61_48x48.png',
          isShow: showAliPay
        }, {
          payType: _constant.PAY_TYPES.JDPAY,
          title: '京东支付',
          // tips: '支持京东白条',
          logoUrl: 'https://s1.wacdn.com/wis/538/076fd7b9eae9ba3d_48x48.png',
          isShow: showJdPay
        }],
        onPaySelected: function onPaySelected(selectedPayType) {
          _this2.onPaySelected(selectedPayType);
        },
        selectedPayType: payType
      }), this.props.children, /*#__PURE__*/React.createElement("div", {
        className: "m-pay-submit-wrapper"
      }, showAliPayQrCode && payType === _constant.PAY_TYPES.ALIPAY ? /*#__PURE__*/React.createElement(_payQrcode.default, {
        orderId: orderInfo.orderId,
        couponId: couponInfo.id,
        paySubmitData: paySubmitData
      }) : null, /*#__PURE__*/React.createElement("div", {
        className: "m-pay-btn"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pay-price"
      }, "\u5B9E\u4ED8\uFF1A", /*#__PURE__*/React.createElement("span", {
        className: "price"
      }, "\xA5", /*#__PURE__*/React.createElement("span", {
        className: "price-number"
      }, (orderInfo.payAmount / 100).toFixed(2)))), /*#__PURE__*/React.createElement(_button.default, {
        className: 'btn-go-pay',
        size: 'large',
        type: 'primary',
        onClick: this.handlePay
      }, '立即支付'))));
    }
  }]);
  return PayOrder;
}(React.Component);

exports.default = PayOrder;
(0, _defineProperty2.default)(PayOrder, "defaultProps", {
  payType: _constant.PAY_TYPES.WECHAT,
  orderInfo: {},
  couponInfo: {},
  showAliPayQrCode: true,
  showAliPay: true,
  showJdPay: true,
  showWechatPay: true
});