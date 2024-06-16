'use strict'

const path = require('path')
const crypto = require('crypto')
const uuid = require('uuid')
const mkdirp = require('mkdirp')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')
const { rewriteMethods, rewriteStreams } = require('./rewrite')
const HermesStream = require('./hermes-stream')

module.exports = (app, opts = {}) => {
  if (!app || !app.use) {
    throw new TypeError('app instance required: logger(app, opts)')
  }

  const env = app.env || 'development'
  const defaultsOpts = {
    env: env,
    levelMap: {
      'development': 'debug',
      'test': 'info',
      'staging': 'info',
      'production': 'info'
    },
    serializers: bunyan.stdSerializers,
    reportHermes: false
  }

  opts = Object.assign({}, defaultsOpts, opts)

  let loggerInstance = createLogger(opts)

  app.log = app.context.log = loggerInstance

  app.context.time = function (label) {
    const startTimes = this._timeContextStartTimes

    if (startTimes[label]) {
      this.log.warn('time() called for previously used label %s', label)
    }

    startTimes[label] = Date.now()
  }

  app.context.timeEnd = function (label) {
    const startTimes = this._timeContextStartTimes
    const startTime = startTimes[label]

    if (!startTime) {
      this.log.warn('timeEnd() called without time() for label %s', label)
      return
    }

    const duration = Date.now() - startTime
    const msg = label + ': ' + duration + 'ms'

    const fields = {
      label: label,
      duration: duration
    }

    this.log.info(fields, msg)

    startTimes[label] = null
  }


  // logrotate完成，重新初始化loggerInstance
  process.on('SIGPIPE', function () {
    loggerInstance = createLogger(opts)
    app.log = app.context.log = loggerInstance
  })

  return function logger(ctx, next) {
    ctx._timeContextStartTimes = {}

    const traceId = ctx.traceId = ctx.get('x-trace-id') ||
      crypto.createHash('md5').update(uuid.v4()).digest('hex')
    const sessionId = ctx.cookies.get('session_id') || ''

    ctx.log = loggerInstance.child({
      trace_id: traceId,
      session_id: sessionId
    })

    return next()
  }
}

/*
 * 创建 bunyan logger
 *
 * @param {Object} opts
 *
 * */
function createLogger(params) {
  const opts = Object.assign({}, params) // 防止污染外部传入的 opts
  const projectDir = opts.projectDir || path.join(__dirname, '../../../../')
  let name = opts.name
  let group = opts.group

  if (!name || !group) {
    try {
      const pkg = require(path.join(projectDir, 'package.json'))
      name = pkg.name
      group = pkg.group
    } catch (err) {
      name = opts.name
      group = opts.group
    }
  }

  if (!name || !group) {
    throw new Error('project name or group not set')
  }

  const level = opts.levelMap[opts.env]
  const env = opts.env
  const isDev = opts.env === 'development'
  const isTest = opts.env === 'test'
  const isDevorTest = isDev || isTest
  const reportHermes = opts.reportHermes

  // 默认情况，开发环境打印日志源
  isDev && typeof opts['src'] === 'undefined' ? opts['src'] = true : null

    // 这里只有在启动的时候才会运行
    ;['name', 'group', 'projectDir', 'levelMap', 'env'].forEach(item => delete opts[item])

  const loggerOpts = Object.assign({}, {
    name: name,
    level: level,
    streams: []
    // serializers: opts.serializers // opts 中已经设置默认的了
  }, opts)

  const streams = loggerOpts.streams

  if (isDevorTest) {
    // 本地以及测试环境开发输出到终端
    const prettyStdOut = new PrettyStream({
      mode: 'dev'
    })

    prettyStdOut.pipe(process.stdout)

    streams.push({
      type: 'raw',
      stream: prettyStdOut
    })
  } else {
    // 非开发输出到文件
    const logsDir = path.join(projectDir, `../logs/${group}/${name}/app_log/monitor`)
    const projectLogPath = path.join(logsDir, `${name}.log`)

    mkdirp.sync(logsDir)

    streams.push({
      type: 'file',
      path: projectLogPath
    })
  }
  if (reportHermes) {
    streams.push({
      type: 'raw',
      stream: new HermesStream({
        name: opts.hermesName || name,
        env
      })
    })
  }

  const logger = bunyan.createLogger(loggerOpts)

  rewriteMethods(bunyan.prototype, isDevorTest)
  rewriteStreams(logger.streams, isDevorTest)

  return logger
}
