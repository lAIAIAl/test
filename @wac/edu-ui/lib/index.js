"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pay = _interopRequireDefault(require("./pay"));

var _personalInfo = _interopRequireDefault(require("./personal-info"));

var _videoPlayer = _interopRequireDefault(require("./video-player"));

var _default = {
  Pay: _pay.default,
  PersonalInfo: _personalInfo.default,
  VideoPlayer: _videoPlayer.default
};
exports.default = _default;