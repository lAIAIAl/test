"use strict";

var isOldKuaidaiIOS = function isOldKuaidaiIOS(userAgent) {
  return /platform\/60/i.test(userAgent) && /iPhone OS/i.test(userAgent) && !/webviewVersion\/v2/i.test(userAgent);
};

var isWeixin = function isWeixin(userAgent) {
  return /micromessenger/i.test(userAgent) || /wechatdevtools/i.test(userAgent);
};

var getPlatform = function getPlatform(userAgent) {
  return /platform\/([\S]*)/i.test(userAgent) && RegExp.$1;
};

module.exports = {
  isOldKuaidaiIOS: isOldKuaidaiIOS,
  isWeixin: isWeixin,
  getPlatform: getPlatform
};