"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find.js");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("./constants");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(FormItem, _React$Component);

  var _super = _createSuper(FormItem);

  function FormItem() {
    var _this;

    (0, _classCallCheck2.default)(this, FormItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLabelClick", function (e) {
      var label = _this.props.label;

      var id = _this.props.id || _this.getId();

      if (!id) {
        return;
      }

      var controls = document.querySelectorAll("[id=\"".concat(id, "\"]"));

      if (controls.length !== 1) {
        if (typeof label === 'string') {
          e.preventDefault();
        }

        var formItemNode = _reactDom.default.findDOMNode((0, _assertThisInitialized2.default)(_this));

        var control = formItemNode.querySelector("[id=\"".concat(id, "\"]"));

        if (control && control.focus) {
          control.focus();
        }
      }
    });
    return _this;
  }

  (0, _createClass2.default)(FormItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getControls(this.props.children, true);
    }
  }, {
    key: "getControls",
    value: function getControls(children, recursively) {
      var controls = [];

      var childrenArray = _react.default.Children.toArray(children);

      for (var i = 0; i < childrenArray.length; i++) {
        if (!recursively && controls.length > 0) {
          break;
        }

        var child = childrenArray[i];

        if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
          continue;
        }

        if (!child.props) {
          continue;
        }

        if (_constants.FIELD_META_PROP in child.props) {
          controls.push(child);
        } else if (child.props.children) {
          controls = controls.concat(this.getControls(child.props.children, recursively));
        }
      }

      return controls;
    }
  }, {
    key: "getField",
    value: function getField() {
      return this.getChildProp(_constants.FIELD_DATA_PROP);
    }
  }, {
    key: "getErrorMessage",
    value: function getErrorMessage() {
      var showError = this.props.showError;

      if (showError) {
        var errors = this.getField().errors;

        if (errors) {
          var id = this.props.id || this.getId();
          var error = errors.find(function (i) {
            return i.field === id;
          }) || errors[0] || {};
          return error.message;
        }

        return '';
      }

      return '';
    }
  }, {
    key: "getOnlyControl",
    value: function getOnlyControl() {
      var child = this.getControls(this.props.children, false)[0];
      return child !== undefined ? child : null;
    }
  }, {
    key: "getChildProp",
    value: function getChildProp(prop) {
      var child = this.getOnlyControl();
      return child && child.props && child.props[prop];
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.getChildProp('id');
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          label = _this$props.label,
          id = _this$props.id,
          labelSpan = _this$props.labelSpan,
          labelClassName = _this$props.labelClassName;
      var labelStyle = {};

      if (labelSpan) {
        labelStyle.width = "".concat(labelSpan * 100 / 24, "%");
      }

      return label !== null ? /*#__PURE__*/_react.default.createElement("label", {
        className: labelClassName,
        htmlFor: id || this.getId(),
        title: typeof label === 'string' ? label : '',
        onClick: this.onLabelClick,
        style: labelStyle
      }, label) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          direction = _this$props2.direction,
          className = _this$props2.className,
          contentClassName = _this$props2.contentClassName,
          errorClassName = _this$props2.errorClassName,
          help = _this$props2.help;
      var classNameProp = ['design-form-item', direction === 'column' ? 'column' : 'row', className];
      var textAlign = this.getChildProp('textAlign');
      return /*#__PURE__*/_react.default.createElement("div", {
        className: classNameProp.join(' ')
      }, this.renderLabel(), /*#__PURE__*/_react.default.createElement("div", {
        className: ['content', contentClassName].join(' ')
      }, this.props.children, /*#__PURE__*/_react.default.createElement("div", {
        className: ['error', textAlign ? "text-align-".concat(textAlign) : null, errorClassName].join(' ')
      }, help || null, this.getErrorMessage())), this.props.extra);
    }
  }]);
  return FormItem;
}(_react.default.Component);

exports.default = FormItem;
(0, _defineProperty2.default)(FormItem, "propTypes", {
  children: _propTypes.default.element,
  help: _propTypes.default.element,
  direction: _propTypes.default.oneOf(['row', 'column']),
  extra: _propTypes.default.element,
  labelSpan: _propTypes.default.number,
  label: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  id: _propTypes.default.string,
  showError: _propTypes.default.bool,
  className: _propTypes.default.string,
  contentClassName: _propTypes.default.string,
  errorClassName: _propTypes.default.string,
  labelClassName: _propTypes.default.string
});
(0, _defineProperty2.default)(FormItem, "defaultProps", {
  showError: false
});