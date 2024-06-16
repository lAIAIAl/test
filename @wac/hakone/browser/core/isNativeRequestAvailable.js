"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getBridge = require('./getBridge');

var uaTools = require('./uaTools');
/**
 * @desc 是否当前bridge已经挂载，若游览器不支持，或bridge未挂载则为false
 */


module.exports = function () {
  var brige = getBridge();
  if (!brige || _typeof(brige) !== 'object' || typeof brige.request !== 'function' // bridge.request不存在或者类型不匹配
  ) return false;
  var userAgent = window.navigator.userAgent.toLowerCase();
  var isOldKuaidaiIOS = uaTools.isOldKuaidaiIOS(userAgent);
  var isWeixin = uaTools.isWeixin(userAgent); // 参考 @wac/fund-env 实现

  var platform$ua = uaTools.getPlatform(userAgent);

  if (isWeixin || // 微信
  isOldKuaidaiIOS || // 旧的快贷App
  !platform$ua // 非二方App
  ) {
      return false; // 不支持原生request
    }

  return true;
};