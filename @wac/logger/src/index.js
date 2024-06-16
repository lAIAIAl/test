'use strict'

const assert = require('assert')
const path = require('path')
const mkdirp = require('mkdirp')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')
const moment = require('moment')
const { rewriteStreams, rewriteRotating, rewriteAddStream } = require('./rewrite')

module.exports = class Logger {
  /**
   *
   * @param {String} opts.name required
   * @param {String} opts.level default 'info'
   * @param {Boolean} opts.src default false
   * @param {Array} opts.transports
   * @param {Object} fields
   * @param {Logger} parentLogger
   */
  constructor(opts = {}, fields = {}, parentLogger) {
    assert(opts.name && typeof opts.name === 'string', 'log name must be a non-empty string')

    this.fields = fields
    this.opts = Object.assign(
      {},
      {
        level: 'info',
        src: false
      },
      opts
    )

    this.logger = parentLogger ? parentLogger.child(fields) : this.create()
  }

  get name() {
    return this.opts.name
  }

  get level() {
    return this.opts.level
  }

  create() {
    const loggerOpts = Object.assign({}, this.fields, {
      name: this.name,
      level: this.level,
      streams: [],
      serializers: bunyan.stdSerializers,
      src: this.opts.src
    })

    if (!this.opts.transports || this.opts.transports.length === 0) {
      const prettyStdOut = new PrettyStream({ mode: 'dev' })
      prettyStdOut.pipe(process.stdout)

      loggerOpts.streams.push({
        type: 'raw',
        stream: prettyStdOut
      })
    } else {
      const streams = (loggerOpts.streams = this.opts.transports)
      for (let stream of streams) {
        if (stream.path) {
          stream.path = replacePath(stream.path)
          const { dir } = path.parse(stream.path)
          mkdirp.sync(dir)
        }
      }
    }

    rewriteRotating(bunyan.RotatingFileStream.prototype)
    const logger = bunyan.createLogger(loggerOpts)

    rewriteAddStream(logger, replacePath)
    rewriteStreams(logger.streams)
    return logger
  }

  debug(...args) {
    this.logger.debug(...args)
  }

  info(...args) {
    this.logger.info(...args)
  }

  warn(...args) {
    this.logger.warn(...args)
  }

  error(...args) {
    this.logger.error(...args)
  }

  child(fields) {
    fields = Object.assign({}, this.fields, fields)
    return new Logger(this.opts, fields, this.logger)
  }

  addStream(...args) {
    this.logger.addStream(...args)
  }
}

function replacePath(streamPath) {
  const now = moment().format('YYYYMMDDHHmmss')
  const { dir, name, ext } = path.parse(streamPath)
  return path.join(dir, `${name}.${now}${ext}`)
}
