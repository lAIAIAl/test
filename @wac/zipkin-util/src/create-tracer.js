
const CLSContext = require('zipkin-context-cls')
const recorder = require('./recorder')
const NodeTracer = require('./node-tracer')

var tracer = null

const createTracer = (tracerConfig) => {

  if (tracer) {
    return tracer
  }

  const ctxImpl = new CLSContext(tracerConfig.serviceName)
  tracer = new NodeTracer({
    ctxImpl,
    recorder: recorder(tracerConfig)
  })

  return tracer
}

module.exports = createTracer