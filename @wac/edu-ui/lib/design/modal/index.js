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

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.promise.js");

require("core-js/modules/es6.object.assign.js");

require("core-js/modules/es6.array.map.js");

require("core-js/modules/es7.array.includes.js");

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

var _style = _interopRequireDefault(require("./style"));

var _html = _interopRequireDefault(require("./html"));

require("./index.less");

var _close = _interopRequireDefault(require("./images/close.png"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _util = _interopRequireDefault(require("./util"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var prefixClassName = 'design-modal';

var Modal = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Modal, _React$Component);

  var _super = _createSuper(Modal);

  function Modal(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Modal);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clicks", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "show", function () {
      _this.handleVisibleChange(true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "close", function () {
      var onClose = _this.props.onClose;
      onClose && onClose();

      _this.handleVisibleChange(false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleVisibleChange", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(visible) {
        var _this$props, onVisibleChange, needAnimate;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, onVisibleChange = _this$props.onVisibleChange, needAnimate = _this$props.needAnimate;

                if (!visible) {
                  _context.next = 9;
                  break;
                }

                _this.setState({
                  visible: visible
                });

                _context.t0 = needAnimate;

                if (!_context.t0) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return _this.animateModal(visible);

              case 7:
                _context.next = 14;
                break;

              case 9:
                _context.t1 = needAnimate;

                if (!_context.t1) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return _this.animateModal(visible);

              case 13:
                _this.setState({
                  visible: visible
                });

              case 14:
                onVisibleChange && onVisibleChange(visible);

                _util.default.handleBodyScroll(!visible);

              case 16:
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "animateModal", function (visible) {
      var fullScreen = _this.props.fullScreen;
      return new Promise(function (resolve) {
        _this.setState({
          maskStyle: !visible && !fullScreen ? _style.default.maskFadeOut : _style.default.maskFadeIn,
          modalWrapStyle: !visible && !fullScreen ? _style.default.wrapFadeOut : _style.default.wrapFadeIn
        }, function () {
          setTimeout(function () {
            resolve();
          }, 300);
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClick", function (action) {
      return function () {
        var shouldCloseWhenAction = _this.props.shouldCloseWhenAction;
        shouldCloseWhenAction && _this.handleVisibleChange(false);

        if (typeof action === 'function') {
          action({
            close: _this.close
          });
        }
      };
    });
    _this.state = {
      visible: false,
      maskStyle: {},
      modalWrapStyle: {}
    };

    if (props.visible) {
      setTimeout(function () {
        _this.handleVisibleChange(true);
      });
    }

    return _this;
  }

  (0, _createClass2.default)(Modal, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.visible !== this.props.visible && nextProps.visible !== this.state.visible) {
        if (nextProps.visible) {
          this.show();
        } else {
          this.close();
        }
      }
    }
  }, {
    key: "buildHTML",
    value: function buildHTML() {
      var element = this.handleElement(this.renderModal(this.props));

      var elementString = _server.default.renderToString(element);

      return (0, _html.default)(elementString);
    }
  }, {
    key: "handleElement",
    value: function handleElement(element) {
      var _this2 = this;

      if (!element || !element.props) {
        return element;
      }

      var props = Object.assign({}, element.props);

      if (props.children) {
        props.children = _react.default.Children.toArray(props.children).map(function (e) {
          return _this2.handleElement(e);
        });
      }

      if (props['data-id'] && ["".concat(prefixClassName, "-mask"), "".concat(prefixClassName, "-wrap")].includes(props['data-id'])) {
        props.id = props['data-id'];
      }

      if (props.onClick) {
        var index = this.clicks.push(props.onClick) - 1;
        return /*#__PURE__*/_react.default.createElement(element.type, Object.assign({}, props, {
          'data-index': index
        }));
      }

      if (element.type) {
        return /*#__PURE__*/_react.default.createElement(element.type, props);
      }

      return element;
    }
  }, {
    key: "renderModal",
    value: function renderModal(props) {
      var _this3 = this;

      var style = props.style,
          contentStyle = props.contentStyle,
          footerStyle = props.footerStyle,
          actionStyle = props.actionStyle,
          maskStyle = props.maskStyle,
          actionLastStyle = props.actionLastStyle,
          title = props.title,
          closeType = props.closeType,
          children = props.children,
          actions = props.actions,
          fullScreen = props.fullScreen,
          visible = props.visible,
          onVisibleChange = props.onVisibleChange,
          shouldCloseWhenAction = props.shouldCloseWhenAction,
          needAnimate = props.needAnimate,
          contentClassName = props.contentClassName,
          restProps = (0, _objectWithoutProperties2.default)(props, ["style", "contentStyle", "footerStyle", "actionStyle", "maskStyle", "actionLastStyle", "title", "closeType", "children", "actions", "fullScreen", "visible", "onVisibleChange", "shouldCloseWhenAction", "needAnimate", "contentClassName"]);
      return /*#__PURE__*/_react.default.createElement("div", {
        style: _style.default.modal
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread(_objectSpread(_objectSpread({}, _style.default.mask), maskStyle), this.state.maskStyle),
        "data-id": "".concat(prefixClassName, "-mask")
      }), /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, restProps, {
        style: _objectSpread(_objectSpread(_objectSpread({}, _style.default.wrap), this.state.modalWrapStyle), style),
        "data-id": "".concat(prefixClassName, "-wrap")
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread(_objectSpread({}, _style.default.content), contentStyle),
        className: contentClassName
      }, title ? /*#__PURE__*/_react.default.createElement("div", {
        style: _style.default.title
      }, title) : null, children), actions ? /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread(_objectSpread({}, _style.default.footer), footerStyle)
      }, actions.map(function (action, index) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: Object.assign({}, _style.default.action, actionStyle, index + 1 === actions.length ? _style.default.actionLast : null, actionLastStyle, action.style),
          className: action.className,
          onClick: _this3.handleClick(action.onPress),
          key: "".concat(prefixClassName, "-action-").concat(index)
        }, action.text);
      })) : null, closeType === 'bottom' ? /*#__PURE__*/_react.default.createElement("img", {
        alt: '关闭',
        src: _close.default,
        style: _style.default.closeBottom,
        onClick: this.close
      }) : null, closeType === 'top-right' ? /*#__PURE__*/_react.default.createElement("img", {
        alt: '关闭',
        src: _close.default,
        style: _style.default.closeTopRight,
        onClick: this.close
      }) : null));
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.visible ? this.renderModal(this.props) : null;
    }
  }], [{
    key: "alert",
    value: function alert(props) {
      var div = document.createElement('div');
      document.body.appendChild(div);

      function close() {
        _reactDom.default.unmountComponentAtNode(div);

        if (div && div.parentNode) {
          div.parentNode.removeChild(div);

          _util.default.handleBodyScroll(true);
        }
      }

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Modal, props), div);

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Modal, (0, _extends2.default)({}, props, {
        visible: true
      })), div);

      return {
        close: close
      };
    }
  }]);
  return Modal;
}(_react.default.Component);

exports.default = Modal;
(0, _defineProperty2.default)(Modal, "propTypes", {
  fullScreen: _propTypes.default.bool,
  closeType: _propTypes.default.oneOf(['none', 'bottom', 'top-right']),
  visible: _propTypes.default.bool,
  actions: _propTypes.default.array,
  title: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  style: _propTypes.default.object,
  actionStyle: _propTypes.default.object,
  onVisibleChange: _propTypes.default.func,
  children: _propTypes.default.any,
  shouldCloseWhenAction: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  needAnimate: _propTypes.default.bool
});
(0, _defineProperty2.default)(Modal, "defaultProps", {
  closeType: 'none',
  shouldCloseWhenAction: true,
  needAnimate: true,
  actions: [{
    text: '确认',
    onPress: function onPress() {}
  }]
});