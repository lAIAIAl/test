"use strict";

var singleton = require('./singleton');

var waitForBridge = function waitForBridge(callback) {
  var bridge = window.WebViewJavascriptBridge;

  if (bridge) {
    callback(bridge);
    return;
  }

  var finish = singleton(function () {
    document.removeEventListener('WacaiJavascriptBridgeReady', bridgeReadyHandler);
    clearInterval(interval);
    callback(bridge);
  });

  var bridgeReadyHandler = function bridgeReadyHandler() {
    bridge = window.WebViewJavascriptBridge;

    if (bridge) {
      finish(bridge);
    }
  };

  document.addEventListener('WacaiJavascriptBridgeReady', bridgeReadyHandler, false);
  var interval = setInterval(bridgeReadyHandler, 50);
};
/**
 * @type {WaitForBridgeFunc}
 */


module.exports = singleton(function () {
  return new Promise(function (resolve) {
    return waitForBridge(resolve);
  });
});
/**
 * @callback WaitForBridgeFunc
 * @returns {Promise}
 */