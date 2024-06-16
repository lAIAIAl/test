"use strict";

/**
 * @returns {Object}
 */
module.exports = function () {
  var bridge = window.WebViewJavascriptBridge;
  return function () {
    bridge = bridge || window.WebViewJavascriptBridge;
    return bridge;
  };
}();