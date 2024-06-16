function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Util = require('./util');

module.exports = class RemoteRequest {
  /**
   * 查询domain对应的harmony接口
   * @param {*} opts
   */
  static getDomainServerIPList(opts = {}) {
    const harmonyIP = Util.getHarmonyIP();

    if (!harmonyIP) {
      return null;
    }

    const qs = {
      unit: opts.unit,
      env: opts.env,
      crossUnit: opts.crossUnit,
      domain: opts.domain
    };

    return Util.fetch({
      url: `${harmonyIP}/harmony/v1/api/filterRealNodes`,
      qs
    });
  }

  /**
   * 获取服务的IP
   */
  static getHarmonyServerIPList() {
    return Util.fetch({
      url: 'http://api.cell.wacai.info/harmony/getServerList'
    });
  }

  /**
   * 随机获取一个domain对应的Harmony服务的IP
   * @return { "host": "172.16.107.104", "port": 8080}
   */
  static getRandomDomainIP(domain = '') {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!domain) {
        return {};
      }
      const options = Object.assign({}, Util.getHarmonyConfig(), {
        domain
      });
      const res = yield _this.getDomainServerIPList(options);

      if (res && res.code === 0 && res.data && res.data.length) {
        const data = Util.descendSortByWeight(res.data);
        return Util.randomValueWithArray(data);
      }
      return {};
    })();
  }

  /**
   * 获取url对应的data
   * @return {}
   */
  static getDataWithUrl(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!options.url) {
        return {};
      }
      // 取url的domain
      const domain = Util.getDomain(options.url);
      // 取domain对应的Harmony地址
      const serverIP = yield _this2.getRandomDomainIP(domain);
      // 组装成新的api发送请求
      const url = options.url.replace('http://', '').replace('https://', '');
      const path = url.replace(domain, '');
      const newUrl = `http://${serverIP.host}:${serverIP.port}${path}`;
      const opts = Object.assign(options, { url: newUrl });
      return Util.fetch(opts);
    })();
  }
};