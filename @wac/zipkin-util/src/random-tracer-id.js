const crypto = require('crypto')

// === Generate a random 64-bit number in fixed-length hex format
function randomTraceId () {
  return crypto.randomBytes(8).toString('hex')
}

module.exports = randomTraceId
