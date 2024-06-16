"use strict";

require("core-js/modules/es6.object.keys.js");

require("core-js/modules/es6.symbol.js");

require("core-js/modules/es6.array.filter.js");

require("core-js/modules/es6.object.get-own-property-descriptor.js");

require("core-js/modules/es7.object.get-own-property-descriptors.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWechatSignature = void 0;

require("core-js/modules/es6.regexp.split.js");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("./axios"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getWechatSignature = function getWechatSignature() {
  var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  conf = _objectSpread(_objectSpread({}, conf), {}, {
    url: conf.url || "".concat(location.origin, "/wac/xuexi/api/tripartite/wechat-signature"),
    params: _objectSpread({
      url: encodeURIComponent(window.location.href.split('#')[0])
    }, conf.params)
  });
  return (0, _axios.default)(conf);
};

exports.getWechatSignature = getWechatSignature;