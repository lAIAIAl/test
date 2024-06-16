'use strict';
/* global IS_NODE: true */

/* global PACKAGE_VERSION: '1.0.0' */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var axios = require('./axios');

var Axios = axios.Axios;

Axios.prototype.init = function (config) {
  if (!config) {
    throw new Error('config is required');
  }

  var hakoneInstance = this;
  hakoneInstance.defaults = Object.assign(hakoneInstance.defaults, config); // NODE 层初始化
};

var hakone = axios;
hakone.defaults["native"] = false; // 默认尝试使用原生缓存

hakone.defaults.adapter = require('./core/nativeRequestAdaptor')(hakone.defaults.adapter);
hakone.init = Axios.prototype.init.bind(hakone);
var axiosCreate = axios.create;

hakone.create = function (config) {
  var finalConfig = Object.assign({}, hakone.defaults, config);
  var newInstance = axiosCreate(finalConfig);
  newInstance.init(finalConfig);
  return newInstance;
};

module.exports = hakone;