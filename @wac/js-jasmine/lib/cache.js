class Cache {
  constructor() {
    this.data = {};
  }

  /**
   * 根据主、子模块设置data
   * @param {string} mainModule: 主模块
   * @param {string} subModule: 子模块
   * @param {*} value
   */
  set(mainModule, subModule, value) {
    let subModuleValue = {};
    subModuleValue[subModule] = value;

    // 取主模块下的所有数据
    let mainModuleValue = this.data[mainModule];
    // 合并当前设置的子模块数据
    mainModuleValue = Object.assign({}, mainModuleValue, subModuleValue);

    this.data[mainModule] = mainModuleValue;
  }

  /**
   * 取主模块下的子模块数据
   * @param {string} mainModule: 主模块
   * @param {string} subModule: 子模块
   * @return {}
   */
  get(mainModule, subModule) {
    if (mainModule && subModule) {
      const mainModuleValue = this.data[mainModule];
      if (mainModuleValue) {
        return mainModuleValue[subModule] || null;
      }
    }
    return null;
  }

  /**
   * 设置主、子模块下该key的数据
   * @param {string} mainModule: 主模块
   * @param {string} subModule: 子模块
   * @param {string} key
   * @param {*} value
   */
  setByKey(mainModule, subModule, key, value) {
    let valueObj = {};
    valueObj[key] = value;

    // 取子模块下的所有数据
    let subModuleValue = this.get(mainModule, subModule);
    // 合并当前设置的key数据
    subModuleValue = Object.assign({}, subModuleValue, valueObj);

    let subValueObj = {};
    subValueObj[subModule] = subModuleValue;

    // 取主模块下的所有数据
    let mainModuleValue = this.data[mainModule];
    // 合并当前设置的子模块数据
    mainModuleValue = Object.assign({}, mainModuleValue, subValueObj);

    this.data[mainModule] = mainModuleValue;
  }

  /**
   * 取主模块下的子模块该key的数据
   * @param {string} mainModule: 主模块
   * @param {string} subModule: 子模块
   * @param {string} key
   * @return {}
   */
  getByKey(mainModule, subModule, key) {
    if (!key) return null;
    const subModuleValue = this.get(mainModule, subModule);
    if (subModuleValue) {
      return subModuleValue[key.toUpperCase()] || subModuleValue[key.toLowerCase()] || null;
    }
    return null;
  }
}

module.exports = Cache;