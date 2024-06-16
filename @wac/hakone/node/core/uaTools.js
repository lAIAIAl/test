"use strict";

const isOldKuaidaiIOS = userAgent => {
  return /platform\/60/i.test(userAgent) && /iPhone OS/i.test(userAgent) && !/webviewVersion\/v2/i.test(userAgent);
};

const isWeixin = userAgent => {
  return /micromessenger/i.test(userAgent) || /wechatdevtools/i.test(userAgent);
};

const getPlatform = userAgent => {
  return /platform\/([\S]*)/i.test(userAgent) && RegExp.$1;
};

module.exports = {
  isOldKuaidaiIOS,
  isWeixin,
  getPlatform
};