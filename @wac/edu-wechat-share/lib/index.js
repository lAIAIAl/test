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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _api = require("./api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultWxConfig = {
  appId: 'wxf25c265ad00db0b8',
  // 挖财钱堂学院
  debug: false,
  openTagList: ['wx-open-launch-weapp'],
  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage' // 'updateAppMessageShareData',
  // 'updateTimelineShareData',
  ]
};

var WechatShare = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(WechatShare, _React$Component);

  var _super = _createSuper(WechatShare);

  function WechatShare() {
    var _this;

    (0, _classCallCheck2.default)(this, WechatShare);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "registerWxShareApi", function (eventName) {
      var _this$props = _this.props,
          title = _this$props.title,
          desc = _this$props.desc,
          link = _this$props.link,
          imgUrl = _this$props.imgUrl,
          type = _this$props.type,
          dataUrl = _this$props.dataUrl,
          onSuccess = _this$props.onSuccess,
          onCancel = _this$props.onCancel;
      var conf = {
        title: typeof title === 'function' ? title() : title,
        // 分享标题
        desc: typeof desc === 'function' ? desc() : desc,
        // 分享描述
        link: typeof link === 'function' ? link() : link,
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: typeof imgUrl === 'function' ? imgUrl() : imgUrl,
        // 分享图标
        type: type,
        dataUrl: dataUrl,
        success: function success() {
          // 'updateAppMessageShareData' 和 'updateTimelineShareData', 设置成功就调用
          // 'onMenuShareTimeline' 和 'onMenuShareAppMessage', 用户点击了分享才会调用
          onSuccess && onSuccess();
        },
        cancel: function cancel() {
          onCancel && onCancel();
        }
      };
      window.wx[eventName](conf);
    });
    return _this;
  }

  (0, _createClass2.default)(WechatShare, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.wx = require('weixin-js-sdk');
      this.initWxConfig();
    }
  }, {
    key: "initWxConfig",
    value: function () {
      var _initWxConfig = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this$props2, _this$props2$wxConfig, debug, appId, jsApiList, openTagList, rest, wechatSignatureUrl, wxReadyCallback, authRes, timeStamp, nonceStr, signature, self;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, _this$props2$wxConfig = _this$props2.wxConfig, debug = _this$props2$wxConfig.debug, appId = _this$props2$wxConfig.appId, jsApiList = _this$props2$wxConfig.jsApiList, openTagList = _this$props2$wxConfig.openTagList, rest = (0, _objectWithoutProperties2.default)(_this$props2$wxConfig, ["debug", "appId", "jsApiList", "openTagList"]), wechatSignatureUrl = _this$props2.wechatSignatureUrl, wxReadyCallback = _this$props2.wxReadyCallback;
                _context.next = 3;
                return (0, _api.getWechatSignature)({
                  url: wechatSignatureUrl,
                  params: {
                    appId: appId
                  }
                });

              case 3:
                authRes = _context.sent;

                if (authRes) {
                  timeStamp = authRes.timeStamp, nonceStr = authRes.nonceStr, signature = authRes.signature;
                  window.wx.config(_objectSpread({
                    debug: debug || defaultWxConfig.debug,
                    appId: appId || defaultWxConfig.appId,
                    // 必填，公众号的唯一标识
                    timestamp: timeStamp,
                    // 必填，生成签名的时间戳
                    nonceStr: nonceStr,
                    // 必填，生成签名的随机串
                    signature: signature,
                    // 必填，签名
                    jsApiList: jsApiList || defaultWxConfig.jsApiList,
                    // 必填，需要使用的JS接口列表
                    openTagList: openTagList || defaultWxConfig.openTagList
                  }, rest));
                  self = this;
                  window.wx.ready(function () {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    self.registerWxShareApi('onMenuShareTimeline');
                    self.registerWxShareApi('onMenuShareAppMessage'); // self.registerWxShareApi('updateAppMessageShareData')
                    // self.registerWxShareApi('updateTimelineShareData')

                    wxReadyCallback && wxReadyCallback(window.wx);
                  });
                  window.wx.error(function (res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                    /* eslint-disable-next-line */
                    console.log('wx error: ', res);
                  });
                } else {// request_auth fail
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initWxConfig() {
        return _initWxConfig.apply(this, arguments);
      }

      return initWxConfig;
    }()
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return WechatShare;
}(React.Component);

exports.default = WechatShare;
(0, _defineProperty2.default)(WechatShare, "defaultProps", {
  wxConfig: defaultWxConfig,
  imgUrl: 'https://s1.wacdn.com/wis/539/069cc225b1020cef_200x200.png',
  type: 'link',
  dataUrl: ''
});