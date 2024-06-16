"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOCUMENT_NODE_TYPE = 9;
// 不同的手机浏览器下，matches 方法名不同
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto_1 = Element.prototype;
    var matchesMethods = [
        'webkitMatchesSelector',
        'matchesSelector',
        'mozMatchesSelector',
        'msMatchesSelector',
    ];
    matchesMethods.some(function (method) { return !!(proto_1.matches = proto_1[method]); });
}
exports.closest = function (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' && element.matches(selector)) {
            return element;
        }
        element = element.parentNode;
    }
};
