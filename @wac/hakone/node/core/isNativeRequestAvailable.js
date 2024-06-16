"use strict";

const getBridge = require('./getBridge');

const uaTools = require('./uaTools');
/**
 * @desc 是否当前bridge已经挂载，若游览器不支持，或bridge未挂载则为false
 */


module.exports = () => {
  const brige = getBridge();
  if (!brige || typeof brige !== 'object' || typeof brige.request !== 'function' // bridge.request不存在或者类型不匹配
  ) return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isOldKuaidaiIOS = uaTools.isOldKuaidaiIOS(userAgent);
  const isWeixin = uaTools.isWeixin(userAgent); // 参考 @wac/fund-env 实现

  const platform$ua = uaTools.getPlatform(userAgent);

  if (isWeixin || // 微信
  isOldKuaidaiIOS || // 旧的快贷App
  !platform$ua // 非二方App
  ) {
      return false; // 不支持原生request
    }

  return true;
};