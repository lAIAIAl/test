function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Util = require('.//util');

module.exports = class RemoteRequest {
  /**
   * 查询模块下的所有配置，通过harmony获取jsamine的服务地址
   * @param {module} moduleClass:当前查询module
   * @return {} 接口返回数据
   */
  static getConfig(moduleClass) {
    return _asyncToGenerator(function* () {
      if (!moduleClass || !moduleClass.mainModule || !moduleClass.subModule) {
        return {};
      }

      const data = yield moduleClass.harmony.getData({
        url: 'http://jasmineserver.wacai.info/jasmine/getAllBySubModule',
        qs: {
          module: moduleClass.mainModule,
          subModule: moduleClass.subModule
        }
      });
      return data || {};
    })();
  }

  /**
   * 查询模块下该key的配置，通过harmony获取jsamine的服务地址
   * @param {module} moduleClass:当前查询module
   * @param {string} key:要查询的key
   * @return {} 接口返回数据
   */
  static getConfigByKey(moduleClass, key) {
    return _asyncToGenerator(function* () {
      if (!moduleClass || !moduleClass.mainModule || !moduleClass.subModule || !key) {
        return {};
      }

      const data = yield moduleClass.harmony.getData({
        url: 'http://jasmineserver.wacai.info/jasmine/getConfig',
        qs: {
          module: moduleClass.mainModule,
          subModule: moduleClass.subModule,
          key: key
        }
      });
      return data || {};
    })();
  }

  /**
   * 探测keys是否发生变化
   * @param {string} 组装好的Probe请求参数
   * @param {} harmony
   * @return {} 接口返回数据
   */
  static getProbeConfig(probeString = '', harmony) {
    return _asyncToGenerator(function* () {
      if (!probeString) {
        return {};
      }
      const data = yield harmony.getData({
        url: 'http://jasmineserver.wacai.info/jasmine/probeConfig',
        method: 'POST',
        form: {
          probe_modify_request: probeString
        }
      });
      return data || {};
    })();
  }

  /**
   * 添加、修改配置
   * api文档：http://git.caimi-inc.com/wac-base/jasmine/wikis/http-api
   * @param {} moduleClass
   * @param {} harmony
   * @param {string} key
   * @param {json string} value
   * @return {} 接口返回数据
   */

  static handleConfigByType(mainModule, subModule, harmony, key, value, type) {
    return _asyncToGenerator(function* () {
      let url = '';
      if (type === 'add') {
        url = 'http://jasmineserver.wacai.info/jasmine/external/config/add';
      } else if (type === 'update') {
        url = 'http://jasmineserver.wacai.info/jasmine/external/config/update';
      }
      const dynamic = Util.getHeaderDynamic(mainModule, subModule, key);
      const data = yield harmony.getData({
        url: url,
        method: 'POST',
        form: {
          moduleCode: mainModule,
          subModuleCode: subModule,
          cfgKey: key,
          cfgValue: value,
          name: key,
          status: 1,
          handler: ''
        },
        headers: {
          'JASMINE-EXTERNAL-DYNAMIC-MD5': dynamic
        }
      });
      return data || {};
    })();
  }
};