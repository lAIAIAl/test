const crypto = require('crypto');
const Disk = require('./disk');

module.exports = class Util {
  /**
   * 组装Probe的请求参数
   * module+submodule+key+md5,module+submodule+key+md5
   * +是不可见字符(char)2
   * ,是不可见字符(char)1
   * 如：jasmine_demoquick_starttest7879bfa5d2bcc8edfbebd44e1215b081jasmine_demoquick_startinner_testd860abafd75be5b91c40fb335c355de4 
   */
  static getProbeString(cache) {
    let probeString = '';
    // 读取内存的数据
    const config = cache.data;

    config && Object.keys(config).forEach(function (mainKey) {
      // 遍历主模块下的数据
      const mainModule = config[mainKey];
      Object.keys(mainModule).forEach(function (subKey) {
        // 遍历子模块下的数据
        const subModule = mainModule[subKey];
        Object.keys(subModule).forEach(function (key) {
          // 组装接口要求的数据 
          probeString = (probeString ? probeString + String.fromCharCode(1) : '') + mainKey + String.fromCharCode(2) + subKey + String.fromCharCode(2) + key.toLowerCase() + String.fromCharCode(2) + Util.md5(subModule[key]);
        });
      });
    });
    return probeString;
  }

  /**
   * 组装add、edit配置需要的header：JASMINE-EXTERNAL-DYNAMIC-MD5
   */
  static getHeaderDynamic(mainModule, subModule, key) {
    if (!mainModule || !subModule || !key) {
      return '';
    }
    return Util.md5(`${mainModule}-${subModule}-${key}loveyangping`);
  }

  /**
   * 保存文件
   */
  static saveDisk(moduleClass, value) {
    Disk.writeConfig(moduleClass, value);
  }

  /**
   * md5加密
   */
  static md5(value) {
    let md5 = crypto.createHash('md5');
    md5.update(value);
    return md5.digest('hex');
  }

  static log(message) {
    // console.log(message)
  }
};