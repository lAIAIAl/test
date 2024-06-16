"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:interface-name */
var util_1 = require("./util");
var es6_promise_1 = require("es6-promise");
var logger_1 = require("./logger");
var check_1 = require("./check");
var includes = require("array-includes");
var objAssign = require("object-assign");
var sa = require("sa-sdk-javascript");
var EVENT_TYPE;
(function (EVENT_TYPE) {
    EVENT_TYPE["Page"] = "page";
    EVENT_TYPE["Event"] = "event";
})(EVENT_TYPE || (EVENT_TYPE = {}));
var PAGE_STATE;
(function (PAGE_STATE) {
    PAGE_STATE["Enter"] = "enter";
})(PAGE_STATE || (PAGE_STATE = {}));
var SkylineCore = /** @class */ (function () {
    function SkylineCore() {
        this.enableQALogging = false;
        this.commonParams = {};
        this.sourceChannel = [];
    }
    SkylineCore.prototype.loadSa = function (opts) {
        var serverUrl = opts.serverUrl, _a = opts.enableQALogging, enableQALogging = _a === void 0 ? false : _a, _b = opts._setCustomVar, _setCustomVar = _b === void 0 ? {} : _b, _c = opts.sourceChannel, sourceChannel = _c === void 0 ? [] : _c, _d = opts.trackPageParams, trackPageParams = _d === void 0 ? {} : _d;
        if (!serverUrl) {
            return es6_promise_1.Promise.reject(new Error('environment 和 projectName 必填，详见使用文档'));
        }
        this.enableQALogging = enableQALogging;
        var initConfig = {};
        var saInitConfig = [
            'serverUrl',
            'crossSubdomain',
            'showLog',
            'debugMode',
            'debugModeUpload',
            'useClientTime',
            'sourceChannel',
            'sendType',
        ];
        for (var i in opts) {
            if (includes(saInitConfig, i) && opts[i] !== undefined) {
                var initName = i.replace(/([A-Z])/g, '_$1').toLowerCase();
                initConfig[initName] = opts[i];
            }
        }
        this.sourceChannel = sourceChannel;
        sa.init(objAssign({}, {
            show_log: false,
        }, initConfig));
        this.commonParams = objAssign({}, _setCustomVar);
        // 设置公共属性
        sa.registerPage(this.commonParams);
        // 触发页面进入事件
        this.trackPage(trackPageParams.ref, trackPageParams.params);
        return es6_promise_1.Promise.resolve();
    };
    // 事件埋点接口
    SkylineCore.prototype.track = function (eventName, customParams) {
        var params = objAssign({}, {
            $title: document.title,
            $url: location.href,
            $url_path: location.pathname,
        }, customParams);
        sa.track(eventName, params);
        return params;
    };
    // 单页页面埋点接口
    SkylineCore.prototype.trackSinglePage = function (params) {
        this.trackPage(location.href, params);
    };
    // 页面埋点接口
    SkylineCore.prototype.trackPage = function (ref, params) {
        var referrer = util_1.getReferrer(ref);
        var customParams = objAssign({}, {
            $referrer: referrer,
            $referrer_host: referrer.replace(/^(.*\/\/[^/?#]*).*$/, '$1').replace(/http[s]?:\/\//, '') || '',
            $title: document.title,
            $url: location.href,
            $url_path: location.pathname,
        }, params);
        sa.track('$pageview', customParams);
        this.triggerQALogger('page', { params: customParams });
    };
    SkylineCore.prototype.triggerQALogger = function (eventName, config) {
        if (!this.enableQALogging) {
            return;
        }
        var params = config && config.params ? config.params : {};
        var opts = config && config.opts;
        logger_1.default(this.createParams(eventName, params, opts));
    };
    SkylineCore.prototype.registerCheckStatHook = function (fn) {
        check_1.default.registerCheckStatHook(fn);
    };
    SkylineCore.prototype.checkStat = function (eventName, config) {
        if (this.enableQALogging === true) {
            var params = config && config.params ? config.params : {};
            var opts = config && config.opts;
            var _a = objAssign({}, {
                eventName: eventName,
                params: objAssign({}, this.commonParams, params),
                opts: opts
            }), distinct_id = _a.distinct_id, platform = _a.platform, compositedParams = _a.params;
            check_1.default.check({ distinct_id: distinct_id, platform: platform, eventCode: eventName, params: compositedParams });
        }
    };
    SkylineCore.prototype.createParams = function (eventName, params, opts) {
        var eventCode = eventName;
        var extraObj = {
            event_type: params.event_type || EVENT_TYPE.Event,
        };
        if (eventName === 'page') {
            eventCode = document.title;
            extraObj.event_type = EVENT_TYPE.Page;
            extraObj.page_state = PAGE_STATE.Enter;
        }
        return objAssign({}, {
            eventCode: eventCode,
            params: objAssign({}, this.commonParams, params, extraObj),
            opts: opts,
        });
    };
    SkylineCore.sa = sa;
    return SkylineCore;
}());
exports.default = SkylineCore;
