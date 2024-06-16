function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 轮询HarmonyServer
 */
const remoteRequest = require('./remote-request');
const Util = require('./util');

// harmony的数据缓存
global.harmonyNodeCache = {};

module.exports = class Looper {
  constructor() {
    this.harmonyServerIPTimer = null;
  }

  /**
   * 启动轮询
   */
  start() {
    this.getHarmonyServerIPList();
  }

  /**
   * 轮询刷新harmony的IPList，间隔5分钟
   */
  getHarmonyServerIPList() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.harmonyServerIPTimer && clearTimeout(_this.harmonyServerIPTimer);
      _this.harmonyServerIPTimer = null;

      const res = yield remoteRequest.getHarmonyServerIPList();

      if (res && res.code === 0 && res.data && res.data.length) {
        const data = Util.descendSortByWeight(res.data);

        // 缓存
        Util.setHarmonyIP(data);
      } else {
        _this.harmonyServerIPTimer && clearTimeout(_this.harmonyServerIPTimer);
        _this.harmonyServerIPTimer = null;
        _this.getHarmonyServerIPList();
      }

      // 5分钟轮询
      _this.harmonyServerIPTimer = setTimeout(function () {
        _this.getHarmonyServerIPList();
      }, 5 * 60 * 1000);
    })();
  }
};