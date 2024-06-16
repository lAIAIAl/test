"use strict";

const fs = require('fs-extra');

const path = require('path');

const rootDir = path.resolve('/');
/**
 * 递归逐级向上查找项目package.json所在的目录
 * @returns {Promise<String|null>}
 */

module.exports = async () => {
  let dir = process.cwd();

  while (true) {
    if (await fs.exists(`${dir}/package.json`)) {
      // 当前目录存在package.json文件，立刻返回
      return dir;
    } else if (dir === rootDir) {
      // 已经找到根目录仍未找到，则返回空
      return null;
    } else {
      dir = path.dirname(dir);
    }
  }
};