"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Divider = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Divider, _React$Component);

  var _super = _createSuper(Divider);

  function Divider() {
    (0, _classCallCheck2.default)(this, Divider);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Divider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          dashed = _this$props.dashed,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["className", "dashed"]);
      var classList = ["design-divider", dashed ? 'dashed' : null, className];
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: classList.join(' ')
      }, restProps));
    }
  }]);
  return Divider;
}(_react.default.Component);

exports.default = Divider;
(0, _defineProperty2.default)(Divider, "propTypes", {
  className: _propTypes.default.string,
  dashed: _propTypes.default.bool
});