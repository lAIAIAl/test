const env = process.env.NODE_ENV || 'development'
const axios = require('../lib/axios')
const { eduApiMap, ucenterApiMap } = require('../constants/api-map')
const logger = require('../lib/logger')
const url = require('url')
module.exports = class {
  constructor(ctx) {
    this.ctx = ctx
    this.fetch = (opts) => {
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
          const response = res.data
          if (response.code !== 0 || !response.data) {
            logger.logJava(this.ctx, opts, res)
          }
          return res.data
        })
        .catch((err) => {
          logger.logJava(this.ctx, opts, err)
          return { code: 1, error: err.message }
        })
    }
  }

  getAuthInfo(uid) {
    return this.fetch({
      url: `${eduApiMap[env]}/edu/wechat/user/authorization-info/list?uid=${uid}`,
    })
  }

  getBizTypeConfig(bizCode) {
    return this.fetch({
      url: `${eduApiMap[env]}/edu/business/manage/config/get-by-business-code`,
      params: {
        businessCode: bizCode,
      },
    })
  }

  getBizCodeByAf(af) {
    return this.fetch({
      url: `${eduApiMap[env]}/edu/business/manage/config/get-by-af/${af}`,
    })
  }

  getBizCodeByLiveParam(params) {
    return this.fetch({
      url: `${eduApiMap[env]}/edu/business/query-by-living-room-info`,
      params,
    })
  }

  getAppIdByPlatform(platform) {
    return this.fetch({
      url: `${ucenterApiMap[env]}/ucenter/h5/common/${platform}/getAppid`,
    })
  }
}
