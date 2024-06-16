"use strict";

/**
 * @returns {Object}
 */
module.exports = (() => {
  let bridge = window.WebViewJavascriptBridge;
  return () => {
    bridge = bridge || window.WebViewJavascriptBridge;
    return bridge;
  };
})();