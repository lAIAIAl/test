function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const RemoteRequest = require('./remote-request');
const Disk = require('./disk');
const Util = require('./util');

class Module {
  constructor(mainModule, subModule, cache, harmony, diskPath) {
    this.mainModule = mainModule;
    this.subModule = subModule;
    this.cache = cache;
    this.diskPath = diskPath;
    this.harmony = harmony;
  }

  /**
   * 获取当前主、子模块下的所有配置
   * 读取顺序：内存 > 网络 > disk
   * @return {}
   */
  getConfig() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let config = {};
      // 从内存取
      config = _this.cache.get(_this.mainModule, _this.subModule);

      // 内存没有，从网络取
      if (!config) {
        const res = yield RemoteRequest.getConfig({
          mainModule: _this.mainModule,
          subModule: _this.subModule,
          harmony: _this.harmony
        });
        if (res && res.code === 0 && res.data) {
          config = res.data;
          // 更新内存
          _this.cache.set(_this.mainModule, _this.subModule, res.data);
          // 写disk
          Util.saveDisk({
            mainModule: _this.mainModule,
            subModule: _this.subModule,
            diskPath: _this.diskPath
          }, res.data);
        } else {
          // 网络读取失败，从disk取
          config = yield Disk.readConfig({
            mainModule: _this.mainModule,
            subModule: _this.subModule,
            diskPath: _this.diskPath
          }).then(function (data) {
            return data || {};
          }).catch(function () {
            return {};
          });
        }
      }
      return config;
    })();
  }

  /**
   * 根据key获取当前主、子模块下的配置
   * 读取顺序：内存 > 网络 > disk
   * @param {string} key
   * @return {}
   */
  getConfigByKey(key = '') {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!key) return {};

      let config = {};
      // 从内存取
      config = _this2.cache.getByKey(_this2.mainModule, _this2.subModule, key);

      // 内存没有，从网络取
      if (!config) {
        const res = yield RemoteRequest.getConfigByKey({
          mainModule: _this2.mainModule,
          subModule: _this2.subModule,
          harmony: _this2.harmony
        }, key);
        if (res && res.code === 0 && res.data && res.data.value) {
          // 和全量返回的数据格式不一样，需要转为json string
          config = typeof res.data.value !== 'string' ? JSON.stringify(res.data.value) : res.data.value;
          // 更新内存
          _this2.cache.setByKey(_this2.mainModule, _this2.subModule, key, config);
          // 写disk
          Util.saveDisk({
            mainModule: _this2.mainModule,
            subModule: _this2.subModule,
            diskPath: _this2.diskPath
          }, _this2.cache.get(_this2.mainModule, _this2.subModule));
        } else {
          // 网络读取失败，从disk取
          const data = yield Disk.readConfig({
            mainModule: _this2.mainModule,
            subModule: _this2.subModule,
            diskPath: _this2.diskPath
          }).then(function (data) {
            return data || {};
          }).catch(function () {
            return {};
          });
          config = data[key.toUpperCase()];
        }
      }
      return config;
    })();
  }

  /**
   * 添加模块配置
   * @param {string} key
   * @param {string} value: 会转为json string
   * @return {} 接口请求返回的数据
   */
  add(key = '', value = '') {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      return _this3.handleConfigByType(key, value, 'add');
    })();
  }

  /**
   * 修改模块配置
   * @param {string} key
   * @param {string} value: 会转为json string
   * @return {} 接口请求返回的数据
   */
  update(key = '', value = '') {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      return _this4.handleConfigByType(key, value, 'update');
    })();
  }

  handleConfigByType(key = '', value = '', type = '') {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!key || !value) {
        return { code: 1, error: '参数错误' };
      }
      // 格式要求json string
      const stringValue = JSON.stringify(value);
      const res = yield RemoteRequest.handleConfigByType(_this5.mainModule, _this5.subModule, _this5.harmony, key, stringValue, type);
      if (res && res.code === 0) {
        // 更新内存
        _this5.cache.setByKey(_this5.mainModule, _this5.subModule, key.toUpperCase(), stringValue);
        // 写disk
        Util.saveDisk({
          mainModule: _this5.mainModule,
          subModule: _this5.subModule,
          diskPath: _this5.diskPath
        }, _this5.cache.get(_this5.mainModule, _this5.subModule));
      }
      return res;
    })();
  }
}

module.exports = Module;