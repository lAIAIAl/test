"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _icon = _interopRequireDefault(require("../icon"));

require("./index.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CheckBox = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(CheckBox, _React$Component);

  var _super = _createSuper(CheckBox);

  function CheckBox(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CheckBox);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function () {
      var onChange = _this.props.onChange;
      var checked = !_this.state.checked;

      if (!('checked' in _this.props)) {
        _this.setState({
          checked: checked
        });
      }

      onChange && onChange(checked);
    });

    var _checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  (0, _createClass2.default)(CheckBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          onChange = _this$props.onChange,
          checked = _this$props.checked,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["children", "className", "onChange", "checked"]);
      var classNames = ['design-checkbox', className];
      var checkProp = this.props.checked !== undefined ? this.props.checked : this.state.checked;
      return /*#__PURE__*/React.createElement("label", (0, _extends2.default)({
        className: classNames.join(' ')
      }, restProps), /*#__PURE__*/React.createElement("input", {
        type: 'checkbox',
        checked: !!checkProp,
        onChange: this.onChange
      }), /*#__PURE__*/React.createElement(_icon.default, {
        type: checkProp ? 'checked' : 'unchecked'
      }), children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ('checked' in nextProps) {
        if (nextProps.checked !== prevState.checked) {
          return {
            checked: nextProps.checked
          };
        }
      }

      return null;
    }
  }]);
  return CheckBox;
}(React.Component);

exports.default = CheckBox;
(0, _defineProperty2.default)(CheckBox, "defaultProps", {
  defaultChecked: false
});