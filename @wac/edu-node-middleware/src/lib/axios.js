const hakone = require('@wac/hakone')
const http = require('http')
const keepAliveAgent = new http.Agent({ keepAlive: true })
const fetch = hakone.create({
  httpAgent: keepAliveAgent,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  validateStatus: (status) => {
    return status > 0
  },
})

module.exports = fetch
