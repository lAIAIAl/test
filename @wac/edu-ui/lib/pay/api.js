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
exports.getRecord = exports.getGroupQrCode = exports.getPayResult = exports.submitPayByAliPayQrCode = exports.submitPay = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("../common/axios"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var submitPay = function submitPay(params, axiosConfig) {
  return _axios.default.post('/wac/xuexi/api/wx-pay/submit', params, _objectSpread({}, axiosConfig));
};

exports.submitPay = submitPay;

var submitPayByAliPayQrCode = function submitPayByAliPayQrCode(params) {
  return _axios.default.post('/wac/xuexi/api/pay/submit', _objectSpread(_objectSpread({}, params), {}, {
    orgCode: 'ZFB',
    // 三方机构编号：支付宝（ZFB）、微信财付通（WEIXIN）
    payChannel: 'QR_CODE' // 支付渠道:app应用支付（APP）、h5支付（H5）、公众号支付（JSAPI）、付款码支付（QR_CODE） })

  }));
};

exports.submitPayByAliPayQrCode = submitPayByAliPayQrCode;

var getPayResult = function getPayResult(params, axiosConfig) {
  // 就是post请求
  return _axios.default.post('/wac/xuexi/api/wx-pay/query', params, _objectSpread({}, axiosConfig));
};

exports.getPayResult = getPayResult;

var getGroupQrCode = function getGroupQrCode(params, axiosConfig) {
  return _axios.default.get('/wac/xuexi/api/result/group-qr-code', {
    params: params
  }, axiosConfig || {});
};

exports.getGroupQrCode = getGroupQrCode;

var getRecord = function getRecord(params, axiosConfig) {
  return _axios.default.get('/wac/xuexi/api/agreement/get-record', {
    params: params
  }, axiosConfig || {});
}; // export const getJsLog = (params) => {
//   return axios.post('/wac/xuexi/api/exception/log', params)
// }


exports.getRecord = getRecord;