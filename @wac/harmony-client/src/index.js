'use strict'

const path = require('path')
const qs = require('querystring')
const Base = require('sdk-base')
const Logger = require('@wac/logger')
const hakone = require('@wac/hakone')
const HarmonyCache = require('./cache/harmony')
const DomainNodeCache = require('./cache/domain-node')
const util = require('./util')

const HARMONY_URL = 'http://api.cell.wacai.info/harmony/getServerList'
const HARMONY_SERVER_TASK_INTERVAL = 5 * 60 * 1000
const FIELD_SEPARATOR = '\u0002'
const LINE_SEPARATOR = '\u0001'

module.exports = class Harmony extends Base {
  constructor(opts) {
    super({
      initMethod: '_init'
    })

    const defaultOpts = {
      env: process.env.NODE_ENV || 'production',
      crossUnit: 1,
      cacheDir: path.join(__dirname, '../../../../', '.harmony'),
      probeInterval: 3000,
      logger: new Logger({ name: 'harmony' })
    }
    this.opts = Object.assign({}, defaultOpts, opts)
    this.harmonyServerIdx = 0
    this.pendingMap = new Map()
  }

  get env() {
    return this.opts.env
  }

  get crossUnit() {
    return this.opts.crossUnit
  }

  get cacheDir() {
    return this.opts.cacheDir
  }

  get probeInterval() {
    return this.opts.probeInterval
  }

  get logger() {
    return this.opts.logger
  }

  async _init() {
    this.harmonyCache = new HarmonyCache(this.cacheDir, { logger: this.logger })
    await this.harmonyCache.load()

    this.domainNodeCache = new DomainNodeCache(this.cacheDir, this.env, this.crossUnit, {
      logger: this.logger
    })
    await this.domainNodeCache.load()

    const harmonyServerList = this.harmonyCache.serverList
    if (harmonyServerList.length === 0) {
      let error
      for (let i = 0; i < 10; i++) {
        try {
          this.harmonyCache.serverList = await this._getServerList()
          error = null
          break
        } catch (err) {
          error = err
        }
      }
      if (error) throw error
    }

    this._runSchedule()
  }

  async _getServerList() {
    const ret = await hakone({ url: HARMONY_URL }).then(res => res.data)
    if (ret.code !== 0) {
      const error = new Error(ret.errorMessage)
      error.code = ret.code
      throw error
    }
    return ret.data
  }

  _selectHarmonyServer() {
    const harmonyServerList = this.harmonyCache.serverList
    this.harmonyServerIdx = this.harmonyServerIdx % harmonyServerList.length
    // harmony 服务器列表无权重区分
    const { host, port } = harmonyServerList[this.harmonyServerIdx]
    this.harmonyServerIdx++
    return `${host}:${port}`
  }

  async _getNodeList(domain, opts) {
    const harmonyServer = this._selectHarmonyServer()
    const ret = await hakone({
      url: `http://${harmonyServer}/harmony/v1/api/filterRealNodes`,
      params: {
        domain,
        env: this.env,
        unit: opts.unit,
        tags: opts.tags,
        crossUnit: this.crossUnit
      }
    }).then(res => res.data)
    if (ret.code !== 0) {
      const error = new Error(ret.errorMessage)
      error.code = ret.code
      throw error
    }
    const nodeList = ret.data
    this.domainNodeCache.updateNodeList(domain, opts.unit, opts.tagsMd5, opts.tags, nodeList)
    return nodeList
  }

  async _probe() {
    let probeModifyRequest = ''
    const nodes = this.domainNodeCache.all()
    for (let [unit, domains] of Object.entries(nodes)) {
      for (let [domain, tagsMd5] of Object.entries(domains)) {
        for (let { tags, nodeList } of Object.values(tagsMd5)) {
          const probeContent = util.md5(nodeList.join(';'))
          const str = [
            domain,
            this.env,
            unit,
            JSON.stringify(tags),
            this.crossUnit,
            '##',
            probeContent
          ].join(FIELD_SEPARATOR)
          probeModifyRequest += str + LINE_SEPARATOR
        }
      }
    }
    if (!probeModifyRequest) return

    const harmonyServer = this._selectHarmonyServer()
    const ret = await hakone({
      url: `http://${harmonyServer}/harmony/probe`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({ probe_modify_request: probeModifyRequest })
    }).then(res => res.data)
    if (ret.code !== 0) {
      this.logger.warn(`探测节点信息失败，error code：${ret.code}，message：${ret.errorMessage}`)
      return
    }
    for (let { domainKey: domain, tags, unit } of ret.data) {
      try {
        let tagsMd5 = 'default'
        if (tags && tags.appGroup) {
          tags = { appGroup: tags.appGroup }
          tagsMd5 = util.md5(JSON.stringify(tags))
        }
        await this._getNodeList(domain, { tags, unit, tagsMd5 })
      } catch (err) {
        this.logger.warn(err, `更新节点信息失败：${domain}，${JSON.stringify(tags)}，${unit}`)
      }
    }
  }

  _runSchedule() {
    const harmonyTimer = setTimeout(async () => {
      try {
        this.harmonyCache.serverList = await this._getServerList()
        this.logger.debug(
          '更新 harmony 服务器列表成功，serverList：%j',
          this.harmonyCache.serverList
        )
      } catch (err) {
        this.logger.warn(err, '获取 harmony 服务器列表失败')
      } finally {
        harmonyTimer.refresh()
      }
    }, HARMONY_SERVER_TASK_INTERVAL)

    const probeTimer = setTimeout(async () => {
      try {
        await this._probe()
        this.logger.debug('探测任务成功')
      } catch (err) {
        this.logger.warn(err, '探测任务失败')
      } finally {
        probeTimer.refresh()
      }
    }, this.probeInterval)

    return [harmonyTimer, probeTimer]
  }

  async getNodeList(domain, opts = {}) {
    if (!opts.unit) opts.unit = process.env.APP_IDC || 'default'

    let tagsMd5 = 'default'
    if (opts.tags && opts.tags.appGroup) {
      opts.tags = { appGroup: opts.tags.appGroup }
      tagsMd5 = util.md5(JSON.stringify(opts.tags))
    }
    opts.tagsMd5 = tagsMd5

    const key = `${domain}:${opts.unit}:${tagsMd5}`
    const pendingRequest = this.pendingMap.get(key)
    pendingRequest && (await pendingRequest)

    let nodeList = this.domainNodeCache.getNodeList(domain, opts.unit, tagsMd5)
    if (nodeList.length) {
      return nodeList
    }

    const promise = this._getNodeList(domain, opts)
    this.pendingMap.set(key, promise)
    const timer = this._setRequestTimeout(key)

    try {
      nodeList = await promise
    } finally {
      this._delFinishedRequest(key, timer)
    }
    return nodeList
  }

  async getNode(domain, opts) {
    const nodeList = await this.getNodeList(domain, opts)
    if (nodeList.length === 0) {
      return null
    }
    const healthyNodeList = nodeList.filter(node => node.weight > 0)
    if (healthyNodeList.length === 0) {
      const idx = Math.floor(Math.random() * nodeList.length)
      return nodeList[idx]
    }

    const total = healthyNodeList.reduce((total, node) => total + node.weight, 0)
    const rand = Math.floor(Math.random() * total)
    let weight = 0
    for (let node of healthyNodeList) {
      weight += node.weight
      if (weight > rand) {
        return node
      }
    }
  }

  _setRequestTimeout(requestKey, timeout = 30000) {
    return setTimeout(() => {
      this.pendingMap.delete(requestKey)
    }, timeout)
  }

  _delFinishedRequest(requestKey, timer) {
    clearTimeout(timer)
    this.pendingMap.delete(requestKey)
  }
}
