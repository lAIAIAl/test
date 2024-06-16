'use strict'

const util = require('util')
const moment = require('moment')
const bunyan = require('bunyan')
const shimmer = require('shimmer')
const isPlainObj = require('is-plain-obj')

const safeCycles = bunyan.safeCycles
const nameFromLevel = bunyan.nameFromLevel

exports.rewriteMethods = (proto, isDevOrTest) => {
  if (isDevOrTest) {
    return
  }

  const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']

  shimmer.massWrap(proto, methods, (original) => {
    if (original.__wrapped) {
      return original
    }

    return function (...args) {
      const first = args[0]
      let params = args

      // 对第一个参数进行嵌套 KV 处理
      if (isPlainObj(first)) {
        params = [mutilLayerObjectSerializer(first), ...args.slice(1)]
      }

      return original.apply(this, params)
    }
  })
}

exports.rewriteStreams = (streams, isDevOrTest) => {
  streams.forEach((s) => {
    const stream = s.stream

    if (stream._rewrite) {
      return
    }

    const _write = stream.write.bind(stream)

    stream._rewrite = true
    stream.write = function (rec) {
      try {
        if (s.raw) {
          rec = JSON.stringify(rec, safeCycles())
        }

        rec = JSON.parse(rec)

        if (isDevOrTest) {
          const time = moment(rec.time)

          rec.time = time.format('YYYY-MM-DD HH:mm:ss,SSS')
        } else {
          extractErr(rec)

          const level = rec.level
          const message = rec.msg || '*'

          rec.timestamp = +new Date(rec.time) // 覆盖用户定义的时间戳
          rec.message = message
          rec.level_number = level
          rec.level_name = nameFromLevel[level]

          rec.v = undefined
          rec.time = undefined
          rec.name = undefined
          rec.level = undefined
          rec.msg = undefined
          // delete rec.hostname
        }
      } catch (err) {
        // eslint-disable-no-empty
      }

      return _write(s.raw ? rec : JSON.stringify(rec, safeCycles()) + '\n')
    }
  })
}

function extractErr(rec) {
  const err = rec.err

  if (err) {
    rec.error_name = err.name
    rec.msg = err.message
    rec.stack = err.stack
  }

  rec.err = undefined
}

/***
 * 将多层的 Object 压缩成一层
 */
function mutilLayerObjectSerializer(data) {
  let container = {}

  Object.keys(data).forEach(k => {
    const v = data[k]

    // http://git.caimi-inc.com/client/koa-logger/issues/6#note_206951
    if (typeof v === 'boolean'
      || typeof v === 'string'
      || (typeof v === 'number' && !Number.isNaN(v) && Number.isFinite(v))
      || v === null
      || v instanceof Error) {
      container[k] = v
    } else {
      container[k] = util.inspect(data[k], { depth: null, breakLength: Infinity })
    }

  })

  return container
}
exports.mutilLayerObjectSerializer = mutilLayerObjectSerializer
