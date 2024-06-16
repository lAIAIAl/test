"use strict";

var singleton = require('./singleton');

var waitForBridgeAsPromise = require('./waitForBridgeAsPromise');

var delayAsPromise = require('./delayAsPromise');

var uaTools = require('./uaTools');
/**
 * @type {isNativeRequestSupportedFunc}
 */


module.exports = singleton(function () {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var isOldKuaidaiIOS = uaTools.isOldKuaidaiIOS(userAgent);
  var isWeixin = uaTools.isWeixin(userAgent); // 参考 @wac/fund-env 实现

  var platform$ua = uaTools.getPlatform(userAgent);

  if (isWeixin || // 微信
  isOldKuaidaiIOS || // 旧的快贷App
  !platform$ua // 非二方App
  ) {
      return Promise.resolve(false); // 不支持原生request
    }

  var p1 = waitForBridgeAsPromise().then(function (bridge) {
    return !!bridge.request;
  });
  var p2 = delayAsPromise(2000).then(function () {
    return false;
  }); // 2秒仍未初始化好JSB则认为JSB失败，降级为普通http请求

  return Promise.race([p1, p2]).then(null, function () {
    return false;
  });
});
/**
 * @callback isNativeRequestSupportedFunc
 * @returns {Promise<boolean>}
 */