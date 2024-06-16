"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedVisualConfig = function () {
    var parsedSkylineVisualConfig = {};
    var rawVisualConfig = window.__SKYLINE_VISUAL_CONFIG__;
    if (rawVisualConfig) {
        var pathnames = Object.keys(rawVisualConfig);
        pathnames.forEach(function (pathname) {
            if (parsedSkylineVisualConfig[pathname] === undefined && rawVisualConfig[pathname]) {
                parsedSkylineVisualConfig[pathname] = {};
            }
            rawVisualConfig[pathname].forEach(function (_a) {
                var dispatchEventName = _a.dispatchEventName, selector = _a.selector, config = _a.config;
                if (parsedSkylineVisualConfig[pathname][dispatchEventName] === undefined) {
                    parsedSkylineVisualConfig[pathname][dispatchEventName] = {};
                }
                if (parsedSkylineVisualConfig[pathname][dispatchEventName][selector] === undefined) {
                    parsedSkylineVisualConfig[pathname][dispatchEventName][selector] = [];
                }
                parsedSkylineVisualConfig[pathname][dispatchEventName][selector].push(config);
            });
        });
    }
    return parsedSkylineVisualConfig;
};
