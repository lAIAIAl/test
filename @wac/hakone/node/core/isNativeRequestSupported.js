"use strict";

const singleton = require('./singleton');

const waitForBridgeAsPromise = require('./waitForBridgeAsPromise');

const delayAsPromise = require('./delayAsPromise');

const uaTools = require('./uaTools');
/**
 * @type {isNativeRequestSupportedFunc}
 */


module.exports = singleton(() => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isOldKuaidaiIOS = uaTools.isOldKuaidaiIOS(userAgent);
  const isWeixin = uaTools.isWeixin(userAgent); // 参考 @wac/fund-env 实现

  const platform$ua = uaTools.getPlatform(userAgent);

  if (isWeixin || // 微信
  isOldKuaidaiIOS || // 旧的快贷App
  !platform$ua // 非二方App
  ) {
      return Promise.resolve(false); // 不支持原生request
    }

  const p1 = waitForBridgeAsPromise().then(bridge => !!bridge.request);
  const p2 = delayAsPromise(2000).then(() => false); // 2秒仍未初始化好JSB则认为JSB失败，降级为普通http请求

  return Promise.race([p1, p2]).then(null, () => false);
});
/**
 * @callback isNativeRequestSupportedFunc
 * @returns {Promise<boolean>}
 */