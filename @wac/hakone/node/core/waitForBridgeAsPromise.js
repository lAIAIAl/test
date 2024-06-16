"use strict";

const singleton = require('./singleton');

const waitForBridge = callback => {
  let bridge = window.WebViewJavascriptBridge;

  if (bridge) {
    callback(bridge);
    return;
  }

  const finish = singleton(() => {
    document.removeEventListener('WacaiJavascriptBridgeReady', bridgeReadyHandler);
    clearInterval(interval);
    callback(bridge);
  });

  const bridgeReadyHandler = () => {
    bridge = window.WebViewJavascriptBridge;

    if (bridge) {
      finish(bridge);
    }
  };

  document.addEventListener('WacaiJavascriptBridgeReady', bridgeReadyHandler, false);
  const interval = setInterval(bridgeReadyHandler, 50);
};
/**
 * @type {WaitForBridgeFunc}
 */


module.exports = singleton(() => new Promise(resolve => waitForBridge(resolve)));
/**
 * @callback WaitForBridgeFunc
 * @returns {Promise}
 */