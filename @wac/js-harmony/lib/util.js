const request = require('request').forever();
const { promisify } = require('bluebird');
const cache = require('./cache');
const requestPromise = promisify(request);

module.exports = class Util {
  /**
   * 缓存Harmony基本配置：env、unit、crossUnit
   */
  static setHarmonyConfig(data) {
    cache.set('harmonyNodeConfig', data);
  }

  /**
   * 获取Harmony基本配置
   */
  static getHarmonyConfig() {
    return cache.get('harmonyNodeConfig');
  }

  /**
   * 缓存Harmony服务的IP list
   * @param {array} data
   */
  static setHarmonyIP(data) {
    cache.set('harmonyNodeServerIPList', data);
  }

  /**
   * 获取Harmony: IP+Port
   */
  static getHarmonyIP() {
    const harmonyServerIPList = cache.get('harmonyNodeServerIPList');

    if (harmonyServerIPList && harmonyServerIPList.length) {
      const first = harmonyServerIPList[0];
      return `http://${first.host}:${first.port}`;
    }

    return '';
  }

  /**
   * 根据url获取对应应用的domain
   * @param {string} url
   * @return {string}
   */
  static getDomain(url) {
    if (!url) {
      return '';
    }
    const noProtocolUrl = url.replace('http://', '').replace('https://', '');
    const arr = noProtocolUrl.split('/');
    return arr[0];
  }

  /**
   * 异步请求
   * @param {*} opts
   */
  static fetch(opts) {

    if (!opts) {
      return {};
    }

    const options = Object.assign({
      json: true,
      resolveWithFullResponse: true,
      method: 'GET',
      url: ''
    }, opts);

    delete options.url;

    const headers = {};
    headers['request-source'] = 'node';
    headers['longPullingTimeout'] = 40;
    options.headers = headers;

    return requestPromise(opts.url, options).then(response => {
      return response.body;
    }).catch(err => {
      // this.log(
      //   `<-- TIMESTAMP: ${new Date()}` +
      //     `\n   /${options.method} ${opts.url}` +
      //     `\n   GET.Data: ${JSON.stringify(options.qs || {})}` +
      //     `\n   POST.Data: ${JSON.stringify(options.form || {})}` +
      //     `\n   Headers: ${JSON.stringify(options.headers || {})}` +
      //     `\n--> error: ${err.toString()} \n`
      // )

      return {
        code: 1,
        error: err.toString()
      };
    });
  }

  static log(message) {}
  // console.log(message)


  /**
   * 降序排序
   * @param {array} data
   * @return {array}
   */
  static descendSortByWeight(data) {
    if (!data || !data.length) {
      return [];
    }

    data.filter(item => item.weight !== -1);

    return data.sort((a, b) => {
      return b.weight - a.weight;
    });
  }

  /**
   * 随机获取
   * @param {array} arr
   * @return {}
   */
  static randomValueWithArray(arr) {
    if (!arr || !arr.length) {
      return {};
    }
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
};