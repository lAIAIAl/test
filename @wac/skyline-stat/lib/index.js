"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:interface-name */
var qs = require("query-string");
var loadScript = require("load-script");
var objAssign = require("object-assign");
var includes = require("array-includes");
var Cookie = require("js-cookie");
var md5 = require("md5");
var pathToRegexp = require("path-to-regexp");
var es6_promise_1 = require("es6-promise");
var history_1 = require("history");
var messenger_1 = require("@wac/messenger");
var skyline_core_1 = require("@wac/skyline-core");
var visual_suite_1 = require("@wac/visual-suite");
var util_1 = require("@wac/skyline-core/lib/util");
var visual_config_parser_1 = require("@wac/skyline-core/lib/visual-config-parser");
var history = history_1.createBrowserHistory();
var SkylineUserCenter = /** @class */ (function (_super) {
    __extends(SkylineUserCenter, _super);
    function SkylineUserCenter() {
        var _this = _super.call(this) || this;
        _this.promise = null;
        _this.appName = '';
        _this.sourceChannelStandard = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
        _this.interceptEnabled = false;
        _this.currentLocation = void 0;
        _this.eventCancelObject = void 0;
        _this.promise = _this.requestCookie();
        return _this;
    }
    SkylineUserCenter.prototype.init = function (opts) {
        var _this = this;
        this.appName = opts.appName;
        var sourceChannel = opts.sourceChannel;
        var serverUrl = opts.serverUrl, environment = opts.environment, isSPA = opts.isSPA;
        var projectName = opts.projectName;
        if (environment !== 'production') {
            projectName = 'skyline';
        }
        var realServerUrl = util_1.getServerUrl({ serverUrl: serverUrl, environment: environment, projectName: projectName });
        var defaultOpts = {
            environment: 'test',
            enableQALogging: false,
            _setCustomVar: {},
            showLog: false,
            sendType: 'image',
        };
        if (opts.enableBridge === false) {
            this.promise = this.promise.then(function () {
                return _super.prototype.loadSa.call(_this, __assign({}, defaultOpts, opts, { serverUrl: realServerUrl, trackPageParams: {
                        params: _this.getUtm(sourceChannel),
                    } }));
            });
        }
        else {
            this.promise = this.initWithBridge(defaultOpts, opts, realServerUrl, sourceChannel);
        }
        if (opts.enableVisualTracking) {
            var interceptor_1 = new visual_suite_1.Interceptor();
            // 后台编辑模式，初始化与 sakura 后台联动相关
            if (util_1.isEditMode()) {
                var communicationOrigin_1 = environment === 'production'
                    ? 'http://mario.wacai.info'
                    : 'http://mario-node.mario.k2.test.wacai.info';
                if (opts.debugVisualTracking && opts.debugTargetOrigin) {
                    communicationOrigin_1 = opts.debugTargetOrigin;
                }
                var messenger_2 = new messenger_1.Messenger(window.parent, communicationOrigin_1, opts.debugSourceOrigin);
                // 将页面地址信息发送至 mario 后台
                var _a = window.location, hash = _a.hash, host = _a.host, hostname = _a.hostname, href = _a.href, origin_1 = _a.origin, pathname = _a.pathname, port = _a.port, protocol = _a.protocol, search = _a.search;
                var customLocation = {
                    hash: hash,
                    host: host,
                    hostname: hostname,
                    href: href,
                    origin: origin_1,
                    pathname: pathname,
                    port: port,
                    protocol: protocol,
                    search: search
                };
                messenger_2.send({ type: 'current-location', data: customLocation });
                window.addEventListener('message', function (evt) {
                    // 处理 sakura 后台传递过来的操作信息，比如 高亮埋点元素之类的
                    if (evt.origin !== communicationOrigin_1) {
                        return;
                    }
                    var originalData = evt.data;
                    // 消息来自于 可视化埋点
                    if (originalData.needDeserialization !== undefined) {
                        if (originalData.needDeserialization) {
                            originalData = JSON.parse(originalData.data);
                        }
                        else {
                            originalData = originalData.data;
                        }
                        var type = originalData.type, selectors = originalData.selectors, location_1 = originalData.location;
                        switch (originalData.type) {
                            case 'consititute':
                                _this.constituteElement(selectors, interceptor_1);
                                break;
                            case 'highlight':
                                _this.highlightElement(selectors, interceptor_1);
                                break;
                            case 'cancel-highlight':
                                _this.cancelHighlightElement();
                                break;
                            case 'sync-location':
                                _this.syncLocation(location_1, messenger_2, interceptor_1);
                                break;
                            default:
                                break;
                        }
                    }
                });
                this.interceptPageEventIfMatching(messenger_2, interceptor_1);
            }
            else {
                // 上报模式，解析配置上报埋点
                var parsedVisualConfig = visual_config_parser_1.getParsedVisualConfig();
                var pathnameRegexpList = Object.keys(parsedVisualConfig);
                var currentPathname = '';
                // tslint:disable-next-line
                for (var i = 0, regexp = void 0; (regexp = pathnameRegexpList[i]); i++) {
                    if (pathToRegexp(regexp).exec(location.pathname)) {
                        currentPathname = regexp;
                    }
                }
                // TODO SPA 应用的支持
                var canContinue = Boolean(currentPathname);
                if (canContinue) {
                    var eventTypeKeyConfig_1 = parsedVisualConfig[currentPathname];
                    Object.keys(eventTypeKeyConfig_1).forEach(function (eventName) {
                        // 页面加载类事件不需要绑定监听函数。因为 js 文件加载执行到此刻，即代表页面加载完成
                        // 此时，直接获取 页面加载事件并发送之
                        if (eventName === 'load') {
                            // 页面加载类 事件结构固定为 { load: { html: [] } }
                            var pageLoadEvents = eventTypeKeyConfig_1.load.html;
                            // 暂不支持发送属性
                            pageLoadEvents.forEach(function (_a) {
                                var code = _a.code, enableVisualTracking = _a.enableVisualTracking;
                                if (enableVisualTracking) {
                                    _this.send(code);
                                }
                            });
                        }
                        else {
                            var selectorConfigMap_1 = eventTypeKeyConfig_1[eventName];
                            var selectors = Object.keys(selectorConfigMap_1);
                            // tslint:disable-next-line
                            visual_suite_1.delegate([document], selectors, eventName, function (evt) {
                                var selector = evt.selector;
                                if (selector) {
                                    selectorConfigMap_1[selector].forEach(function (_a) {
                                        var code = _a.code, enableVisualTracking = _a.enableVisualTracking;
                                        // 埋点事件粒度上控制是否允许可视化埋点框架发送埋点事件
                                        if (enableVisualTracking) {
                                            _this.send(code);
                                        }
                                    });
                                }
                            }, true);
                        }
                    });
                }
            }
        }
        return this.promise;
    };
    SkylineUserCenter.prototype.send = function (eventName, params) {
        var _this = this;
        return this.promise.then(function () {
            var customParams = objAssign({}, _this.getSklParams(), params);
            var compositedParams = _super.prototype.track.call(_this, eventName, customParams);
            _super.prototype.triggerQALogger.call(_this, eventName, { params: compositedParams });
            // 埋点验证
            _super.prototype.checkStat.call(_this, eventName, { params: compositedParams });
        });
    };
    SkylineUserCenter.prototype.trackSinglePage = function (params) {
        var _this = this;
        return this.promise.then(function () {
            var compositeParams = objAssign({}, _this.getUtm(_this.sourceChannelStandard), _this.getSklParams(), params);
            _super.prototype.trackSinglePage.call(_this, compositeParams);
        });
    };
    SkylineUserCenter.prototype.registerCheckStatHook = function (fn) {
        _super.prototype.registerCheckStatHook.call(this, fn);
    };
    SkylineUserCenter.prototype.initWithBridge = function (defaultOpts, opts, serverUrl, sourceChannel) {
        var _this = this;
        return this.promise.then(function () {
            var bridge = window.WebViewJavascriptBridge;
            var jsBridgeHandler = function () {
                document.removeEventListener('WebViewJavascriptBridgeReady', jsBridgeHandler);
                /* tslint:disable:no-shadowed-variable */
                if (bridge && bridge.getSkylineConfig) {
                    return _this.getNativeConfig(opts).then(function (opts) {
                        return _super.prototype.loadSa.call(_this, __assign({}, defaultOpts, { serverUrl: serverUrl }, opts, { trackPageParams: {
                                params: _this.getUtm(sourceChannel),
                            } }));
                    });
                }
                return _super.prototype.loadSa.call(_this, __assign({}, defaultOpts, { serverUrl: serverUrl }, opts, { trackPageParams: {
                        params: _this.getUtm(sourceChannel),
                    } }));
            };
            if (!util_1.isWacai()) {
                return _super.prototype.loadSa.call(_this, __assign({}, defaultOpts, { serverUrl: serverUrl }, opts));
            }
            if (bridge) {
                if (bridge.getSkylineConfig) {
                    return _this.getNativeConfig(opts).then(function (opts) {
                        return _super.prototype.loadSa.call(_this, __assign({}, defaultOpts, { serverUrl: serverUrl }, opts, { trackPageParams: {
                                params: _this.getUtm(),
                            } }));
                    });
                }
            }
            else {
                return new es6_promise_1.Promise(function (resolve) {
                    document.addEventListener('WebViewJavascriptBridgeReady', function () { return resolve(jsBridgeHandler()); });
                });
            }
        });
    };
    SkylineUserCenter.prototype.constituteElement = function (selectors, interceptor) {
        selectors.forEach(function (selector) {
            window.document.querySelectorAll(selector).forEach(function (element) {
                interceptor.constitute(element, false);
            });
        });
    };
    SkylineUserCenter.prototype.syncLocation = function (customLocation, messenger, interceptor) {
        this.currentLocation = customLocation;
        // 收到 mario 后台的 location 消息时，尝试拦截页面事件
        if (!this.interceptEnabled) {
            this.interceptPageEventIfMatching(messenger, interceptor);
        }
    };
    SkylineUserCenter.prototype.highlightElement = function (selectors, interceptor) {
        this.eventCancelObject = interceptor.highlight(selectors);
    };
    SkylineUserCenter.prototype.cancelHighlightElement = function () {
        if (this.eventCancelObject) {
            this.eventCancelObject.cancel();
        }
    };
    SkylineUserCenter.prototype.requestCookie = function () {
        var query = util_1.parse();
        if (!query.a_f) {
            return es6_promise_1.Promise.resolve();
        }
        query._ = Math.random();
        var url = "//blackhole.wacai.com/intercept_af_data.html?" + qs.stringify(query);
        return new es6_promise_1.Promise(function (resolve) {
            loadScript(url, function (err, script) {
                resolve();
                script.parentNode.removeChild(script);
            });
            setTimeout(resolve, 1000);
        });
    };
    SkylineUserCenter.prototype.getNativeConfig = function (opts) {
        return window.WebViewJavascriptBridge.getSkylineConfig().then(function (info) {
            var serverUrl = opts.serverUrl, appName = opts.appName, enableQALogging = opts.enableQALogging;
            var serverURL = info.serverURL, environment = info.environment, projectName = info.projectName;
            var realProjectName = projectName;
            if (environment !== 'production') {
                realProjectName = 'skyline';
            }
            opts.serverUrl =
                util_1.getServerUrl({
                    serverUrl: serverURL,
                    environment: environment,
                    projectName: realProjectName,
                }) || serverUrl;
            opts.appName = info.appName || appName;
            opts.enableQALogging = info.isDebugMode ? true : enableQALogging;
            return opts;
        });
    };
    SkylineUserCenter.prototype.getCustomParams = function () {
        var query = util_1.parse();
        var ua = navigator.userAgent;
        var uid = Cookie.get('uid') || '';
        var token = Cookie.get('wtck') || Cookie.get('access_token') || Cookie.get('token') || Cookie.get('X-Access-Token');
        var af = Cookie.get('a_f') || query.a_f || '';
        var mc = /mc\/([\S]*)/i.test(ua) ? RegExp.$1 : query.mc || '';
        var version = /wacai\/([\S]*)/i.test(ua) ? RegExp.$1 : query.version || '';
        var platform = /platform\/([\S]*)/i.test(ua) ? +RegExp.$1 : query.platform || -1;
        var sessionId = Cookie.get('session_id') || '';
        var versionReg = version.match(/(\d+\.){2}\d+/);
        return {
            uid: uid,
            token: token ? md5(token) : '',
            unencryptedToken: token || '',
            af: af,
            mc: mc,
            version: versionReg ? versionReg[0] : version,
            platform: platform,
            sessionId: sessionId,
        };
    };
    SkylineUserCenter.prototype.getSklParams = function () {
        var _a = this.getCustomParams(), uid = _a.uid, token = _a.token, unencryptedToken = _a.unencryptedToken, af = _a.af, mc = _a.mc, version = _a.version, platform = _a.platform, sessionId = _a.sessionId;
        return {
            skl_device_id: '',
            skl_login_id: uid,
            skl_wax_app: '',
            skl_wax_sdk: '',
            skl_session_id: sessionId,
            skl_trace_id: '',
            skl_ab_id: '',
            skl_gray_id: '',
            skl_app_name: this.appName,
            skl_mc: mc,
            skl_platform: platform.toString(),
            skl_version: version,
            skl_a_f: af,
            skl_token: token,
            skl_raw_token: unencryptedToken,
        };
    };
    SkylineUserCenter.prototype.enableInterceptor = function (messenger, interceptor) {
        var pathname = window.location.pathname;
        this.interceptEnabled = true;
        // 页面匹配后，发消息通知 mario 后台。以便做后续交互逻辑
        messenger.send({
            type: 'response',
            data: {
                action: 'consititute',
                result: 'success'
            }
        });
        interceptor.constituteAuto(false, function (element, constituted) {
            var elementFeature = util_1.extract(element);
            if (constituted) {
                elementFeature.pathname = pathname;
                var message = { type: 'consititute', data: elementFeature };
                message.data = elementFeature;
                messenger.send(message);
            }
        });
    };
    SkylineUserCenter.prototype.interceptPageEventIfMatching = function (messenger, interceptor) {
        var _this = this;
        if (this.currentLocation) {
            var pathRegexp_1 = this.currentLocation.regexp;
            var match = pathToRegexp(pathRegexp_1).exec(location.pathname);
            if (match) {
                this.enableInterceptor(messenger, interceptor);
                return;
            }
            history.listen(function (location, action) {
                var changedMatch = pathToRegexp(pathRegexp_1).exec(location.pathname);
                if (changedMatch) {
                    _this.enableInterceptor(messenger, interceptor);
                }
            });
        }
    };
    SkylineUserCenter.prototype.getUtm = function (sourceChannel) {
        var campaignKeywords = this.sourceChannelStandard;
        var utms = {};
        if (sourceChannel instanceof Array && sourceChannel.length > 0) {
            campaignKeywords = campaignKeywords.concat(sourceChannel);
        }
        var queryParams = qs.parse(location.search.slice(1));
        campaignKeywords.forEach(function (val) {
            if (queryParams[val]) {
                utms[val] = queryParams[val];
            }
        });
        var $utms = {};
        for (var i in utms) {
            if (includes(this.sourceChannelStandard, i)) {
                $utms['$' + i] = utms[i];
            }
            else {
                $utms[i] = utms[i];
            }
        }
        return $utms;
    };
    return SkylineUserCenter;
}(skyline_core_1.default));
var instance = new SkylineUserCenter();
/* tslint:disable:variable-name */
exports.__stat__ = instance;
exports.default = instance;
module.exports = {
    __stat__: instance,
    init: instance.init.bind(instance),
    send: instance.send.bind(instance),
    trackSinglePage: instance.trackSinglePage.bind(instance)
};
