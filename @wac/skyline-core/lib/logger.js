"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr = require("xhr");
var SAKURA_URL = '//client.wacai.info/sakura/api/logs';
exports.default = (function (_a) {
    var eventCode = _a.eventCode, platform = _a.platform, params = _a.params;
    try {
        var opts = {
            body: { event_code: eventCode, params: params },
            json: true,
            method: 'POST',
            uri: SAKURA_URL,
        };
        if (platform) {
            opts['x-platform'] = platform;
        }
        xhr(opts, function (err) {
            if (err) {
                /* tslint:disable:no-empty */
            }
        });
    }
    catch (err) {
        /* tslint:disable:no-empty */
    }
});
