const http = require('http')
const url = require('url')

let messageKey = 0

class HttpLogger {
  constructor ({
    url,
    clientId = '',
    topic = 'wacai.tracing.zipkin',
    httpInterval = 1000
  }) {
    if (!url) {
      throw new Error('tracerService url is required')
    }

    this.url = url
    this.topic = topic

    this.defaultHeader = {
      'Client-Id': clientId,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    this.queue = []

    setInterval(() => {
      this.processQueue()
  }, httpInterval)
  }

  logSpan (span) {
    this.queue.push(span.toJSON())
  }

  processQueue () {
    if (this.queue.length > 0) {
      messageKey++

      const postBody = this.queue.map(v => JSON.stringify(v))
      const body = `topic=${this.topic}&message_key=${messageKey}&message=${JSON.stringify(postBody)}`

      const req = http.request(Object.assign(url.parse(this.url),
          {
            method: 'POST',
            headers: Object.assign({}, this.defaultHeader, {
              'Correlated-Id': String(messageKey)
            })
          }), (res) => {
          if (res.statusCode !== 200) {
        /* eslint-disable no-console */
        console.error('Unexpected response while sending Zipkin data, status:' +
          `${res.statusCode}, body: ${postBody}`)
      }
    })
      req.on('error', (error) => {
        /* eslint-disable no-console */
        console.error('Error sending Zipkin data', error)
    })
      req.write(body)
      req.end()

      this.queue.length = 0
    }
  }
}

module.exports = HttpLogger
