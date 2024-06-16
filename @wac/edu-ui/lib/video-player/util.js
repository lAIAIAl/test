"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatSeconds = formatSeconds;
exports.getStyle = getStyle;

// 秒转为时分秒
function formatSeconds(value) {
  var result = parseInt(value);
  var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  var m = Math.floor(result / 60 % 60) < 10 ? '0' + Math.floor(result / 60 % 60) : Math.floor(result / 60 % 60);
  var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60);
  var res = '';
  res += "".concat(h, ":");
  res += "".concat(m, ":");
  res += "".concat(s);
  return res;
} // 获取元素样式函数


function getStyle(obj, attr) {
  var css = obj.currentStyle || getComputedStyle(obj, null);
  return css[attr];
}