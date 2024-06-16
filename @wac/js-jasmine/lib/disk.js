function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs-extra');
const path = require('path');
const projectDir = path.join(__dirname, '../../../../');

// test使用
// const projectDir = path.join(__dirname, '../data/')

const configFileName = 'config.json';

module.exports = class Disk {
  /**
   * 存储的目录+jasmine
   * @param {module} moduleClass
   * @return {string} 
   */
  static getDirPath(moduleClass) {
    const dir = moduleClass && moduleClass.diskPath ? moduleClass.diskPath : projectDir;
    return path.join(dir, 'jasmine/');
  }

  /**
   * 存储的目录：getDirPath+主模块+子模块
   * @param {module} moduleClass
   * @return {string} 
   */
  static getFilePath(moduleClass) {
    return path.join(this.getDirPath(moduleClass), `${moduleClass.mainModule}/${moduleClass.subModule}/`);
  }

  /**
   * 根据主、子模块存储文件
   * @param {module} moduleClass
   * @param {object} data
   */
  static writeConfig(moduleClass, data) {
    this.write(this.getFilePath(moduleClass), configFileName, data);
  }

  /**
   * 根据主、子模块读取文件
   * @param {module} moduleClass
   * @return {}
   */
  static readConfig(moduleClass) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const res = yield _this.read(_this.getFilePath(moduleClass) + configFileName).then(function (data) {
        return data || {};
      }).catch(function () {
        return {};
      });
      return res;
    })();
  }

  /**
   * 写文件
   * @param {string} dir
   * @param {string} fileName
   * @param {object} data
   */
  static write(dir, fileName, data) {
    fs.ensureDir(dir, function (errDir) {
      const filePath = path.join(dir, fileName);
      if (!errDir) {
        fs.writeJSON(filePath, data, function (err) {
          if (err) {
            // console.log(`<-- jasmine：将数据写入磁盘出错： ${err.toString()} -->`)
          } else {
              // console.log(`<-- jasmine：将数据写入磁盘成功`)
            }
        });
      }
    });
  }

  /**
   * 读文件
   * @param {string} file
   * @return {Promise}
   */
  static read(file) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(file)) {
        fs.ensureFile(file, function (errDir) {
          resolve('');
        });
      } else {
        fs.readJson(file, {
          encoding: 'utf8',
          flag: 'a+',
          throws: false
        }, function (err, data) {
          if (err) {
            // console.log(`<-- jasmine：从磁盘获取数据失败：${err.toString()} -->`)
            reject(err.toString());
          }

          if (!data) {
            // console.log(`<-- 从磁盘获取数据为空 -->`)
            resolve('');
          }
          resolve(data);
        });
      }
    });
  }

  /**
   * 删除所有的配置文件
   */
  static deleteAllConfig(diskPath) {
    fs.emptyDir(this.getDirPath({ diskPath: diskPath }), function (err) {
      if (err) {
        // console.log(`<-- jasmine：删除文件出错： ${err.toString()} -->`)
      } else {
          // console.log(`<-- jasmine：删除文件成功`)
        }
    });
  }

  /**
   * 从disk读取数据到内存
   * @param {} cache
   * @param {} diskPath
   */
  static readFileConfigToCache(pCache, pDiskPath) {
    const diskPath = pDiskPath;
    const cache = pCache;
    const dir = Disk.getDirPath({ diskPath: diskPath });

    fs.ensureDir(dir, function (errDir) {
      if (!errDir) {
        let files = fs.readdirSync(dir);
        // 遍历主模块目录
        files.forEach(function (mainKey) {
          let subFiles = fs.readdirSync(dir + mainKey);
          // 遍历子模块目录
          subFiles.forEach(function (subKey) {
            // 读取文件数据
            Disk.readConfig({
              diskPath: diskPath,
              mainModule: mainKey,
              subModule: subKey
            }).then(data => {
              if (data) {
                // 保存到内存
                cache.set(mainKey, subKey, data);
              }
            });
          });
        });
      }
    });
  }
};