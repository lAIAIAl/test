function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 轮询jasmine配置
 */
const Util = require('./util');
const RemoteRequest = require('./remote-request');

module.exports = class Looper {
  constructor(cache, harmony, diskPath) {
    this.jasmineProbeTimer = null;
    this.cache = cache;
    this.diskPath = diskPath;
    this.harmony = harmony;
  }

  /**
   * 启动轮询
   */
  start() {
    this.probeConfig();
  }

  /**
   * 探测keys是否发生变化，间隔8秒
   */
  probeConfig() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.jasmineProbeTimer && clearTimeout(_this.jasmineProbeTimer);
      _this.jasmineProbeTimer = null;

      // Probe的请求参数
      const probeString = Util.getProbeString(_this.cache);

      const res = yield RemoteRequest.getProbeConfig(probeString, _this.harmony);
      if (res && res.code === 0 && res.data && res.data.length > 0) {
        // 拉取主、子模块全部配置
        for (let i = 0, len = res.data.length; i < len; i++) {
          const config = res.data[i];
          const params = {
            mainModule: config.module,
            subModule: config.subModule,
            harmony: _this.harmony,
            diskPath: _this.diskPath
            // 探测结果只有主、子模块和key，所以全量拉取更新下主、子模块的数据
          };const result = yield RemoteRequest.getConfig(params);
          if (result && result.code === 0 && result.data) {
            // 更新内存
            _this.cache.set(config.module, config.subModule, result.data);
            // 写disk
            Util.saveDisk(params, result.data);
          }
        }
      }
      // 轮询
      _this.jasmineProbeTimer = setTimeout(function () {
        _this.probeConfig();
      }, 8 * 1000);
    })();
  }
};