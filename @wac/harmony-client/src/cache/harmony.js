'use strict'

const path = require('path')
const assert = require('assert')
const Cache = require('./base')

module.exports = class HarmonyCache extends Cache {
  constructor(cacheDir, opts) {
    super(opts)

    this.cacheDir = cacheDir
    this._serverList = []
  }

  get serverList() {
    return this._serverList
  }

  set serverList(serverList) {
    assert(Array.isArray(serverList), 'harmony 服务器列表类型错误')

    this._serverList = serverList
    this.writeback(this.cacheFile, serverList)
  }

  get cacheFile() {
    return path.join(this.cacheDir, 'harmony.json')
  }

  async load() {
    const content = await super.load(this.cacheFile)
    if (content) {
      this._serverList = content
    }
  }
}
