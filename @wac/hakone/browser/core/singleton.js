"use strict";

/**
 * @param {function} fn
 * @returns {function(): *}
 */
module.exports = function (fn) {
  var result = null;
  var loaded = false;
  return function () {
    if (!loaded) {
      loaded = true;
      result = fn();
    }

    return result;
  };
};