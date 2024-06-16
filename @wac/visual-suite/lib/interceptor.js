"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interceptor = /** @class */ (function () {
    function Interceptor() {
        this.constitutedElements = [];
        this.cancelHighlightedEvent = {
            cancel: function () { }
        };
    }
    Interceptor.prototype.break = function (element, type, callback) {
        var fn = function (evt) {
            if (callback) {
                callback(evt);
            }
            evt.preventDefault();
            evt.stopPropagation();
        };
        element.addEventListener(type, fn, true);
    };
    Interceptor.prototype.constitute = function (element, allowMulti, callback) {
        var constituted = element.classList.toggle('c-vs-constitute');
        this.repair(element, constituted, allowMulti);
        if (callback && typeof callback === 'function') {
            callback(element, constituted);
        }
    };
    // 圈选逻辑
    Interceptor.prototype.constituteAuto = function (allowMulti, callback) {
        var _this = this;
        return this.break(document.body, 'click', function (evt) {
            // 忽略 body 圈选
            if (evt.target && evt.target !== evt.currentTarget) {
                var constitutedElement = evt.target;
                _this.constitute(constitutedElement, allowMulti, callback);
            }
        });
    };
    // 高亮元素
    Interceptor.prototype.highlight = function (selectors) {
        if (typeof selectors === 'string') {
            selectors = [selectors];
        }
        var highlightedElements = [];
        selectors.forEach(function (selector) {
            highlightedElements = highlightedElements.concat(Array.from(window.document.querySelectorAll(selector)));
        });
        this.constitutedElements.forEach(function (constitutedElement) {
            constitutedElement.classList.remove('c-vs-constitute');
        });
        this.constitutedElements = [];
        highlightedElements.forEach(function (element) {
            element.classList.add('c-vs-highlight');
        });
        this.cancelHighlightedEvent = {
            // 取消高亮
            cancel: function () {
                highlightedElements.forEach(function (element) {
                    element.classList.remove('c-vs-highlight');
                });
            },
        };
        return this.cancelHighlightedEvent;
    };
    Interceptor.prototype.repair = function (element, constituted, allowMulti) {
        // 新增圈选元素
        if (constituted) {
            this.cancelHighlightedEvent.cancel();
            if (allowMulti) {
                element.classList.toggle('c-vs-constitute');
                this.constitutedElements.push(element);
            }
            else {
                // 清除存量被圈选的元素再添加并从圈选记录中移除
                this.constitutedElements.forEach(function (constitutedElement) {
                    constitutedElement.classList.toggle('c-vs-constitute');
                });
                this.constitutedElements.splice(0, this.constitutedElements.length, element);
            }
        }
        else {
            // 取消某个元素的圈选
            this.constitutedElements = this.constitutedElements.filter(function (constitutedElement) {
                return constitutedElement !== element;
            });
        }
    };
    return Interceptor;
}());
exports.Interceptor = Interceptor;
