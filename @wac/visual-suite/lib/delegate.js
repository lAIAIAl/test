"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var closest_1 = require("./closest");
var listener = function (element, selector, callback) {
    return function (evt) {
        if (Array.isArray(selector)) {
            selector.forEach(function (s) {
                evt.delegateTarget = closest_1.closest(evt.target, s);
                evt.selector = s;
                if (evt.delegateTarget) {
                    callback.call(element, evt);
                }
            });
        }
        else {
            evt.delegateTarget = closest_1.closest(evt.target, selector);
            evt.selector = selector;
            if (evt.delegateTarget) {
                callback.call(element, evt);
            }
        }
    };
};
var bind = function (element, selector, type, callback, useCapture) {
    var listenerFn = listener(element, selector, callback);
    element.addEventListener(type, listenerFn, useCapture);
    return {
        destroy: function () {
            element.removeEventListener(type, listenerFn, useCapture);
        },
    };
};
function delegate(elements, seletor, type, callback, useCapture) {
    if (elements instanceof HTMLElement) {
        elements = [elements];
    }
    // 需要考虑 elements 是 NodeList 类型的情况
    return Array.from(elements).map(function (element) {
        return bind(element, seletor, type, callback, useCapture);
    });
}
exports.delegate = delegate;
