"use strict";

/**
 * 延时Promise
 * @param {number} timeout 延迟毫秒数
 * @returns {Promise}
 */
module.exports = function (timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
};