"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.promise.js");

var _hakone = _interopRequireDefault(require("@wac/hakone"));

var instance = _hakone.default.create({
  // serviceName: commonData.serviceName,
  // tracerService: commonData.fetchTracerService,
  // baseURL: 'http://live.wac-edu.k2.wacaiyun.com',
  baseURL: '',
  timeout: 20000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

instance.interceptors.request.use(function (config) {
  config.params = Object.assign({
    noStoreTimeStamp: new Date().getTime() // cache: no-store

  }, config.params || {});
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); // 添加响应拦截器

instance.interceptors.response.use(function (response) {
  var _ref = response.data || {
    code: '',
    data: null,
    result: null
  },
      code = _ref.code,
      data = _ref.data,
      result = _ref.result;

  switch (code) {
    case '0':
    case 0:
      return data || result;

    default:
      break;
  }

  return Promise.reject(response.data);
}, function (error) {
  var res = {
    error: error
  };
  return Promise.reject(res);
});
var _default = instance;
exports.default = _default;