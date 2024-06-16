"use strict";

module.exports = url => {
  const body = document.body || document.getElementsByTagName('body').item(0);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('href', url);
  body.appendChild(a);
  const result = a.href;
  body.removeChild(a);
  return result;
};