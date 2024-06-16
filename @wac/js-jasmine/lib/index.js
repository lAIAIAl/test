function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Looper = require('./looper');
const Disk = require('./disk');
const Harmony = require('@wac/js-harmony');

const Base = require('sdk-base');
const Cache = require('./cache');
const Module = require('./module');

class JasmineClient extends Base {
  constructor(opts = {}) {
    super({
      initMethod: 'init'
    });
    this.opts = opts;
    // 内存
    this.cache = null;
    this.harmony = null;
  }

  init() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.cache = new Cache();

      const defaultOptions = {
        diskPath: '' // 项目根目录下（默认，可在初始化时设置）./jasmine/module/subModule/config.json
      };

      _this.opts = Object.assign({}, defaultOptions, _this.opts);

      // 初始化harmony
      _this.harmony = new Harmony({ env: _this.opts.env, unit: _this.opts.unit });

      // 内存没有，从disk文件读取到内存
      if (JSON.stringify(_this.cache.data) === '{}') {
        Disk.readFileConfigToCache(_this.cache, _this.opts.diskPath);
      }

      // 轮询
      const looper = new Looper(_this.cache, _this.harmony, _this.opts.diskPath);
      looper.start();

      _this.harmony.on('ready', function () {
        _this.emit('ready');
      });
    })();
  }

  /**
   * 获取模块类实例
   * @param {string} mainModule: 主模块
   * @param {string} subModule：子模块
   * @param {cache} cache实例
   * @param {harmony} harmony实例
   * @param {string} diskPath：存储路径
   * @return Module实例
   */
  getModule(mainModule = '', subModule = '') {
    return new Module(mainModule, subModule, this.cache, this.harmony, this.opts.diskPath);
  }

  /**
   * 删除jasmine配置文件
   */
  deleteFile() {
    Disk.deleteAllConfig(this.opts.diskPath);
  }
}

module.exports = JasmineClient;