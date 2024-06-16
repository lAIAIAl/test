module.exports = class Cache {
  static set(name, value) {
    const keys = Object.keys(global.harmonyNodeCache);
    // 防止无限制增长，长度大于100，删除第一个
    if (keys.length >= 100) {
      var firstKey = keys.shift();
      delete global.harmonyNodeCache[firstKey];
    }
    global.harmonyNodeCache[name] = value;
  }

  static get(name) {
    if (name) {
      return global.harmonyNodeCache[name] || null;
    }
    return null;
  }
};