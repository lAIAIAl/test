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

require("core-js/modules/es6.array.find.js");

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

var _throttle = _interopRequireDefault(require("lodash/throttle"));

require("./index.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var typeMap = ['normal', 'primary', 'danger', 'black'];
var sizeMap = ['small', 'medium', 'large', 'middle'];
var shapeMap = ['normal', 'round'];

var Button = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Button, _React$Component);

  var _super = _createSuper(Button);

  function Button(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Button);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClick", (0, _throttle.default)(function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          disabled = _this$props.disabled,
          loading = _this$props.loading;
      !loading && !disabled && onClick && onClick(e);
    }, 1500, {
      trailing: false
    }));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchStart", function () {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          loading = _this$props2.loading,
          activeOpacity = _this$props2.activeOpacity;
      if (disabled || loading) return;

      _this.setState({
        opacity: _this.getInitOpacity() * activeOpacity
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchEnd", function () {
      _this.setState({
        opacity: _this.getInitOpacity()
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setRef", function (el) {
      _this.props.setRef && _this.props.setRef(el);
    });

    var opacity = _this.getInitOpacity(props);

    _this.state = {
      opacity: opacity
    };
    return _this;
  }

  (0, _createClass2.default)(Button, [{
    key: "getInitOpacity",
    value: function getInitOpacity() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var style = props.style;
      return +(style ? style.opacity || 1 : 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          type = _this$props3.type,
          size = _this$props3.size,
          shape = _this$props3.shape,
          block = _this$props3.block,
          disabled = _this$props3.disabled,
          style = _this$props3.style,
          loading = _this$props3.loading,
          className = _this$props3.className,
          showShadow = _this$props3.showShadow,
          hideContentWhenLoading = _this$props3.hideContentWhenLoading,
          activeOpacity = _this$props3.activeOpacity,
          setRef = _this$props3.setRef,
          restProps = (0, _objectWithoutProperties2.default)(_this$props3, ["type", "size", "shape", "block", "disabled", "style", "loading", "className", "showShadow", "hideContentWhenLoading", "activeOpacity", "setRef"]);
      var sizeFix = size === 'middle' ? 'medium' : size;
      var buttonType = "type-".concat(typeMap.find(function (i) {
        return i === type;
      }) || 'normal');
      var buttonShape = "shape-".concat(shapeMap.find(function (i) {
        return i === shape;
      }) || 'normal');
      var sizeShape = "size-".concat(sizeMap.find(function (i) {
        return i === sizeFix;
      }) || 'normal');
      var classNameArray = ['design-button', buttonType, buttonShape, sizeShape, showShadow ? 'shadow' : undefined, block ? 'block' : undefined, disabled ? 'disabled' : undefined, loading ? 'loading' : undefined, loading && hideContentWhenLoading ? 'hide-content' : undefined, className];
      return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
        className: classNameArray.join(' '),
        onClick: this.onClick,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd,
        style: _objectSpread({
          opacity: this.state.opacity
        }, style),
        ref: this.setRef
      }), hideContentWhenLoading && loading ? null : this.props.children);
    }
  }]);
  return Button;
}(React.Component);

exports.default = Button;
(0, _defineProperty2.default)(Button, "defaultProps", {
  activeOpacity: 0.8,
  hideContentWhenLoading: true,
  showShadow: false,
  disabled: false,
  loading: false,
  type: 'normal',
  shape: 'normal',
  size: 'small',
  onClick: function onClick() {}
});