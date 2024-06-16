"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.promise.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var _util = _interopRequireDefault(require("../util"));

var _iconClose = _interopRequireDefault(require("./images/icon-close.png"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var prefixClassName = 'design-popup';

var Popup = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Popup, _React$Component);

  var _super = _createSuper(Popup);

  function Popup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Popup);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRightPress", function (e) {
      if (_this.props.onRightContentPress) {
        _this.props.onRightContentPress();

        return;
      }

      _this.handleVisibleChange(false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleVisibleChange", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(visible) {
        var onVisibleChange;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onVisibleChange = _this.props.onVisibleChange;

                if (!visible) {
                  _context.next = 7;
                  break;
                }

                _this.setState({
                  visible: visible
                });

                _context.next = 5;
                return _this.animatePopup(visible);

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return _this.animatePopup(visible);

              case 9:
                _this.setState({
                  visible: visible
                });

              case 10:
                onVisibleChange && onVisibleChange(visible);

                _util.default.handleBodyScroll(!visible);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "animatePopup", function (visible) {
      return new Promise(function (resolve) {
        var maskAnimateName = visible ? 'enter' : 'leave';
        var popupAnimateName = visible ? 'appear' : 'leave';

        _this.setState({
          maskClassName: "".concat(prefixClassName, "-fade-").concat(maskAnimateName, " ").concat(prefixClassName, "-fade-").concat(maskAnimateName, "-active"),
          popupClassName: "".concat(prefixClassName, "-slide-fade-").concat(popupAnimateName, " ").concat(prefixClassName, "-slide-fade-").concat(popupAnimateName, "-active")
        }, function () {
          setTimeout(function () {
            resolve();
          }, 300);
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickMask", function () {
      var maskClosable = _this.props.maskClosable;
      maskClosable && _this.handleVisibleChange(false);
    });
    _this.state = {
      visible: props.visible,
      maskClassName: '',
      popupClassName: ''
    };

    if (props.visible && typeof window !== 'undefined') {
      _util.default.handleBodyScroll(false);
    }

    return _this;
  }

  (0, _createClass2.default)(Popup, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.visible !== this.state.visible) {
        this.handleVisibleChange(nextProps.visible);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          title = _this$props.title,
          tip = _this$props.tip,
          innerTitle = _this$props.innerTitle,
          leftContent = _this$props.leftContent,
          rightContent = _this$props.rightContent,
          maskClosable = _this$props.maskClosable,
          visible = _this$props.visible,
          onVisibleChange = _this$props.onVisibleChange,
          onRightContentPress = _this$props.onRightContentPress,
          topContent = _this$props.topContent,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["className", "children", "title", "tip", "innerTitle", "leftContent", "rightContent", "maskClosable", "visible", "onVisibleChange", "onRightContentPress", "topContent"]);
      var _this$state = this.state,
          maskClassName = _this$state.maskClassName,
          popupClassName = _this$state.popupClassName;
      var classList = [prefixClassName, className];
      return this.state.visible ? /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: classList.join(' ')
      }, restProps), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-mask") + (maskClassName ? " ".concat(maskClassName) : ''),
        onClick: this.onClickMask
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-wrap") + (popupClassName ? " ".concat(popupClassName) : '')
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-header")
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-header-left")
      }, leftContent), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-header-title")
      }, title), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-header-right"),
        onClick: this.onRightPress
      }, rightContent)), tip ? /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-tip")
      }, tip) : null, topContent ? /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-tip")
      }, topContent) : null, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-content")
      }, innerTitle ? /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-inner-title")
      }, innerTitle) : null, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixClassName, "-children")
      }, children)))) : null;
    }
  }]);
  return Popup;
}(_react.default.Component);

exports.default = Popup;
(0, _defineProperty2.default)(Popup, "propTypes", {
  title: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  innerTitle: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  visible: _propTypes.default.bool,
  leftContent: _propTypes.default.element,
  maskClosable: _propTypes.default.bool,
  rightContent: _propTypes.default.element,
  tip: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.any,
  onVisibleChange: _propTypes.default.func,
  onRightContentPress: _propTypes.default.func,
  // 顶部扩展内容
  topContent: _propTypes.default.element
  /* 这里加新属性，记得在下面render() restProps前也加下，不会会有错误警告 */

});
(0, _defineProperty2.default)(Popup, "defaultProps", {
  maskClosable: false,
  rightContent: /*#__PURE__*/_react.default.createElement("img", {
    src: _iconClose.default,
    className: 'close-image'
  })
});