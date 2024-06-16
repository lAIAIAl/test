'use strict';
/* global IS_NODE: true */

/* global PACKAGE_VERSION: '1.0.0' */

const axios = require('./axios');

const Axios = axios.Axios;

Axios.prototype.init = function (config) {
  if (!config) {
    throw new Error('config is required');
  }

  const hakoneInstance = this;
  hakoneInstance.defaults = Object.assign(hakoneInstance.defaults, config); // NODE 层初始化

  {
    /* eslint-disable no-console */
    if (!config || typeof config !== 'object') {
      throw new Error('hakone.init(config) config must be an object');
    }

    const url = config.tracerService;

    if (url) {
      let serviceName = config.serviceName;

      if (!serviceName) {
        const projectDir = require('./core/findProjectDir')();

        if (projectDir) {
          const pkgJsonPath = `${projectDir}/package.json`; // 当前接入项目的package.json路径

          try {
            const pkgJson = require(pkgJsonPath); // package.json


            serviceName = pkgJson.name;
            console.warn(`hakone got [pkgJson.name=${pkgJson.name}] as \`config.serviceName\` from ${pkgJsonPath} automatically`);
          } catch (e) {
            console.error(`hakone failed to get [pkgJson.name] as \`config.serviceName\` from ${pkgJsonPath}`);
          }
        }
      }

      if (!serviceName) {
        throw new Error('hakone.init(config) `config.serviceName` is not provided');
      } // 初始化上报


      const tracerConfig = {
        url,
        clientId: serviceName,
        serviceName
      };

      const {
        requestInterceptor,
        responseInterceptor,
        rejectInterceptor
      } = require('./interceptor')(tracerConfig);

      hakoneInstance.interceptors.request.use(requestInterceptor, rejectInterceptor);
      hakoneInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);
    }
    /* eslint-enable no-console */

  }
};

const hakone = axios;
hakone.defaults.headers['User-Agent'] = `hakone/${"4.2.7"}`;
hakone.init = Axios.prototype.init.bind(hakone);
const axiosCreate = axios.create;

hakone.create = config => {
  const finalConfig = Object.assign({}, hakone.defaults, config);
  const newInstance = axiosCreate(finalConfig);
  newInstance.init(finalConfig);
  return newInstance;
};

module.exports = hakone;