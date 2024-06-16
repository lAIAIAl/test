const Looper = require('./looper');
const Util = require('./util');
const RemoteRequest = require('./remote-request');

module.exports = {
  init: function init(opts = {}) {
    const defaultOptions = {
      env: 'production', // 环境，挖财已有的环境包括：test, production, staging
      unit: 'default', // unit:  表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的jasmine服务器地址
      crossUnit: 2 // 默认为2。需要跨单元的场景只需要在查询时加上crossUnit参数 1:支持跨单元 2:不支持；跨单元指的是,在本单元没有可服务的节点时,流量路由到中心单元
    };

    const options = Object.assign({}, defaultOptions, opts);

    Util.setHarmonyConfig(options);
    const looper = new Looper();
    looper.start();
  },

  /**
   * 获取domain对应的Harmony服务的IP+port
   * @param {*} domain
   * @return { "host": "172.16.107.104", "port": 8080}
   */
  getServer: function getServer(domain = '') {
    return RemoteRequest.getRandomDomainIP(domain);
  },

  /**
   * 直接获取接口数据
   * @param {} options: {
      method: '',
      url: '',
      qs: {}
    }
   * @return {请求options.url返回的数据格式}
   */
  getData: function getData(options = {}) {
    return RemoteRequest.getDataWithUrl(options);
  }
};