'use strict'

const crypto = require('crypto')

module.exports = {
  md5(str) {
    const hash = crypto.createHash('md5')
    hash.update(str)
    return hash.digest('hex')
  }
}
