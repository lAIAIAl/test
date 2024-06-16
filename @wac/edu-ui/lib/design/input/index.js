"use strict";

require("core-js/modules/es6.reflect.construct.js");

require("core-js/modules/es6.object.keys.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.array.filter.js");

require("core-js/modules/es6.object.get-own-property-descriptor.js");

require("core-js/modules/es7.object.get-own-property-descriptors.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace.js");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icon = _interopRequireDefault(require("../icon"));

require("./index.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var posPlus;

var Input = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Input, _React$Component);

  var _super = _createSuper(Input);

  function Input(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          type = _this$props.type,
          onChangePoint = _this$props.onChangePoint;
      var el = e.target;
      var rawVal = el.value,
          prePos = el.selectionEnd;

      if (rawVal && rawVal.length === 1 && prePos === 0 && !_this.posPlus) {
        // 兼容华为手机selectionEnd少了1的问题
        posPlus = 1;
      }

      var ctrlValue = _this.formatInputText(e.target.value) || '';
      var preCtrlVal = _this.value || '';

      if (rawVal.length < preCtrlVal.length && /(honor|huawei)/gi.test(window.navigator.userAgent)) {
        // 华为手机selectionEnd少了1，但是在预填数据的时候无法判断，所以删除的时候清空处理，已通知莲心
        ctrlValue = '';
      }

      _this.value = ctrlValue;
      onChange && onChange(ctrlValue);
      onChangePoint && onChangePoint(ctrlValue);

      switch (type) {
        case 'bankCard':
        case 'phone':
        case 'number':
        case 'idNo':
          if (_this.selectionTimeout) {
            clearTimeout(_this.selectionTimeout);
          } // controlled input type needs to adjust the position of the caret


          _this.selectionTimeout = setTimeout(function () {
            el.selectionStart = el.selectionEnd = _this.calcPos(prePos || 0, preCtrlVal, rawVal || '', ctrlValue, [' '], type !== 'idNo' ? /\D/g : /[^xXywz\d]/g);
          });
          break;

        default:
          break;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "calcPos", function (prePos, preCtrlVal) {
      var rawVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var ctrlVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var placeholderChars = arguments.length > 4 ? arguments[4] : undefined;
      var maskReg = arguments.length > 5 ? arguments[5] : undefined;
      var editLength = rawVal.length - preCtrlVal.length;
      var isAddition = editLength > 0;
      var pos = prePos;

      if (isAddition) {
        var additionStr = rawVal.substr(pos - editLength, editLength);
        var ctrlCharCount = additionStr.replace(maskReg, '').length;
        pos -= editLength - ctrlCharCount;
        var placeholderCharCount = 0;

        while (ctrlCharCount > 0) {
          if (placeholderChars.indexOf(ctrlVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
            ctrlCharCount--;
          } else {
            placeholderCharCount++;
          }
        }

        pos += placeholderCharCount;
      }

      return pos + (posPlus ? posPlus + ctrlVal.replace(/\S/g, '').length : 0);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "formatInputText", function (value) {
      var type = _this.props.type;
      var newValue = value;

      switch (type) {
        case 'idNo':
          {
            newValue = value.replace(/x/g, 'X').replace(/y/g, 'X').replace(/w/g, 'X').replace(/z/g, 'X').replace(/[^X\d]/g, '').substring(0, 18);
            var valueLen = newValue.length;

            if (valueLen > 6 && valueLen < 15) {
              newValue = "".concat(newValue.substr(0, 6), " ").concat(newValue.substr(6));
            } else if (valueLen >= 15) {
              newValue = "".concat(newValue.substr(0, 6), " ").concat(newValue.substr(6, 8), " ").concat(newValue.substr(14));
            }

            break;
          }

        case 'bankCard':
          newValue = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
          break;

        case 'phone':
          {
            newValue = value.replace(/\D/g, '').substring(0, 11);
            var _valueLen = newValue.length;

            if (_valueLen > 3 && _valueLen < 8) {
              newValue = "".concat(newValue.substr(0, 3), " ").concat(newValue.substr(3));
            } else if (_valueLen >= 8) {
              newValue = "".concat(newValue.substr(0, 3), " ").concat(newValue.substr(3, 4), " ").concat(newValue.substr(7));
            }

            break;
          }

        case 'number':
          newValue = value.replace(/\D/g, '');
          break;

        case 'text':
        case 'password':
        default:
          break;
      }

      return newValue;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onBlur", function (e) {
      var onBlur = _this.props.onBlur;
      var target = e.target || e.currentTarget; // 为了解决清除图标点击后立即blur导致无法响应点击事件的问题

      setTimeout(function () {
        onBlur && onBlur(target.value);

        _this.setState({
          focus: false
        });
      }); // 为了解决ios webview被键盘弹起后不会下来导致错位的问题

      window.scrollTo(window.scrollX, window.scrollY);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFocus", function (e) {
      var _this$props2 = _this.props,
          onFocus = _this$props2.onFocus,
          editable = _this$props2.editable;
      var target = e.target || e.currentTarget;

      if (!editable) {
        document.activeElement.blur();
      } // 为了解决input之间切换时清除图标会延迟显示导致很奇怪的问题


      setTimeout(function () {
        onFocus && onFocus(target.value);

        _this.setState({
          focus: true
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "focus", function () {
      if (_this.inputRef) {
        _this.inputRef.focus();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clear", function () {
      if (_this.props.onChange) {
        _this.props.onChange('');
      }

      _this.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClick", function (e) {
      var onClick = _this.props.onClick;
      onClick && onClick(e);
    });
    _this.state = {
      focus: false
    };
    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          value = _this$props3.value,
          onChange = _this$props3.onChange;

      if (value && onChange) {
        this.value = value;
        onChange(this.formatInputText(value));
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        var onChange = nextProps.onChange;
        this.value = nextProps.value;
        onChange(this.formatInputText(nextProps.value));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          type = _this$props4.type,
          value = _this$props4.value,
          withClear = _this$props4.withClear,
          onChange = _this$props4.onChange,
          className = _this$props4.className,
          onBlur = _this$props4.onBlur,
          onFocus = _this$props4.onFocus,
          editable = _this$props4.editable,
          disabled = _this$props4.disabled,
          extra = _this$props4.extra,
          rows = _this$props4.rows,
          textAlign = _this$props4.textAlign,
          restProps = (0, _objectWithoutProperties2.default)(_this$props4, ["type", "value", "withClear", "onChange", "className", "onBlur", "onFocus", "editable", "disabled", "extra", "rows", "textAlign"]);
      var inputType = type;

      if (type === 'bankCard' || type === 'phone') {
        inputType = 'tel';
      } else if (type === 'password') {
        inputType = 'password';
      } else if (type === 'number') {
        inputType = 'number';
      }

      var patternProps;

      if (type === 'number') {
        patternProps = {
          pattern: '[0-9]*'
        };
      }

      var inputClassName = ['input', textAlign ? "text-align-".concat(textAlign) : null, className];

      var inputProps = _objectSpread(_objectSpread(_objectSpread({
        type: inputType,
        ref: function ref(el) {
          return _this2.inputRef = el;
        }
      }, restProps), {}, {
        className: inputClassName.join(' ')
      }, patternProps), {}, {
        value: value,
        readOnly: !editable,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        disabled: disabled
      });

      if (!editable) {
        inputProps.unselectable = 'on';
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: 'design-input'
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'input-area'
      }, rows && rows > 1 ? /*#__PURE__*/_react.default.createElement("textarea", inputProps) : /*#__PURE__*/_react.default.createElement("input", inputProps), !editable ? /*#__PURE__*/_react.default.createElement("div", {
        className: 'input-mask',
        onClick: this.onClick
      }) : null, this.state.focus && withClear && editable && !disabled && value && "".concat(value).length > 0 ? /*#__PURE__*/_react.default.createElement("div", {
        className: 'clear',
        onClick: this.clear
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: 'clear'
      })) : null), extra);
    }
  }]);
  return Input;
}(_react.default.Component);

exports.default = Input;
(0, _defineProperty2.default)(Input, "propTypes", {
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  editable: _propTypes.default.bool,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  rows: _propTypes.default.number,
  withClear: _propTypes.default.bool,
  extra: _propTypes.default.element,
  textAlign: _propTypes.default.oneOf(['left', 'right']),
  // 埋点专用，onChange会触发2次
  onChangePoint: _propTypes.default.func
});
(0, _defineProperty2.default)(Input, "defaultProps", {
  editable: true,
  withClear: true
});