'use strict';
/* istanbul ignore next */

var url = require('url');
/* istanbul ignore next */


var _require = require('@wac/zipkin-util'),
    InetAddress = _require.InetAddress,
    Annotation = _require.Annotation,
    httpHeaders = _require.httpHeaders,
    createTracer = _require.createTracer;
/* istanbul ignore next */


module.exports = function (tracerConfig) {
  var serviceName = tracerConfig.serviceName;
  var tracer = createTracer(tracerConfig);

  var requestInterceptor = function requestInterceptor(req) {
    return tracer.scoped(function () {
      if (!tracer._ctxImpl.getContext()) {
        tracer.setId(tracer.createRootId());
      } else {
        tracer.setId(tracer.createChildId());
      }

      var traceId = tracer.id;
      req.traceId = traceId;
      var addr = InetAddress.getLocalAddress().addr;
      var headers = req.headers || {};
      headers[httpHeaders.TraceId] = traceId.traceId;
      headers[httpHeaders.SpanId] = traceId.spanId;
      headers[httpHeaders.Sampled] = true;
      headers[httpHeaders.Client] = addr;

      if (!headers[httpHeaders.RatelFork]) {
        headers[httpHeaders.RatelFork] = Date.now();
      }

      traceId._parentId.ifPresent(function (psid) {
        headers[httpHeaders.ParentSpanId] = psid;
      });

      var method = req.method || 'get';
      tracer.recordServiceName(serviceName);
      tracer.recordRpc(method.toUpperCase());
      tracer.recordBinary('http.url', encodeURIComponent(url.parse(req.url).pathname));
      tracer.recordAnnotation(new Annotation.ClientSend());
      tracer.recordLocalAddr(addr);
      tracer.recordBinary('component', 'nodejs');
      return req;
    });
  };

  var responseInterceptor = function responseInterceptor(response) {
    tracer.scoped(function () {
      tracer.setId(response.config.traceId);
      tracer.recordServiceName(serviceName);
      tracer.recordRpc((response.config.method || '').toUpperCase());
      tracer.recordBinary('http.status_code', response.status.toString());
      tracer.recordAnnotation(new Annotation.ClientRecv());
    });
    return response;
  };

  var rejectInterceptor = function rejectInterceptor(error) {
    return Promise.reject(error);
  };

  return {
    requestInterceptor: requestInterceptor,
    responseInterceptor: responseInterceptor,
    rejectInterceptor: rejectInterceptor
  };
};