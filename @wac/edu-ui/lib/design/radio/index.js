"use strict";

require("core-js/modules/es6.reflect.construct.js");

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

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Radio = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Radio, _React$Component);

  var _super = _createSuper(Radio);

  function Radio() {
    var _this;

    (0, _classCallCheck2.default)(this, Radio);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          index = _this$props.index,
          value = _this$props.value,
          label = _this$props.label;
      onChange && onChange({
        index: index,
        label: label,
        value: value
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Radio, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          onDidMount = _this$props2.onDidMount,
          index = _this$props2.index,
          value = _this$props2.value,
          label = _this$props2.label;
      onDidMount && onDidMount({
        index: index,
        label: label,
        value: value
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      if (this.props.defaultChecked) {
        this.onChange();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          className = _this$props3.className,
          defaultChecked = _this$props3.defaultChecked,
          name = _this$props3.name,
          label = _this$props3.label,
          value = _this$props3.value,
          index = _this$props3.index,
          checked = _this$props3.checked,
          iconClassName = _this$props3.iconClassName;
      var classNames = ['radio-container', className];
      var checkProp = checked || defaultChecked;
      var iconClassNames = ['radio-icon ' + (checkProp ? 'checked' : 'unchecked'), iconClassName];
      return /*#__PURE__*/_react.default.createElement("label", {
        className: classNames.join(' ')
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        defaultChecked: defaultChecked,
        index: index,
        name: name,
        label: label,
        value: value || label,
        onClick: this.onChange
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: iconClassNames.join(' ')
      }), children || label);
    }
  }]);
  return Radio;
}(_react.default.Component);

exports.default = Radio;
(0, _defineProperty2.default)(Radio, "propTypes", {
  // 单选项改变事件
  onChange: _propTypes.default.func,
  // 单选项加载事件
  onDidMount: _propTypes.default.func,
  // 默认选中
  defaultChecked: _propTypes.default.bool,
  children: _propTypes.default.any,
  // 容器样式
  className: _propTypes.default.string,
  // icon样式，可重定义
  iconClassName: _propTypes.default.string,
  // 显示的值
  label: _propTypes.default.string,
  // 不显示的值
  value: _propTypes.default.any,
  // group name
  name: _propTypes.default.string,
  index: _propTypes.default.number,
  checked: _propTypes.default.bool
});
(0, _defineProperty2.default)(Radio, "defaultProps", {
  checked: false,
  defaultChecked: false
});