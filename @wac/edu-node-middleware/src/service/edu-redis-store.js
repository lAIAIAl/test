const axios = require('../lib/axios')
const url = require('url')
const logger = require('../lib/logger')
// const env = (process.env.NODE_ENV || 'test').toLowerCase()
// const envMap = {
//   development: 'http://api.wac-edu.k2.test.wacai.info',
//   test: 'http://api.wac-edu.k2.test.wacai.info',
//   staging: 'http://api.wac-edu.k2.wacai.info',
//   production: 'http://api.wac-edu.k2.wacai.info',
// }
// function API(key) {
//   return {
//     'redis/get': `${envMap[env]}/edu/redis/get`,
//     'redis/set': `${envMap[env]}/edu/redis/set`,
//   }[key]
// }
module.exports = class {
  constructor(ctx, { keyPrefix = '', redisGetUrl = '', redisSetUrl = '' } = {}) {
    this.ctx = ctx
    this.keyPrefix = keyPrefix
    this.redisGetUrl = redisGetUrl
    this.redisSetUrl = redisSetUrl
    this.axios = (opts) => {
      const headers = Object.assign({}, ctx.headers, opts.headers)
      headers.host = url.parse(opts.url, true, true).host
      // 处理请求头
      delete headers['content-length']
      delete headers['content-type']
      Object.assign(headers, {
        'X-Requested-With': 'XMLHttpRequest',
      })
      opts.headers = headers
      return axios(opts)
        .then((res) => {
          logger.logJava(this.ctx, opts, res)
          return res.data
        })
        .catch((err) => {
          logger.logJava(this.ctx, opts, err)
          return { code: 1, error: err.message }
        })
    }
    if (!redisGetUrl || !redisSetUrl) {
      throw new Error(
        '实例化 edu-redis-store 时 redisGetUrl 和 redisSetUrl 不能为空，且须为完整的http url',
      )
    }
    if (!redisGetUrl.startsWith('http') || !redisSetUrl.startsWith('http')) {
      throw new Error('实例化 edu-redis-store 时 redisGetUrl 和 redisSetUrl 必须为完整的http url')
    }
  }

  /**
   * 获取
   */
  async get(key) {
    if (!key) {
      return null
    }
    key = this.keyPrefix + key
    const opts = {
      url: this.redisGetUrl,
      params: { key },
    }
    return this.axios(opts)
      .then((res) => {
        return res.code === 0 ? res.data : null
      })
      .catch(() => {
        return null
      })
  }

  async getJSON(key) {
    try {
      return JSON.parse(await this.get(key))
    } catch (err) {
      this.ctx.log.error(`redis getJSON: ${err.message}`)
      /* eslint-disable-next-line */
      // console.log(`redis getJSON: ${err.message}`)
      return null
    }
  }

  /**
   * 设置
   * timeout 单位为 s
   * value 值必须为字符串
   */
  async set(key, value, { timeout } = {}) {
    if (!key || !timeout) {
      this.ctx.log.error(`set redis need params: key and timeout ! key=${key} timeout=${timeout}`)
      /* eslint-disable-next-line */
      // console.log(`set redis need params: key and timeout ! key=${key} timeout=${timeout}`)
      return { code: 1, error: 'set redis need params: key and timeout.' }
    }
    key = this.keyPrefix + key
    const opts = {
      url: this.redisSetUrl,
      method: 'post',
      data: {
        key,
        value,
        timeout,
      },
    }
    return this.axios(opts).then((res) => {
      return res
    })
  }

  /**
   * 设置
   * timeout 单位为 s
   * value 值必须为 jsObject
   */
  async setJSON(key, value, options) {
    try {
      return this.set(key, JSON.stringify(value), options)
    } catch (err) {
      this.ctx.log.error(`redis setJSON: ${err.message}`)
      /* eslint-disable-next-line */
      // console.log(`redis setJSON: ${err.message}`)
      return { code: 1, error: err.message }
    }
  }
}
