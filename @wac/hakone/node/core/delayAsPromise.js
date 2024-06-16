"use strict";

/**
 * 延时Promise
 * @param {number} timeout 延迟毫秒数
 * @returns {Promise}
 */
module.exports = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};