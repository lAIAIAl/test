"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.promise.js");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _v = _interopRequireDefault(require("uuid/v4"));

var Queue = function Queue() {
  var _this = this;

  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2.default)(this, Queue);
  (0, _defineProperty2.default)(this, "dispatch", function (job) {
    _this.jobs.push(job);

    if (_this.jobs.length === 1 && !_this.handling) {
      _this.event.emit("finish_".concat(_this.eventName));
    }
  });
  (0, _defineProperty2.default)(this, "handleJob", function () {
    var handle = _this.props.handle;
    var jobs = _this.jobs;
    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) return;

    var job = _this.jobs.shift();

    _this.handling = true;
    Promise.resolve(handle(job)).then(function () {
      _this.handling = false;

      _this.event.emit("finish_".concat(_this.eventName));
    });
  });
  var _handle = props.handle;

  if (!_handle || typeof _handle !== 'function') {
    throw new Error('需要有handle处理函数');
  }

  this.props = props;
  this.jobs = [];
  this.eventName = (0, _v.default)();
  this.event = new _eventemitter.default();
  this.event.on("finish_".concat(this.eventName), this.handleJob);
};

exports.default = Queue;