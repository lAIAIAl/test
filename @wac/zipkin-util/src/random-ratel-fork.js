const uniqueString = require('unique-string')

// === Generate a random 64-bit number in fixed-length hex format
function randomRatelForkId () {
  return uniqueString()
}

module.exports = randomRatelForkId
