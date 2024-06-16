"use strict";

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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Form = _interopRequireWildcard(require("rc-form"));

var _formItem = _interopRequireDefault(require("./form-item"));

var _createDOMForm = _interopRequireDefault(require("rc-form/lib/createDOMForm"));

var _constants = require("./constants");

require("./index.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = _objectSpread(_objectSpread({}, Form), {}, {
  Item: _formItem.default,
  createForm: function createForm() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _createDOMForm.default)(_objectSpread(_objectSpread({
      fieldNameProp: 'id'
    }, options), {}, {
      fieldMetaProp: _constants.FIELD_META_PROP,
      fieldDataProp: _constants.FIELD_DATA_PROP
    }));
  }
});

exports.default = _default;