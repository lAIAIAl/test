"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes.js");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var Animated = _interopRequireWildcard(require("animated/lib/targets/react-dom"));

var _icon = _interopRequireDefault(require("../icon"));

require("./style/index.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ToastCom = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ToastCom, _React$Component);

  var _super = _createSuper(ToastCom);

  function ToastCom(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ToastCom);
    _this = _super.call(this, props);
    _this.state = {
      anim: new Animated.Value(0),
      isShow: false
    };
    return _this;
  }

  (0, _createClass2.default)(ToastCom, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        isShow: true
      });
      Animated.spring(this.state.anim, {
        toValue: 0.9
      }).start();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      Animated.spring(this.state.anim, {
        toValue: 0
      }).start(function (result) {
        if (result.finished) {
          _this2.setState({
            isShow: false
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var withMask = this.props.withMask;
      var classProp = ['design-toast-layer', this.props.className, this.state.isShow ? ' design-toast-show' : undefined];
      return /*#__PURE__*/React.createElement("div", {
        className: 'design-toast'
      }, withMask ? /*#__PURE__*/React.createElement("div", {
        className: 'design-toast-mask'
      }) : null, /*#__PURE__*/React.createElement(Animated.div, {
        className: classProp.join(' '),
        style: {
          opacity: this.state.anim
        }
      }, this.props.children));
    }
  }]);
  return ToastCom;
}(React.Component);

var Toast = function Toast(children) {
  if (['test', '', 'development'].includes(process.env.NODE_ENV)) {
    /* eslint-disable-next-line */
    console.warn('请使用Toast.message代替直接使用Toast');
  }

  Toast.message(children);
};

Toast.message = function (children) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render( /*#__PURE__*/React.createElement(ToastCom, null, children), div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);

    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  setTimeout(function () {
    close();
  }, delay);
};

Toast.loading = function (children) {
  var withMask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render( /*#__PURE__*/React.createElement(ToastCom, {
    withMask: withMask
  }, /*#__PURE__*/React.createElement("div", {
    className: 'toast-loading'
  }, /*#__PURE__*/React.createElement(_icon.default, {
    type: 'loading'
  }), children)), div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);

    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  return {
    close: close
  };
};

var _default = Toast;
exports.default = _default;