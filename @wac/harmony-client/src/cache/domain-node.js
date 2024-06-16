'use strict'

const path = require('path')
const Cache = require('./base')

module.exports = class DomainNodeCache extends Cache {
  constructor(cacheDir, env, crossUnit, opts) {
    super(opts)

    this.cacheDir = cacheDir
    this.env = env
    this.crossUnit = crossUnit
    this._nodes = {}
  }

  all() {
    return this._nodes
  }

  getNodeList(domain, unit, tagsMd5) {
    if (this._nodes[unit] && this._nodes[unit][domain] && this._nodes[unit][domain][tagsMd5]) {
      const { nodeList } = this._nodes[unit][domain][tagsMd5]
      return nodeList.map(node => {
        const [host, port, weight] = node.split(':')
        return { host, port: +port, weight: +weight }
      })
    } else {
      return []
    }
  }

  updateNodeList(domain, unit, tagsMd5, tags = {}, nodeList) {
    if (nodeList.length) {
      if (!this._nodes[unit]) {
        this._nodes[unit] = {}
      }
      if (!this._nodes[unit][domain]) {
        this._nodes[unit][domain] = {}
      }

      nodeList = nodeList.map(node => `${node.host}:${node.port}:${node.weight}`)
      this._nodes[unit][domain][tagsMd5] = { tags, nodeList }
    } else {
      if (this._nodes[unit] && this._nodes[unit][domain]) {
        delete this._nodes[unit][domain][tagsMd5]
      }
    }
    this.writeback(this.cacheFile, this._nodes)
  }

  get cacheFile() {
    return path.join(this.cacheDir, this.env, this.crossUnit + '', 'cache.json')
  }

  async load() {
    const content = await super.load(this.cacheFile)
    if (content) {
      this._nodes = content
    }
  }
}
