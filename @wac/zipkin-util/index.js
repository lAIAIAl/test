const createTracer = require('./src/create-tracer')
const httpHeaders = require('./src/http-headers')
const zipkin = require('zipkin')

module.exports = {
  createTracer,
  httpHeaders,
  ...zipkin
}