"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classnames = _interopRequireDefault(require("classnames"));

var _decorator = require("decorator");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

require("./index.less");

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var QRCodeWxCommon = (_dec = (0, _decorator.page)(), _dec(_class = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(QRCodeWxCommon, _Component);

  var _super = _createSuper(QRCodeWxCommon);

  function QRCodeWxCommon() {
    (0, _classCallCheck2.default)(this, QRCodeWxCommon);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(QRCodeWxCommon, [{
    key: "componentDidMount",
    value: function componentDidMount() {// const { channelInfo = {} } = this.props
      // if (channelInfo.name === 'xmly') {
      //   /// 初始化喜马拉雅代码
      //   (function (win, doc, src, version) {
      //     // eslint-disable-next-line no-console
      //     console.log('set base code:', channelInfo.data.xmly_app)
      //     var sc = doc.createElement('script')
      //     sc.type = 'text/javascript'
      //     sc.src = src + '?v=' + version
      //     win.XMLY_ADOCPC_APPKEY = channelInfo.data.xmly_app
      //     var s = document.getElementsByTagName('script')[0]
      //     s.parentNode.insertBefore(sc, s)
      //     var xmlyAdLog = win.xmlyAdLog = win.xmlyAdLog || []
      //     xmlyAdLog.track = xmlyAdLog.track || function (type, msg) {
      //       xmlyAdLog.push([type, msg])
      //     }
      //   })(window, document, '//s1.xmcdn.com/yx/ad-jssdk-static/last/dist/app.min.js', new Date().getTime())
      //   window.xmlyAdLog.track(channelInfo.data.xmly_type, { key: channelInfo.data.xmly_key })
      // }
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.props.data;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)({
          'm-qrcode-teacger-page': true,
          'm-qrcode-teacger-page-wechat': true
        })
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'container'
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'background'
      }, /*#__PURE__*/_react.default.createElement("img", {
        className: 'img',
        src: data.url || ''
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "tip-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "tip-prefix"
      }, "\u957F\u6309\u65E0\u6CD5\u8BC6\u522B"), /*#__PURE__*/_react.default.createElement("div", {
        className: "online-service-entrance"
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: "https://help.wacai.com/help/customerCenter/common/entrance?entranceId=9017"
      }, "\u8BF7\u8054\u7CFB\u5BA2\u670D"))))));
    }
  }]);
  return QRCodeWxCommon;
}(_react.Component)) || _class);
QRCodeWxCommon.propTypes = {
  // 渠道信息
  // channelInfo: T.object,
  // isWechat: T.bool,
  data: _propTypes.default.object
};
var _default = QRCodeWxCommon;
exports.default = _default;