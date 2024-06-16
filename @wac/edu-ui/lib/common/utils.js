"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fetchLocalStorageWithKey = exports.isJSON = exports.saveLocalStorageWithKey = exports.parseNameWithStar = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.regexp.replace.js");

require("core-js/modules/es6.regexp.split.js");

var _isObject = _interopRequireDefault(require("lodash/isObject"));

// export function getCommonData(key) {
//   let commonData = null
//   if (typeof window !== 'undefined') {
//     const data = window?.__DATA__ || {}
//     commonData = data.commonData || {}
//   } else {
//     commonData = {}
//   }
//   if (key) {
//     return commonData[key]
//   }
//   return commonData
// }

/**
 * 姓名打*
 * @param {string} str
 */
var parseNameWithStar = function parseNameWithStar(str) {
  if (!str) return '';
  var pureStr = str.replace(/\s/g, '');
  var charArr = pureStr.split('');
  charArr.forEach(function (v, i) {
    if (pureStr.length === 2 && i > 0) {
      charArr[i] = '*';
    }

    if (pureStr.length > 2 && i > 0 && i !== pureStr.length - 1) {
      charArr[i] = '*';
    }
  });
  return charArr.join('');
};
/**
 * 保存数据LocalStorage，object会转成jsonString
 * @param {string} key
 * @param {any} value
 */


exports.parseNameWithStar = parseNameWithStar;

var saveLocalStorageWithKey = function saveLocalStorageWithKey(key, value) {
  if ((typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === 'object' && window.localStorage) {
    var v = value;

    if ((0, _isObject.default)(v)) {
      v = JSON.stringify(v);
    }

    localStorage.setItem(key, v || '');
  }
};
/**
 * 判断是否object 转成的 jsonString
 * @param {string} str
 */


exports.saveLocalStorageWithKey = saveLocalStorageWithKey;

var isJSON = function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str);

      if ((0, _typeof2.default)(obj) === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return false;
};
/**
 * 从LocalStorage取数据，jsonString会转成object
 * @param {string} key
 */


exports.isJSON = isJSON;

var fetchLocalStorageWithKey = function fetchLocalStorageWithKey(key) {
  if ((typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === 'object' && window.localStorage) {
    var result = localStorage.getItem(key);

    if (isJSON(result)) {
      return JSON.parse(result);
    } else {
      return result || '';
    }
  }

  return '';
};

exports.fetchLocalStorageWithKey = fetchLocalStorageWithKey;
var _default = {
  // getCommonData,
  parseNameWithStar: parseNameWithStar,
  saveLocalStorageWithKey: saveLocalStorageWithKey,
  fetchLocalStorageWithKey: fetchLocalStorageWithKey,
  isJSON: isJSON
};
exports.default = _default;