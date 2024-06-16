"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messenger = /** @class */ (function () {
    function Messenger(targetWindow, targetOrigin, sourceOrigin) {
        if (sourceOrigin === void 0) { sourceOrigin = '*'; }
        this.targetWindow = targetWindow;
        this.targetOrigin = targetOrigin;
        this.sourceOrigin = sourceOrigin;
        this.receiveMessage = function (evt) { console.log(evt); };
    }
    Messenger.prototype.unwarpperMessage = function (originalMessage) {
        var messageWrapper = JSON.parse(originalMessage);
        var needDeserialization = messageWrapper.needDeserialization, data = messageWrapper.data;
        if (needDeserialization) {
            return JSON.parse(data);
        }
        return data;
    };
    Messenger.prototype.createMessageWrapper = function (needDeserialization, data) {
        return {
            needDeserialization: needDeserialization,
            data: data
        };
    };
    Messenger.prototype.onMessage = function (callback) {
        var _this = this;
        this.receiveMessage = function (evt) {
            var origin = evt.origin, data = evt.data;
            if (_this.sourceOrigin !== '*' && origin !== _this.sourceOrigin) {
                return;
            }
            var message = _this.unwarpperMessage(data);
            callback(message);
        };
        window.addEventListener('message', this.receiveMessage);
    };
    Messenger.prototype.send = function (message) {
        var syntheticMessage;
        if (typeof message === 'object') {
            syntheticMessage = this.createMessageWrapper(true, JSON.stringify(message));
        }
        syntheticMessage = this.createMessageWrapper(false, message);
        this.targetWindow.postMessage(syntheticMessage, this.targetOrigin);
    };
    Messenger.prototype.destroy = function () {
        window.removeEventListener('message', this.receiveMessage);
    };
    return Messenger;
}());
exports.Messenger = Messenger;
