"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

require("core-js/modules/es6.regexp.replace.js");

require("core-js/modules/es6.regexp.split.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.regexp.to-string.js");

require("core-js/modules/es6.array.map.js");

require("core-js/modules/es6.array.slice.js");

var _queue = _interopRequireDefault(require("./queue"));

var handleBodyScroll = function handleBodyScroll(canScroll) {
  if (canScroll) {
    document.body.style.overflow = '';
    document.body.style.position = 'static';
    var scrollY = document.body.style.top && document.body.style.top.replace(/\D/g, '');
    document.body.style.top = '0';

    if (scrollY) {
      document.documentElement.scrollTop = document.body.scrollTop = scrollY;
    }
  } else {
    var _scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = "-".concat(_scrollY, "px");
  }
};
/**
 * 获取指定层级的数据，如不存在，直接返回undefined
 * @param {object|array} object 需要获取值得对象或数组
 * @param {string|array} originalParams 参数，表示要获取的层级
 * @param {*} defaultValue 默认值，如果结果为undefined，则返回默认值
 * @returns {*}
 */


function getObjectValue(object) {
  var originalParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var params = typeof originalParams === 'string' ? originalParams.split('.') : originalParams;

  if (!Array.isArray(params)) {
    throw new Error('参数错误, 第二个参数应为字符串或者数组');
  }

  if (params.length <= 0) {
    return object;
  }

  var result = params.reduce(function (subject, key) {
    if (subject === undefined) {
      return undefined;
    }

    if (key.toString() === '') {
      return subject;
    }

    return subject[key];
  }, object);
  return result === undefined ? defaultValue : result;
} // 兼容用户中心在sso时参数被解码的情况


var unserialize = function unserialize(data) {
  var result = {};
  data.length && data.replace(/^\?/g, '').split('&').map(function (item) {
    if (item) {
      var _item$split = item.split('='),
          _item$split2 = (0, _toArray2.default)(_item$split),
          key = _item$split2[0],
          value = _item$split2.slice(1);

      result[decodeURIComponent(key)] = decodeURIComponent(value.join('='));
    }
  });
  return result;
};

var _default = {
  unserialize: unserialize,
  Queue: _queue.default,
  getObjectValue: getObjectValue,
  handleBodyScroll: handleBodyScroll
};
exports.default = _default;