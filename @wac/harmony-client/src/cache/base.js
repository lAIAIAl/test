'use strict'

const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

module.exports = class Cache {
  constructor(opts) {
    this.opts = opts
  }

  get logger() {
    return this.opts.logger
  }

  async load(filename) {
    const { dir } = path.parse(filename)
    await mkdir(dir, { recursive: true })

    let cache
    try {
      cache = await readFile(filename, 'utf-8')
    } catch (err) {
      this.logger.warn(err, '读取本地缓存失败')
      return null
    }

    let content
    try {
      content = JSON.parse(cache)
    } catch (err) {
      this.logger.warn(err, '缓存文件已损坏')
      return null
    }

    return content
  }

  async writeback(filename, content = {}) {
    try {
      await writeFile(filename, JSON.stringify(content, null, 2))
    } catch (err) {
      this.logger.warn(err, '写本地缓存失败')
    }
  }
}
