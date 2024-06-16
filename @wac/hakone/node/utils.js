"use strict";

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object' && !isArray(obj)) {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn(obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn(obj[key], key, obj);
      }
    }
  }
}

function merge()
/* obj1, obj2, obj3, ... */
{
  const result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}

const toString = Object.prototype.toString;

function isPlainObj(x) {
  return toString.call(x) === '[object Object]' && (Object.getPrototypeOf(x) === null || Object.getPrototypeOf(x) === Object.getPrototypeOf({}));
}

module.exports = {
  merge,
  forEach,
  isArray,
  isPlainObj
};