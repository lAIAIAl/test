"use strict";

const isNativeRequestSupported = require('./isNativeRequestSupported');

const isNativeRequestAvailable = require('./isNativeRequestAvailable');

const nativeOnlyAdaptor = require('./nativeOnlyAdaptor');

const noop = require('./noop');
/**
 * 扩展Axios adaptor支持原生请求
 * @param {Function} fallbackAdaptor
 * @returns {Function}
 */


module.exports = fallbackAdaptor => config => {
  // 非生产环境引导开发者使用native=true选项
  if (process.env.NODE_ENV !== 'production') {
    if (!config.native) {
      isNativeRequestSupported().then(support => {
        if (!support) {
          return;
        }
        /* eslint-disable no-console */


        console.warn(`You'd better try using [config.native=true]`);
        /* eslint-enable no-console */
      }, noop);
    }
  } // 不尝试使用原生请求，则使用默认adaptor


  if (!config.native) {
    return fallbackAdaptor(config);
  }

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  const errorHandler = error => {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable no-console */
      console.warn(`Something went wrong while trying to use native request, fallback to XHR: ${error.message}`);
      /* eslint-enable no-console */
    }

    return fallbackAdaptor(config);
  };

  const nativeRequestAvailable = isNativeRequestAvailable();

  if (!nativeRequestAvailable) {
    /* eslint-disable no-console */
    console.log(`Native request is not supported in current browser, fallback to XHR`);
    /* eslint-enable no-console */

    return fallbackAdaptor(config);
  } else {
    return nativeOnlyAdaptor(config).catch(errorHandler);
  }
};