"use strict";

const waitForBridgeAsPromise = require('./waitForBridgeAsPromise');

const resolveUrl = require('./resolveUrl');

const buildURL = require('axios/lib/helpers/buildURL');

const settle = require('axios/lib/core/settle');

const createError = require('axios/lib/core/createError');

const HttpStatus = require('http-status-codes');

const intersection = require('lodash/intersection');

module.exports = config => {
  let request, responseType;
  return waitForBridgeAsPromise().then(bridge => {
    const method = config.method && config.method.toLowerCase() || 'get';
    const headers = config.headers;
    const url = resolveUrl(buildURL(config.url, config.params, config.paramsSerializer));
    const body = config.data || {};
    const params = {
      url,
      method,
      headers,
      body
    };
    request = {
      params,
      isPlanck: true
    }; // 只有GET/POST方法支持

    if (method !== 'get' && method !== 'post') {
      throw createError('Request failed with invalid method, only get/post is supported', config, 'INVALID_METHOD', request, null);
    }

    const contentType = config.headers['Content-Type'] || '';
    const requestType = contentType.split(';');
    const whiteList = ['text', 'application/xhtml+xml', 'application/xml', 'image/svg+xml', 'application/javascript', 'application/json', 'application/x-www-form-urlencoded'];
    const isInWhiteList = intersection(requestType, whiteList).length > 0;
    const isTextCategory = requestType.filter(type => type.includes('text/')).length > 0;
    responseType = config.responseType || 'text';

    if (!isInWhiteList && !isTextCategory) {
      throw createError('Request failed with invalid requestType, only `json`/`text` is supported', config, 'INVALID_REQUEST_TYPE', request, null);
    }

    responseType = config.responseType || 'text';

    if (responseType !== 'json' && responseType !== 'text') {
      throw createError('Request failed with invalid responseType, only `json`/`text` is supported', config, 'INVALID_RESPONSE_TYPE', request, null);
    }

    return bridge.request(params);
  }).then(bridgeResult => {
    // 响应无效
    if (!bridgeResult || typeof bridgeResult !== 'object') {
      throw createError('Request failed with invalid response', config, 'INVALID_RESPONSE', request, null);
    }

    const status = bridgeResult.code;
    const statusText = status ? HttpStatus.getStatusText(status) : '';
    const responseBody = bridgeResult.body;

    if (typeof responseBody !== 'string') {
      throw createError('Response failed with invalid response', config, 'INVALID_RESPONSE', request, null);
    }

    let data;

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

    const responseHeaders = bridgeResult.headers || {};
    const response = {
      status,
      statusText,
      headers: responseHeaders,
      config,
      request,
      data
    };
    return new Promise((resolve, reject) => {
      settle(resolve, reject, response);
    });
  });
};