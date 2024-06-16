"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var waitForBridgeAsPromise = require('./waitForBridgeAsPromise');

var resolveUrl = require('./resolveUrl');

var buildURL = require('axios/lib/helpers/buildURL');

var settle = require('axios/lib/core/settle');

var createError = require('axios/lib/core/createError');

var HttpStatus = require('http-status-codes');

var intersection = require('lodash/intersection');

module.exports = function (config) {
  var request, responseType;
  return waitForBridgeAsPromise().then(function (bridge) {
    var method = config.method && config.method.toLowerCase() || 'get';
    var headers = config.headers;
    var url = resolveUrl(buildURL(config.url, config.params, config.paramsSerializer));
    var body = config.data || {};
    var params = {
      url: url,
      method: method,
      headers: headers,
      body: body
    };
    request = {
      params: params,
      isPlanck: true
    }; // 只有GET/POST方法支持

    if (method !== 'get' && method !== 'post') {
      throw createError('Request failed with invalid method, only get/post is supported', config, 'INVALID_METHOD', request, null);
    }

    var contentType = config.headers['Content-Type'] || '';
    var requestType = contentType.split(';');
    var whiteList = ['text', 'application/xhtml+xml', 'application/xml', 'image/svg+xml', 'application/javascript', 'application/json', 'application/x-www-form-urlencoded'];
    var isInWhiteList = intersection(requestType, whiteList).length > 0;
    var isTextCategory = requestType.filter(function (type) {
      return type.includes('text/');
    }).length > 0;
    responseType = config.responseType || 'text';

    if (!isInWhiteList && !isTextCategory) {
      throw createError('Request failed with invalid requestType, only `json`/`text` is supported', config, 'INVALID_REQUEST_TYPE', request, null);
    }

    responseType = config.responseType || 'text';

    if (responseType !== 'json' && responseType !== 'text') {
      throw createError('Request failed with invalid responseType, only `json`/`text` is supported', config, 'INVALID_RESPONSE_TYPE', request, null);
    }

    return bridge.request(params);
  }).then(function (bridgeResult) {
    // 响应无效
    if (!bridgeResult || _typeof(bridgeResult) !== 'object') {
      throw createError('Request failed with invalid response', config, 'INVALID_RESPONSE', request, null);
    }

    var status = bridgeResult.code;
    var statusText = status ? HttpStatus.getStatusText(status) : '';
    var responseBody = bridgeResult.body;

    if (typeof responseBody !== 'string') {
      throw createError('Response failed with invalid response', config, 'INVALID_RESPONSE', request, null);
    }

    var data;

    if (responseType === 'text') {
      data = responseBody;
    } else if (responseType === 'json') {
      try {
        data = JSON.parse(responseBody);
      } catch (e) {
        throw createError('Response failed with invalid JSON', config, 'INVALID_JSON', request, null);
      }
    } else {
      throw createError('Request failed with invalid response', config, 'INVALID_RESPONSE', request, null);
    }

    var responseHeaders = bridgeResult.headers || {};
    var response = {
      status: status,
      statusText: statusText,
      headers: responseHeaders,
      config: config,
      request: request,
      data: data
    };
    return new Promise(function (resolve, reject) {
      settle(resolve, reject, response);
    });
  });
};