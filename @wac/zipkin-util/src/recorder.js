const {BatchRecorder} = require('zipkin')
const HttpLogger = require('./http-logger')

module.exports = (config) => {
  // Send spans to Zipkin asynchronously over HTTP
  return new BatchRecorder({
    logger: new HttpLogger(config)
  })
}
