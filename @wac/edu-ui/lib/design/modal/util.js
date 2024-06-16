"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace.js");

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

var _default = {
  handleBodyScroll: handleBodyScroll
};
exports.default = _default;