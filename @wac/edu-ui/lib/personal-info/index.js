"use strict";

require("core-js/modules/es6.reflect.construct.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.array.filter.js");

require("core-js/modules/es6.object.get-own-property-descriptor.js");

require("core-js/modules/es7.object.get-own-property-descriptors.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

require("core-js/modules/es6.object.keys.js");

require("core-js/modules/es6.regexp.replace.js");

require("core-js/modules/es6.array.slice.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.regexp.to-string.js");

require("core-js/modules/es7.promise.finally.js");

require("core-js/modules/es6.promise.js");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _form = _interopRequireDefault(require("../design/form"));

var _divider = _interopRequireDefault(require("../design/divider"));

var _input = _interopRequireDefault(require("../design/input"));

var _button = _interopRequireDefault(require("../design/button"));

var _modal = _interopRequireDefault(require("../design/modal"));

var _toast = _interopRequireDefault(require("../design/toast"));

require("./index.less");

var _api = require("./api");

require("core-js/modules/es7.promise.finally");

var _checkAgreement = _interopRequireDefault(require("./components/check-agreement"));

var _dec, _class, _class2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var createForm = _form.default.createForm,
    formShape = _form.default.formShape;

var FormItem = function FormItem(props) {
  return /*#__PURE__*/React.createElement(_form.default.Item, (0, _extends2.default)({}, props, {
    labelSpan: 5
  }));
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(function (field) {
    return fieldsError[field];
  });
}

var PersonalInfo = (_dec = createForm(), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(PersonalInfo, _React$Component);

  var _super = _createSuper(PersonalInfo);

  function PersonalInfo(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PersonalInfo);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "tel", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showKnow", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "allowBind", true);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "timer", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "makeRecord", function (type) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$props = _this.props,
          productId = _this$props.productId,
          source = _this$props.source,
          templateCode = _this$props.templateCode,
          orderId = _this$props.orderId;

      var params = _objectSpread(_objectSpread({
        type: type,
        source: source,
        templateCode: templateCode
      }, config), {}, {
        productId: productId,
        orderId: orderId
      });

      return (0, _api.insetRecord)(params, _this.props.axiosConfig);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (name) {
      return function (value) {
        switch (name) {
          case 'userName':
            _this.setState({
              userName: value
            });

            break;

          case 'idno':
            _this.setState({
              idno: value
            });

            break;

          case 'mobile':
            _this.setState({
              mobile: value
            });

            break;
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "submit", function () {
      var _this$props2 = _this.props,
          loginMobile = _this$props2.loginMobile,
          productId = _this$props2.productId,
          orderId = _this$props2.orderId,
          templateCode = _this$props2.templateCode,
          obviousProductStatus = _this$props2.obviousProductStatus;
      var agreementChecked = _this.state.agreementChecked;

      _this.props.form.validateFields(function (error, values) {
        if (!error) {
          var _ref = values || {},
              mobile = _ref.mobile,
              idno = _ref.idno;

          var newMobile = mobile.replace(/\s*/g, '');
          var newIdNo = idno.replace(/\s*/g, '');

          if (+newIdNo.length < 15) {
            return _this.props.form.setFields({
              idno: {
                errors: [new Error('请输入正确的身份证')]
              }
            });
          }

          if (+newMobile.length < 11 || +newMobile.slice(0, 1) !== 1) {
            return _this.props.form.setFields({
              mobile: {
                errors: [new Error('请输入正确的手机号')]
              }
            });
          } // 协议勾选


          if (templateCode && obviousProductStatus && !agreementChecked) {
            return _toast.default.message('请阅读并勾选页面协议');
          } // 号码与绑定不符，点击知道了后，重新输入号码


          if (_this.tel !== +newMobile) {
            _this.tel = +newMobile;
            _this.showKnow = false;
          } // 手机号不符，未确认


          if (+loginMobile !== _this.tel && !_this.showKnow) {
            _modal.default.alert({
              title: "\u8F93\u5165\u7684\u53F7\u7801\u4E0E\u60A8\u767B\u5F55\u7ED1\u5B9A\u7684\u624B\u673A\u53F7\uFF08\u5C3E\u53F7".concat(loginMobile && loginMobile.toString().slice(7, 11), "\uFF09\u4E0D\u4E00\u81F4"),
              actions: [{
                text: '知道了',
                onPress: function onPress() {
                  _this.showKnow = true; // 补充信息二次确认留痕

                  _this.makeRecord('supplementary_information_second_confirm', _objectSpread(_objectSpread({}, values), {}, {
                    mobile: newMobile,
                    idno: newIdNo
                  }));
                }
              }]
            });
          } else {
            // 防重复点击
            if (!_this.allowBind) return;
            _this.allowBind = false;

            var params = _objectSpread(_objectSpread({
              productId: productId,
              orderId: orderId
            }, values), {}, {
              mobile: newMobile,
              idno: newIdNo
            });

            (0, _api.submitForm)(params, _this.props.axiosConfig).then(function (res) {
              // 协议2 ID
              var contractId = (res || {}).data || ''; // 补充信息提交留痕

              _this.makeRecord('supplementary_information_submit', params).finally(function () {
                _this.props.onSubmitCallBack(_objectSpread(_objectSpread({}, params), {}, {
                  contractId: contractId
                }));
              });

              _this.allowBind = true;
            }).catch(function (err) {
              _this.allowBind = true;
              var error = err.error;

              _toast.default.message(error);
            });
          }
        }
      });
    });
    _this.state = {
      userName: '',
      mobile: '',
      idno: '',
      agreementChecked: !(props.agreementChecked !== false) // 协议是否勾选，默认false,

    };
    return _this;
  }

  (0, _createClass2.default)(PersonalInfo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // 未补充留痕/进入页面留痕
      this.timer = setTimeout(function () {
        _this2.makeRecord('no_supplementary_agreement');
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
    } // 留痕 type:留痕类型   config: 其他补充信息

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          headTitle = _this$props3.headTitle,
          templateCode = _this$props3.templateCode,
          obviousProductStatus = _this$props3.obviousProductStatus;
      var _this$props$form = this.props.form,
          getFieldProps = _this$props$form.getFieldProps,
          getFieldsError = _this$props$form.getFieldsError;
      return /*#__PURE__*/React.createElement("div", {
        className: 'm-personal-container'
      }, headTitle && /*#__PURE__*/React.createElement("div", null, headTitle), /*#__PURE__*/React.createElement("p", {
        className: 'personal-head-title'
      }, "\u4E3A\u4FDD\u969C\u4F60\u7684\u542C\u8BFE\u6743\u76CA\uFF0C\u8BF7", /*#__PURE__*/React.createElement("span", null, "\u51C6\u786E\u586B\u5199"), "\u4E2A\u4EBA\u4FE1\u606F"), /*#__PURE__*/React.createElement("div", {
        className: 'personal-content'
      }, /*#__PURE__*/React.createElement(FormItem, {
        label: '姓名',
        showError: true
      }, /*#__PURE__*/React.createElement(_input.default, (0, _extends2.default)({}, getFieldProps('userName', {
        onChange: this.onChange('userName'),
        validateTrigger: 'onBlur',
        rules: [{
          required: true,
          message: '姓名不能为空'
        }, {
          message: '请输入正确的姓名',
          pattern: "^[\\u4E00-\\u9FA5][\\u4E00-\\u9FA5|\xB7]*[\\u4E00-\\u9FA5]$"
        }, {
          max: 15,
          message: '姓名不能超过15个字'
        }]
      }), {
        textAlign: 'right',
        placeholder: '请填写姓名',
        value: this.state.userName
      }))), /*#__PURE__*/React.createElement(_divider.default, null), /*#__PURE__*/React.createElement(FormItem, {
        label: '身份证号',
        showError: true
      }, /*#__PURE__*/React.createElement(_input.default, (0, _extends2.default)({}, getFieldProps('idno', {
        onChange: this.onChange('idno'),
        rules: [{
          required: true,
          message: '身份证号不能为空'
        }]
      }), {
        type: 'idNo',
        textAlign: 'right',
        placeholder: '请填写身份证号',
        value: this.state.idno
      }))), /*#__PURE__*/React.createElement(_divider.default, null), /*#__PURE__*/React.createElement(FormItem, {
        label: '手机号',
        showError: true
      }, /*#__PURE__*/React.createElement(_input.default, (0, _extends2.default)({}, getFieldProps('mobile', {
        onChange: this.onChange('mobile'),
        rules: [{
          required: true,
          message: '手机号不能为空'
        }]
      }), {
        type: 'phone',
        textAlign: 'right',
        placeholder: '请填写手机号',
        value: this.state.mobile
      }))), /*#__PURE__*/React.createElement(_divider.default, null)), /*#__PURE__*/React.createElement("div", {
        className: 'personal-footer'
      }, templateCode && /*#__PURE__*/React.createElement(_checkAgreement.default, {
        defaultChecked: this.state.agreementChecked,
        templateCode: templateCode,
        obviousProductStatus: obviousProductStatus,
        onChangeCheckbox: function onChangeCheckbox(checked) {
          _this3.setState({
            agreementChecked: checked
          });
        }
      }), /*#__PURE__*/React.createElement(_button.default, {
        className: 'submit-btn',
        size: 'large',
        type: 'primary',
        onClick: this.submit,
        block: true,
        disabled: hasErrors(getFieldsError())
      }, "\u786E\u5B9A")));
    }
  }]);
  return PersonalInfo;
}(React.Component), (0, _defineProperty2.default)(_class2, "propTypes", {
  form: formShape
}), _temp)) || _class);
exports.default = PersonalInfo;