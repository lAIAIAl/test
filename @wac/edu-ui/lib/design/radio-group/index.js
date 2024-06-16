"use strict";

require("core-js/modules/es6.reflect.construct.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.slice.js");

require("core-js/modules/es6.array.map.js");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _radio = _interopRequireDefault(require("../radio"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RadioGroup = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(RadioGroup, _React$Component);

  var _super = _createSuper(RadioGroup);

  function RadioGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RadioGroup);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (params) {
      var onChange = _this.props.onChange;

      _this.setState({
        checkedRadio: params,
        defaultChecked: false
      });

      onChange && onChange(params);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDidMount", function (params) {
      var onDidMount = _this.props.onDidMount;
      onDidMount && onDidMount(params);
    });
    _this.state = {
      // 被选中的radio
      checkedRadio: {
        index: -1
      },
      // 选完之后，radio的defaultChecked 置为失效
      defaultChecked: true
    };
    return _this;
  } // Radio改变事件


  (0, _createClass2.default)(RadioGroup, [{
    key: "sliceArr",
    value: // 分隔数据源
    function sliceArr(array, subGroupLength) {
      var index = 0;
      var newArray = [];

      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }

      return newArray;
    }
  }, {
    key: "renderColumnsChild",
    value: function renderColumnsChild(columns) {
      if (columns && typeof columns.render === 'function') {
        return columns.render(columns.value, columns);
      }
    } // 列

  }, {
    key: "renderRow",
    value: function renderRow(rows) {
      var _this2 = this;

      var name = this.props.name;
      var _this$state = this.state,
          checkedRadio = _this$state.checkedRadio,
          defaultChecked = _this$state.defaultChecked;
      return rows.map(function (columns, index) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'column',
          key: 'column-' + columns.label
        }, /*#__PURE__*/_react.default.createElement(_radio.default, (0, _extends2.default)({
          index: index,
          name: name,
          checked: index === checkedRadio.index,
          onChange: _this2.onChange,
          onDidMount: _this2.onDidMount
        }, columns, {
          defaultChecked: defaultChecked ? columns.defaultChecked : false
        }), _this2.renderColumnsChild(columns)));
      });
    } // 行

  }, {
    key: "renderRadios",
    value: function renderRadios(sliceDataSource) {
      var _this3 = this;

      return sliceDataSource.map(function (rows) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'row',
          key: 'row-' + sliceDataSource.indexOf(rows)
        }, _this3.renderRow(rows));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          columns = _this$props.columns;
      if (!dataSource || dataSource.length === 0) return null; // 把总的数据源，拆分成columns个数组

      var sliceDataSource = this.sliceArr(dataSource, columns);
      var classNames = ['radio-group-container', this.props.className]; // 动态给子节点附加radio属性值

      var children = _react.default.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          radio: _this4.state.checkedRadio
        });
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        className: classNames.join(' ')
      }, this.renderRadios(sliceDataSource), children);
    }
  }]);
  return RadioGroup;
}(_react.default.Component);

exports.default = RadioGroup;
(0, _defineProperty2.default)(RadioGroup, "propTypes", {
  children: _propTypes.default.any,
  // 单选项选择改变事件
  onChange: _propTypes.default.func,
  // 单选项加载事件
  onDidMount: _propTypes.default.func,
  className: _propTypes.default.string,
  // 数据源
  dataSource: _propTypes.default.array,
  // 要显示几列
  columns: _propTypes.default.number,
  // radio组名
  name: _propTypes.default.string
});