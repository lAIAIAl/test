"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var xhr = require("xhr");
var StatChecker = /** @class */ (function () {
    function StatChecker() {
        this.hook = function (requestParams, p) { return undefined; };
    }
    StatChecker.prototype.registerCheckStatHook = function (fn) {
        if (!fn) {
            throw new Error('params "fn" is required!');
        }
        if (typeof fn !== 'function') {
            throw new Error('params "fn" must be a function');
        }
        this.hook = fn;
    };
    StatChecker.prototype.check = function (_a) {
        var distinct_id = _a.distinct_id, eventCode = _a.eventCode, platform = _a.platform, params = _a.params;
        var requestParams = {
            distinct_id: distinct_id,
            event: eventCode,
            platform: platform,
            properties: params,
        };
        var p = new es6_promise_1.Promise(function (resolve, reject) {
            xhr({
                method: 'POST',
                url: 'http://endofunctor.wacai.info/endofunctor/api/qa/v1/check/originEvent',
                body: JSON.stringify(requestParams),
                useXDR: true,
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                },
            }, function (err, resp) {
                if (err) {
                    return reject(err);
                }
                if (resp.statusCode !== 200) {
                    reject(resp);
                }
                else {
                    if (resp.body && resp.body.code === 0) {
                        resolve(resp.body.data);
                    }
                    else {
                        reject(resp.body.error);
                    }
                }
            });
        });
        if (this.hook) {
            this.hook(requestParams, p);
        }
    };
    return StatChecker;
}());
var statChecker = new StatChecker();
exports.default = statChecker;
