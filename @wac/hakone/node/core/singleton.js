"use strict";

/**
 * @param {function} fn
 * @returns {function(): *}
 */
module.exports = fn => {
  let result = null;
  let loaded = false;
  return () => {
    if (!loaded) {
      loaded = true;
      result = fn();
    }

    return result;
  };
};