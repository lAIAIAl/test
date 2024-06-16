"use strict";

module.exports = function (url) {
  var body = document.body || document.getElementsByTagName('body').item(0);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('href', url);
  body.appendChild(a);
  var result = a.href;
  body.removeChild(a);
  return result;
};