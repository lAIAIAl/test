"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("query-string");
var maxReferrerStringLength = 200;
var internalClassList = ['c-vs-constitute', 'c-vs-highlight'];
function parse(querystring) {
    return qs.parse(querystring || window.location.search.slice(1));
}
exports.parse = parse;
function isWacai() {
    var ua = navigator.userAgent;
    return /wacai\/([\S]*)/i.test(ua);
}
exports.isWacai = isWacai;
function getServerUrl(_a) {
    var serverUrl = _a.serverUrl, environment = _a.environment, projectName = _a.projectName;
    var SA_SERVER_URL_HOST = 'moblog.wacai.com';
    var SA_SERVER_URL_PRODUCT = "https://" + SA_SERVER_URL_HOST + "/sensor/sa?project=" + projectName;
    var SA_SERVER_URL_TEST = "http://sensordata.staging.wacai.info/sensor/sa?project=" + projectName;
    if (environment) {
        if (environment === 'test') {
            return SA_SERVER_URL_TEST;
        }
        else if (environment === 'production') {
            return SA_SERVER_URL_PRODUCT;
        }
        else {
            return '';
        }
    }
    if (serverUrl && serverUrl.indexOf(SA_SERVER_URL_HOST) > -1) {
        // 线上环境替换 protocol 为 https
        return serverUrl.replace(/^([a-z0-9.+-]+:)?/i, 'https:');
    }
    else {
        return serverUrl || '';
    }
}
exports.getServerUrl = getServerUrl;
function getReferrer(ref) {
    var referrer = ref || document.referrer;
    if (referrer.indexOf('https://www.baidu.com/') === 0) {
        referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, maxReferrerStringLength);
    return referrer;
}
exports.getReferrer = getReferrer;
exports.isEditMode = function () {
    var runtime = parse().runtime;
    var storage = window.sessionStorage;
    if (storage) {
        var storedRuntime = storage.getItem('__visual_runtime__');
        if (storedRuntime) {
            return storedRuntime === 'visual_simulator';
        }
        else {
            storage.setItem('__visual_runtime__', runtime);
        }
    }
    return runtime === 'visual_simulator';
};
exports.extract = function (element) {
    var tagName = element.tagName, className = element.className, id = element.id;
    var result = {
        selector: '',
        tagName: tagName
    };
    if (id) {
        result.selector = "#" + id;
    }
    else if (className) {
        // 剔除可视化埋点工具注入的样式
        var filteredClassName = className.split(' ').filter(function (clsName) {
            return internalClassList.indexOf(clsName) === -1;
        });
        var ret = filteredClassName.join('.');
        result.selector = ret ? "." + ret : ret;
    }
    return result;
};
