"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

require("./index.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var NavBar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(NavBar, _React$Component);

  var _super = _createSuper(NavBar);

  function NavBar() {
    var _this;

    (0, _classCallCheck2.default)(this, NavBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLeftClick", function () {
      var onLeftClick = _this.props.onLeftClick;

      if (onLeftClick) {
        onLeftClick();
      } else {
        history.back();
      }
    });
    return _this;
  }

  (0, _createClass2.default)(NavBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          rightContent = _this$props.rightContent,
          divider = _this$props.divider,
          showH5Header = _this$props.showH5Header,
          className = _this$props.className;

      if (+showH5Header === 0) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "design-navbar-wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "design-navbar ".concat(divider ? 'f-hairlines-bottom' : '', " ").concat(className)
      }, /*#__PURE__*/React.createElement("div", {
        className: "design-navbar-left",
        onClick: this.onLeftClick
      }, /*#__PURE__*/React.createElement("i", {
        className: "c-icon-back"
      })), /*#__PURE__*/React.createElement("div", {
        className: "design-navbar-title"
      }, title), /*#__PURE__*/React.createElement("div", {
        className: "design-navbar-right"
      }, rightContent)));
    }
  }]);
  return NavBar;
}(React.Component);

exports.default = NavBar;
(0, _defineProperty2.default)(NavBar, "defaultProps", {
  className: '',
  divider: false,
  showH5Header: 1,
  title: ''
});