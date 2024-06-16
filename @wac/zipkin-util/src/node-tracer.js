const {
  Tracer,
  option,
  TraceId
} = require('zipkin')
const randomTraceId = require('./random-tracer-id')

const {None, Some, fromNullable} = option

class NodeTracer extends Tracer {
  constructor (props) {
    super(props)
  }
  createRootId (customTracer) {
    const rootSpanId = randomTraceId()
    let traceId = this.traceId128Bit
      ? new Some(randomTraceId() + rootSpanId)
      : None

    if (customTracer) {
      traceId = customTracer
    }

    const id = new TraceId({
      traceId,
      parentId: None,
      spanId: rootSpanId,
      sampled: None,
      flags: 0
    })
    id._sampled = this.sampler.shouldSample(id)
    return id
  }

  createChildId () {
    const currentId = fromNullable(
      this._ctxImpl.getContext()
    )

    const childId = new TraceId({
        traceId: currentId.map(id => id.traceId),
      parentId: currentId.map(id => id.spanId),
    spanId: randomTraceId(),
      sampled: currentId.flatMap(id => id.sampled),
    flags: currentId.map(id => id.flags).getOrElse(0)
  })
    if (childId.sampled.present === false) {
      childId._sampled = this.sampler.shouldSample(childId)
    }
    return childId
  }
}

module.exports = NodeTracer
