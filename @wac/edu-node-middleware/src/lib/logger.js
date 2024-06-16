const url = require('url')
const env = process.env.NODE_ENV || 'development'

// 标志日志类型，方便告警配置
const LOG_TYPE = {
  java: 'java-api',
  node: 'node-api',
  login: 'login',
  'page-error': 'page-error',
  'wechat-auth': 'wechat-auth',
  'app-error': 'app-error', // 捕获的异常
  biz: 'biz', // 品类相关
  market: 'market', // 市场投放流程相关
  record: 'record', // 其他记录
}

// level_name，严重性，主要体现在阈值告警频次
const levelMap = {
  info: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'fatal',
}

module.exports = class {
  static logNodeApi(ctx, request, res) {
    const { method, paramsGet, paramsPOST, headers } = getRequestInfo(request, ctx)
    const levelName = getLevelName(res)
    const { data, status } = getResInfo(res, ctx)
    const nodeUrl = ctx.href
    const uid = (ctx.userInfo ? ctx.userInfo.uid || '0' : '0') + ''

    // 打印的请求头信息
    const logHeaders = Object.assign({}, headers)

    // 自定义采集字段
    const collectObj = {
      bu_log_type: LOG_TYPE.node,
      uid,
      platform: logHeaders['x-platform'] || '',
      appver: logHeaders['x-appver'] || '',
      node_path: ctx.path, // node api path
      code: status, // http 响应状态码
      error_msg: data ? (data.error || data.msg || '').slice(0, 50) : '',
      real_ip: logHeaders['x-real-ip'] || '',
      mini_app_id: logHeaders['x-mini-appid'] || '',
      mini_app_ver: logHeaders['x-mini-app-ver'] || '',
    }

    // 具体日志信息message
    const logMsg =
      `<-- NODE_API: /${method} ${nodeUrl}` +
      `\n    PARAMS.GET: ${JSON.stringify(paramsGet)}` +
      `\n    PARAMS.POST: ${JSON.stringify(paramsPOST)}` +
      `\n    REFERER: ${headers.referer || ''}` +
      `\n    HEADERS: ${JSON.stringify(logHeaders)}` +
      `\n--> RESULT: ${JSON.stringify(data)}`

    ctx.log[levelName](collectObj, logMsg)
  }

  static logJava(ctx, request, res, { requestDuration } = {}) {
    const { fetchUrl, method, paramsGet, paramsPOST, headers } = getRequestInfo(request, ctx)
    const levelName = getLevelName(res)
    const { data, status } = getResInfo(res, ctx)
    const nodeUrl = ctx.href

    const path = url.parse(fetchUrl, true, true).pathname
    const uid = (ctx.userInfo ? ctx.userInfo.uid || '0' : '0') + ''
    // 自定义采集字段
    const collectObj = {
      bu_log_type: LOG_TYPE.java,
      uid,
      platform: headers['x-platform'] || '',
      appver: headers['x-appver'] || '',
      java_path: path, // java api path
      node_path: ctx.path, // node api path
      code: status, // http 响应状态码
      error_msg: data ? (data.error || data.msg || '').slice(0, 50) : '',
      real_ip: headers['x-real-ip'] || '',
      mini_app_id: headers['x-mini-appid'] || '',
      mini_app_ver: headers['x-mini-app-ver'] || '',
    }

    // 打印的请求头信息
    const logHeaders = Object.assign({}, headers)

    // 具体日志信息message
    const logMsg =
      `<-- NODE_URL: /${method} ${nodeUrl}` +
      `\n    JAVA_URL: /${method} ${fetchUrl} ${status} ${
        requestDuration ? requestDuration + 'ms' : ''
      }` +
      `\n    PARAMS.GET: ${JSON.stringify(paramsGet)}` +
      `\n    PARAMS.POST: ${JSON.stringify(paramsPOST)}` +
      `\n    REFERER: ${headers.referer || ''}` +
      `\n    HEADERS: ${JSON.stringify(logHeaders)}` +
      `\n--> RESULT: ${JSON.stringify(data)}`

    ctx.log[levelName](collectObj, logMsg)
  }

  static logWechatAuth({ ctx, scope, wechatInfo, appid = '', source = '' }) {
    let levelName = levelMap.info
    if (!wechatInfo || !wechatInfo.openid) {
      levelName = levelMap.error
    }
    const uid = (ctx.userInfo ? ctx.userInfo.uid || '0' : '0') + ''
    const headers = ctx.headers || {}
    const logMsgObject = {
      uid,
      bu_log_type: LOG_TYPE['wechat-auth'],
      node_path: ctx.path,
      error_msg: levelName === levelMap.error ? `${JSON.stringify(wechatInfo)}`.slice(0, 50) : '',
      isSnapshot: wechatInfo.isSnapshotUser,
      real_ip: headers['x-real-ip'] || '',
      mini_app_id: headers['x-mini-appid'] || '',
      mini_app_ver: headers['x-mini-app-ver'] || '',
    }

    const logMsg =
      `<-- WECHAT_AUTH_NODE_URL: ${ctx.href} uid=${uid} appid=${appid} source=${source}` +
      `\n    HEADERS: ${JSON.stringify(headers)}` +
      `\n--> wx ${scope} authorize info: ${JSON.stringify(wechatInfo)}`

    ctx.log[levelName](logMsgObject, logMsg)
  }

  static logAppError(ctx, err) {
    const uid = (ctx.userInfo ? ctx.userInfo.uid || '0' : '0') + ''
    const headers = ctx.headers || {}
    const logMsg =
      `<-- APP_ERROR_NODE_URL: ${ctx.href} uid=${uid}` +
      `\n    HEADERS: ${JSON.stringify(headers)}` +
      `\n--> Error_Message: ${err.stack}`
    ctx.log.error(
      {
        uid,
        bu_log_type: LOG_TYPE['app-error'],
        node_path: ctx.path,
        error_msg: (err.message || '').slice(0, 50),
        real_ip: headers['x-real-ip'] || '',
        mini_app_id: headers['x-mini-appid'] || '',
        mini_app_ver: headers['x-mini-app-ver'] || '',
      },
      logMsg,
    )
  }

  static logJsError(ctx) {
    const headers = ctx.headers || {}
    const uid = (ctx.userInfo ? ctx.userInfo.uid || '0' : '0') + ''

    ctx.log.error(
      {
        uid,
        bu_log_type: LOG_TYPE['page-error'],
        node_path: ctx.path, // node api path
        error_msg: (ctx.request.body.msg || '').slice(0, 50),
        page_url: ctx.request.body.href || headers.referer || '',
        real_ip: headers['x-real-ip'] || '',
        mini_app_id: headers['x-mini-appid'] || '',
        mini_app_ver: headers['x-mini-app-ver'] || '',
      },
      `<-- JS_ERROR_PAGE_URL: ${headers.referer || ctx.href} uid=${uid}` +
        `\n    PARAMS: ${JSON.stringify(ctx.request.body)}` +
        `\n--> HEADERS: ${JSON.stringify(headers)}`,
    )
  }

  static logCheckLogin(ctx, req, res) {
    const { fetchUrl, headers } = getRequestInfo(req, ctx)
    const { status, data = {} } = res
    const path = url.parse(fetchUrl, true, true).pathname
    const levelName = status !== 200 || !data.result ? levelMap.error : levelMap.info
    ctx.log[levelName](
      {
        bu_log_type: LOG_TYPE.login,
        node_path: ctx.path,
        java_path: path,
        code: status,
        real_ip: headers['x-real-ip'] || '',
        mini_app_id: headers['x-mini-appid'] || '',
        mini_app_ver: headers['x-mini-app-ver'] || '',
      },
      `<-- NODE_URL: ${ctx.href}` +
        `\n    CHECK_LOGIN_URL: ${fetchUrl} ${status}` +
        `\n    HEADERS: ${JSON.stringify(headers)}` +
        `\n--> RES: ${JSON.stringify(data)}`,
    )
  }

  /**
   * 在非接口请求类型的自定义日志，建议工程内封装后使用；
   * 基于日志类型 logType 分类，某一类中，可以基于mark来进行区分方便筛选，附带信息用于查看具体日志内容（如errorMsg等）
   * 注意：挖财云日志服务搜索默认只搜索 msg 内容
   * @param {*} ctx
   * @param {logType, level, mark, msg} 日志类型，日志等级，日志标识，附带信息
   * @param {additionalLogMsgObject, replacedLogMsgFunc} 附加日志项，替换日志信息
   * @returns
   */
  static customLog(
    ctx,
    { logType, level, mark, msg } = {},
    { additionalLogMsgObject = {}, replacedLogMsgFunc } = {},
  ) {
    // logType 必填; msg 与 mark 不能同时为空
    if (!ctx || !logType || (!msg && !mark)) {
      return
    }

    if (env !== 'production' && !LOG_TYPE[logType]) {
      // eslint-disable-next-line no-console
      console.warn('建议优先复用LOG_TYPE的类型')
    }

    const levelName = levelMap[level] || levelMap.info
    const uid = (ctx.userInfo ? ctx.userInfo.uid || '0' : '0') + ''

    const headers = ctx.headers || {}

    try {
      // 格式化
      let logMsg = msg instanceof Error ? msg.message : msg
      if (logMsg && Object.prototype.toString.call(logMsg) === '[object Object]') {
        logMsg = JSON.stringify(logMsg)
      }

      let fullLogMsg =
        `<--  NODE_URL: ${ctx.href}` +
        `\n    HEADERS: ${JSON.stringify(headers)}` +
        (logMsg ? `\n    MESSAGE: ${logMsg}` : '')
      if (replacedLogMsgFunc) {
        fullLogMsg = replacedLogMsgFunc(logMsg, fullLogMsg) || fullLogMsg
      }

      const logMsgObject = Object.assign(
        {},
        {
          uid,
          bu_log_type: logType,
          node_path: ctx.path,
          real_ip: headers['x-real-ip'] || '',
          mini_app_id: headers['x-mini-appid'] || '',
          mini_app_ver: headers['x-mini-app-ver'] || '',
        },
        mark ? { cfxy_mark: mark } : {},
        additionalLogMsgObject,
      )

      ctx.log[levelName](logMsgObject, fullLogMsg)
    } catch (error) {
      //
      this.logAppError(ctx, error)
    }
  }

  // 品类信息默认单个 ctx 只打印一次
  static logBizInfoResult({ ctx, bizInfo, onlyOnce = true }) {
    if (onlyOnce && ctx.isRecord === true) {
      return
    }
    this.customLog(ctx, {
      logType: LOG_TYPE.biz,
      msg: bizInfo,
    })
    ctx.isRecord = true
  }

  /**
   * record 类型的日志，一般只用 mark 做约束，无错误信息抛出
   * @param {*} ctx
   * @param {*} mark
   * @param {level, msg, addtionHook}
   */
  static logRecord(ctx, mark, { level, msg, addtionHook }) {
    this.customLog(
      ctx,
      {
        logType: LOG_TYPE.record,
        level: level || levelMap.log,
        msg,
        mark,
      },
      addtionHook,
    )
  }

  /**
   * 待移除或下架的页面或接口使用，通过基于 mark 配置日志告警以实现长期监听访问量，规避只能查看七天访问日志的问题
   * @param {*} ctx
   * @param {*} resProps 其他参数用于自定义hook，参见[logRecord]方法
   */
  static expiredEntryLog(ctx, resProps) {
    this.logRecord(ctx, '废弃页面/接口调用', resProps)
  }

  /**
   * 市场类型日志
   */
  static logMarketInfo(ctx, { level, mark, msg }, addtionHook) {
    this.customLog(ctx, { logType: LOG_TYPE.market, level, mark, msg }, addtionHook)
  }
}

function getLevelName(res) {
  // 确定日志级别
  let levelName = levelMap.info
  if (
    isResponseError(res) ||
    res.status !== 200 ||
    (typeof res.data === 'string' && res.data.includes('html>')) ||
    res.data.code < 0
  ) {
    levelName = levelMap.error
  } else if (res.data.code > 0) {
    // body.error信息包含有如下信息之一，则使用ctx.log.error打印日志，且会有告警发出
    const defaultInfo = ['异常', '错误', 'Error:']

    const errorArr = res.data.error && defaultInfo.filter((item) => res.data.error.includes(item))
    if (errorArr && errorArr.length) {
      levelName = levelMap.error
    } else {
      levelName = levelMap.warn
    }
  }

  return levelName
}

function getRequestInfo(request, ctx) {
  const { method = 'GET', headers = ctx.headers, params, data, url } = request
  const paramsGet = params || {}
  const paramsPOST = data || {}

  return {
    method,
    paramsGet,
    paramsPOST,
    headers,
    fetchUrl: url,
  }
}

function getResInfo(res, ctx) {
  if (isResponseError(res)) {
    return getResError(res, ctx)
  }
  return res
}

function getResError(err, ctx) {
  let res = {}
  if (err.response) {
    res = err.response
  } else if (err.request) {
    res = {
      status: ctx.res.statusCode,
      data: {
        code: 1,
        error: err.message + '; no response was received.',
      },
    }
  } else {
    res = {
      status: ctx.res.statusCode,
      data: {
        code: 1,
        error: err.message,
      },
    }
  }
  return res
}

function isResponseError(res) {
  return res instanceof Error
}
