'use strict'

const moment = require('moment')
const bunyan = require('bunyan')
const globby = require('globby')
const fs = require('fs')
const path = require('path')
const microtime = require('./microtime')
const mkdirp = require('mkdirp')

const safeCycles = bunyan.safeCycles
const nameFromLevel = bunyan.nameFromLevel

module.exports = {
  rewriteStreams(streams) {
    streams.forEach(s => {
      const stream = s.stream

      if (stream._rewrite) {
        return
      }

      const _write = stream.write.bind(stream)

      stream._rewrite = true
      stream.write = function(rec) {
        try {
          if (s.raw) {
            rec = JSON.stringify(rec, safeCycles())
          }

          rec = JSON.parse(rec)

          const time = moment(rec.time)
          rec.time = time.format('YYYY-MM-DD HH:mm:ss,SSS')

          const level = rec.level
          rec.timestamp = microtime.now()
          rec.level_name = nameFromLevel[level]
        } catch (err) {
          // eslint-disable-no-empty
        }

        return _write(JSON.stringify(rec, safeCycles()) + '\n')
      }
    })
  },

  rewriteRotating(proto) {
    proto.rotate = function() {
      // XXX What about shutdown?
      var self = this

      // If rotation period is > ~25 days, we have to break into multiple
      // setTimeout's. See <https://github.com/joyent/node/issues/8656>.
      if (self.rotAt && self.rotAt > Date.now()) {
        return self._setRotationTimer()
      }

      if (self.rotating) {
        throw new TypeError('cannot start a rotation when already rotating')
      }
      self.rotating = true

      self.stream.end() // XXX can do moves sync after this? test at high rate

      function del() {
        const { dir, name, ext } = path.parse(self.path)
        const filePath = path.join(dir, `${name.split('.')[0]}.*${ext}`)
        let files = globby.sync([filePath])
        if (files.length <= self.count) {
          return create()
        }

        files.sort((a, b) => {
          const fileA = path.parse(a).name
          const fileB = path.parse(b).name
          const dateA = +fileA.split('.').pop()
          const dateB = +fileB.split('.').pop()
          return dateA - dateB
        })
        const toDel = files.slice(0, files.length - self.count)
        for (let item of toDel) {
          try {
            fs.unlinkSync(item)
          } catch (err) {
            // XXX handle err other than not exists
          }
        }
        create()
      }

      function create() {
        const now = moment().format('YYYYMMDDHHmmss')
        const { dir, name, ext } = path.parse(self.path)
        self.path = path.join(dir, `${name.split('.')[0]}.${now}${ext}`)
        self.stream = fs.createWriteStream(self.path, { flags: 'a', encoding: 'utf8' })

        var q = self.rotQueue
        var len = q.length
        for (var i = 0; i < len; i++) {
          self.stream.write(q[i])
        }
        self.rotQueue = []
        self.rotating = false
        self.emit('drain')
        self._setupNextRot()
      }

      del()
    }
  },

  rewriteAddStream(logger, replacePath) {
    const addStream = logger.addStream.bind(logger)
    logger.addStream = (stream, defaultLevel) => {
      if (stream.path) {
        stream.path = replacePath(stream.path)
        const { dir } = path.parse(stream.path)
        mkdirp.sync(dir)
      }
      addStream(stream, defaultLevel)
    }
  }
}
