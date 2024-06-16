'use strict';
/* istanbul ignore next */

const url = require('url');
/* istanbul ignore next */


const {
  InetAddress,
  Annotation,
  httpHeaders,
  createTracer
} = require('@wac/zipkin-util');
/* istanbul ignore next */


module.exports = tracerConfig => {
  const {
    serviceName
  } = tracerConfig;
  const tracer = createTracer(tracerConfig);

  const requestInterceptor = req => {
    return tracer.scoped(() => {
      if (!tracer._ctxImpl.getContext()) {
        tracer.setId(tracer.createRootId());
      } else {
        tracer.setId(tracer.createChildId());
      }

      const traceId = tracer.id;
      req.traceId = traceId;
      const addr = InetAddress.getLocalAddress().addr;
      const headers = req.headers || {};
      headers[httpHeaders.TraceId] = traceId.traceId;
      headers[httpHeaders.SpanId] = traceId.spanId;
      headers[httpHeaders.Sampled] = true;
      headers[httpHeaders.Client] = addr;

      if (!headers[httpHeaders.RatelFork]) {
        headers[httpHeaders.RatelFork] = Date.now();
      }

      traceId._parentId.ifPresent(psid => {
        headers[httpHeaders.ParentSpanId] = psid;
      });

      const method = req.method || 'get';
      tracer.recordServiceName(serviceName);
      tracer.recordRpc(method.toUpperCase());
      tracer.recordBinary('http.url', encodeURIComponent(url.parse(req.url).pathname));
      tracer.recordAnnotation(new Annotation.ClientSend());
      tracer.recordLocalAddr(addr);
      tracer.recordBinary('component', 'nodejs');
      return req;
    });
  };

  const responseInterceptor = response => {
    tracer.scoped(() => {
      tracer.setId(response.config.traceId);
      tracer.recordServiceName(serviceName);
      tracer.recordRpc((response.config.method || '').toUpperCase());
      tracer.recordBinary('http.status_code', response.status.toString());
      tracer.recordAnnotation(new Annotation.ClientRecv());
    });
    return response;
  };

  const rejectInterceptor = function (error) {
    return Promise.reject(error);
  };

  return {
    requestInterceptor,
    responseInterceptor,
    rejectInterceptor
  };
};