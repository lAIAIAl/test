# koa-logger

基于 [`bunyan`](https://github.com/trentm/node-bunyan) 的日志中间件, 关于 Node 日志, 请参考[日志监控](http://pages.wacai.info/client/document/doc/design/base/node/log-monitor.html)。

当用户按照 **安装使用** 完成配置之后，就自动接入公司运维体系：
+ Grail
+ Kibana

上述 2 个系统如何使用，请翻阅文档：
+ [Grail-QuickStart](http://pages.wacai.info/redalert/docs/docs/usages/quickstart.html)
+ [Kibana 使用 HOWTO 文档](http://git.caimi-inc.com/finance-loan-rd/devops/issues/4)

## 安装使用

> 环境依赖, Node 版本需要 v6 LTS 及以上, 本地开发和部署环境都需要升级, 参考[管理 Node 版本](http://pages.wacai.info/client/document/doc/design/base/node/version.html)。

```bash
npm i -S @wac/koa-logger
```

```js
const Koa = require('koa')
const logger = require('@wac/koa-logger')

const app = new Koa()

app.on('error', (err, ctx) => {
  ctx && ctx.log.error(err)
})

// 日志中间件靠前加载
app.use(logger(app))

app.use(async (ctx, next) => {
  ctx.log.debug({method:ctx.method}, 'debug message')
  ctx.log.info(`request url ${ctx.url}`)
  ctx.log.warn({uid: 'test'}, 'do something warning')
  ctx.log.error(new Error('xxx'))
})

app.listen(8080, () => {
  app.log.info('server started at 8080')
})
```

本地开发环境终端输出

```bash
17:52:49,737  INFO test (Program/client/koa-logger/example/readme.js:19 in app.listen): server started at 8080
17:52:59,580 DEBUG test (Program/client/koa-logger/example/readme.js:12 in app.use): debug message (trace_id=67b76ce2-3509-4beb-b64c-f705f43b01dd, method=GET)
17:52:59,582  INFO test (Program/client/koa-logger/example/readme.js:13 in app.use): request url / (trace_id=67b76ce2-3509-4beb-b64c-f705f43b01dd)
17:52:59,584  WARN test (Program/client/koa-logger/example/readme.js:14 in app.use): do something warning (trace_id=67b76ce2-3509-4beb-b64c-f705f43b01dd, uid=test)
17:52:59,586 ERROR test (Program/client/koa-logger/example/readme.js:15 in app.use): xxx (trace_id=67b76ce2-3509-4beb-b64c-f705f43b01dd)
    Error: xxx
        at app.use (/Users/L3au/Program/client/koa-logger/example/readme.js:15:17)
        at dispatch (/Users/L3au/Program/client/koa-logger/node_modules/koa-compose/index.js:44:32)
        at next (/Users/L3au/Program/client/koa-logger/node_modules/koa-compose/index.js:45:18)
        at requestLogger (/Users/L3au/Program/client/koa-logger/lib/logger.js:130:12)
        at logger (/Users/L3au/Program/client/koa-logger/lib/logger.js:80:14)
        at dispatch (/Users/L3au/Program/client/koa-logger/node_modules/koa-compose/index.js:44:32)
        at /Users/L3au/Program/client/koa-logger/node_modules/koa-compose/index.js:36:12
        at Server.<anonymous> (/Users/L3au/Program/client/koa-logger/node_modules/koa/lib/application.js:135:7)
        at emitTwo (events.js:106:13)
        at Server.emit (events.js:191:7)
17:52:59,596  WARN test (Program/client/koa-logger/lib/logger.js:125 in onResponseFinished): GET / 404 16ms (trace_id=67b76ce2-3509-4beb-b64c-f705f43b01dd, duration=16)
    GET / HTTP/1.1
    remote: ::1:53607
    host: localhost:8080
    user-agent: curl/7.43.0
    accept: */*
    --
    HTTP/1.1 404 Not Found
    HTTP/1.1 404 Not Found
    Content-Type: text/plain; charset=utf-8
    Content-Length: 9
    Date: Tue, 13 Dec 2016 09:52:59 GMT
    Connection: keep-alive
10:59:18,649  INFO test (Program/client/koa-logger/example/readme.js:23 in app.listen): server started at 8080
10:59:26,286 DEBUG test (Program/client/koa-logger/example/readme.js:16 in app.use): debug message (trace_id=aea223ad3a10042a8edf0263df0d3868, session_id="", method=GET)
10:59:26,288  INFO test (Program/client/koa-logger/example/readme.js:17 in app.use): request url / (trace_id=aea223ad3a10042a8edf0263df0d3868, session_id="")
10:59:26,288  WARN test (Program/client/koa-logger/example/readme.js:18 in app.use): do something warning (trace_id=aea223ad3a10042a8edf0263df0d3868, session_id="", uid=test)
10:59:26,289 ERROR test (Program/client/koa-logger/example/readme.js:19 in app.use): xxx (trace_id=aea223ad3a10042a8edf0263df0d3868, session_id="")
    Error: xxx
        at app.use (Program/client/koa-logger/example/readme.js:19:17)
        at dispatch (Program/client/koa-logger/node_modules/koa-compose/index.js:44:32)
        at next (Program/client/koa-logger/node_modules/koa-compose/index.js:45:18)
        at requestLogger (Program/client/koa-logger/lib/logger.js:132:12)
        at logger (Program/client/koa-logger/lib/logger.js:84:14)
        at dispatch (Program/client/koa-logger/node_modules/koa-compose/index.js:44:32)
        at Program/client/koa-logger/node_modules/koa-compose/index.js:36:12
        at Server.handleRequest (Program/client/koa-logger/node_modules/koa/lib/application.js:136:14)
        at emitTwo (events.js:106:13)
        at Server.emit (events.js:194:7)
10:59:26,298  WARN test (Program/client/koa-logger/lib/logger.js:129 in onResponseFinished): GET / 404 12ms (trace_id=aea223ad3a10042a8edf0263df0d3868, session_id="", duration=12)
    GET / HTTP/1.1
    remote: ::1:53780
    host: localhost:8080
    connection: keep-alive
    cache-control: max-age=0
    upgrade-insecure-requests: 1
    user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
    accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    dnt: 1
    accept-encoding: gzip, deflate, sdch, br
    accept-language: en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,el;q=0.2
    cookie: JSESSIONID=671A0CA9FBB8B5243DEE191137C62847
    --
    HTTP/1.1 404 Not Found
    HTTP/1.1 404 Not Found
    Content-Type: text/plain; charset=utf-8
    Content-Length: 9
    Date: Fri, 26 May 2017 02:59:26 GMT
    Connection: keep-alive
```

线上环境日志参考

```js
{"hostname":"tianji.local","pid":17420,"timestamp":1495767804330,"message":"server started at 8080","level_number":30,"level_name":"info"}
{"hostname":"tianji.local","pid":17420,"trace_id":"d34696e03af99cfbac313fd0fece30ff","session_id":"","timestamp":1495767807129,"message":"request url /","level_number":30,"level_name":"info"}
{"hostname":"tianji.local","pid":17420,"trace_id":"d34696e03af99cfbac313fd0fece30ff","session_id":"","uid":"test","timestamp":1495767807130,"message":"do something warning","level_number":40,"level_name":"warn"}
{"hostname":"tianji.local","pid":17420,"trace_id":"d34696e03af99cfbac313fd0fece30ff","session_id":"","error_name":"Error","stack":"Error: xxx\n    at app.use (Program/client/koa-logger/example/readme.js:19:17)\n    at dispatch (Program/client/koa-logger/node_modules/koa-compose/index.js:44:32)\n    at next (Program/client/koa-logger/node_modules/koa-compose/index.js:45:18)\n    at logger (Program/client/koa-logger/lib/logger.js:87:12)\n    at dispatch (Program/client/koa-logger/node_modules/koa-compose/index.js:44:32)\n    at Program/client/koa-logger/node_modules/koa-compose/index.js:36:12\n    at Server.handleRequest (Program/client/koa-logger/node_modules/koa/lib/application.js:136:14)\n    at emitTwo (events.js:106:13)\n    at Server.emit (events.js:194:7)\n    at parserOnIncoming (_http_server.js:563:12)","timestamp":1495767807130,"message":"xxx","level_number":50,"level_name":"error"}
```

> `data` 字段为用户自定义输出的字段，`message` 为自定义信息或 `Error.stack`

## 配置参数

### logger(app, [opts])

- app - koa 应用实例
- opts - 配置参数
  - name {String} - 应用名
  - group {String} - group 名
  - src {Boolean} - 是否记录日志源(文件、行号、函数)，development 默认为 `true`， 其余默认 `false`。
  - env {String} - 日志环境 ['development', 'test', 'staging', 'production' ]
  - levelMap {Object} - 不同环境对应日志级别
  - reportHermes {Boolean} - 是否上报 hermes，默认`false`，开启此选项建议完整了解该功能的使用方法，如有问题请咨询 @苏枋

`name`、`group` 默认从项目 `package.json` 中读取

`env` 为 `process.env.NODE_ENV` 环境变量, 默认为 `development`

以上参数不建议手动传入

`levelMap` 默认配置如下

```js
{
  'development': 'debug',
  'test': 'info',
  'staging': 'info',
  'production': 'info'
}
```

## 日志输出

开发环境(`development`)、测试(`test`) 只会将日志输出到终端

预发(`staging`)、生产环境(`production`), 只会输出到文件

同时, 只有开发环境记录 `HTTP` 请求日志, 非开发环境只记录应用日志

项目目录为 `projectDir`, 则日志文件存储路径为

```js
path.join(projectDir, '../logs/${group}/${name}/app_log/monitor/${name}.log')
```

示例

```bash
/data/program/logs/com.wacai/bbs-node/app_log/monitor/bbs-node.log
```

## API 方法

`app` 对象和每次请求上下文 `ctx`上都挂载一个 `log` 对象(不是方法), `ctx` 的 `log` 是 app 的一个 `child log`([参考](https://github.com/trentm/node-bunyan#logchild))

`ctx.log` 自动生成 `trace_id` 参数, 是记录整个请求的标记, 即本次请求所有 `ctx.log` 输出的日志都会带上相同 `trace_id`, 也可通过 `ctx.traceId` 获取

### `ctx.log`

log 对象上方法还有 `log.trace` 和 `log.fatal` , 但建议只使用下面四个, [参考](https://github.com/trentm/node-bunyan#log-method-api)

##### ctx.log.debug 调试信息, 本地开发使用
##### ctx.log.info 一般信息
##### ctx.log.warn 警告信息
##### ctx.log.error 错误信息

#### `ctx.log.info([obj], msg, [...])`

示例

```js
const log = ctx.log

log.debug({foo: 'bar'}, 'debug message')

log.info('info message');
log.info({foo: 'bar'}, 'info message');

log.warn('warning message')
log.warn({foo: 'bar'}, 'warning message')

log.error(new Error('xxx'))
log.error(new Error('xxx'), 'error message')
```

### `ctx.time(label)` 和 `ctx.timeEnd(label)`

> INFO 级别日志

统计两个方法之间的时间, 类似 `console.time` 和 `console.timeEnd`

```js
app.use(async (ctx) => {
  ctx.time('request items')

  await request(items)

  ctx.timeEnd('request items')
})
```

两个方法需要配套使用, 可以分布在不同中间件甚至 `service` 里, 在同一个上下文即可

### 使用注意

遵循 [redalert 日志输出](http://git.caimi-inc.com/redalert/docs#%E6%97%A5%E5%BF%97%E8%BE%93%E5%87%BA) 规范。以一层 **KV** 为准。
对于嵌套的 **KV**，本插件会使用 `util.inspect` 对其进行处理，变成一层 **KV**。

保留字段
+ level_number
+ level_name
+ error_name
+ stack
+ message
+ hostname
+ trace_id
+ session_id
+ pid
+ timestamp
+ label
+ duration

#### 字段说明

基础字段（所有都会打出）
+ timestamp // 时间戳，单位 ms
+ level_number // 日志级别，[levels](https://github.com/trentm/node-bunyan#levels)
+ level_name // 'trace', 'debug', 'info', 'warn', 'error', 'fatal'
+ pid // 进程ID
+ hostname // 主机名

在一个会话（HTTP）请求中
+ trace_id // 全链路跟踪唯一ID
+ session_id // 回话ID

异常情况下
+ error_name // err.name
+ message // err.message
+ stack // error.stack

时间计时
+ label // 计时标志
+ duration // 耗时，单位：ms

logger 所有方法第一个参数建议为对象, 且只有一层, 不要有嵌套数据, 第二个及以后参数为字符串。或者所有参数都是字符串, **会合并成一个 `message` 字段**。

`log.debug` 建议本地开发使用, 用于调试, 不会在其他环境执行, 所以也不需要从代码中移除

`log.error(err)` 第一个参数必须为 `Error` 对象实例

### 高级使用

#### `log.child`

生成新的 logger 对象, 生成日志包含统一额外的字段, 概念参考 [log.child](https://github.com/trentm/node-bunyan/#logchild)

示例

```js
app.use(async (ctx, next) => {
  ctx.log = ctx.log.child({
    uid: '1000'
  })

  return await next()
})

app.use(async (ctx) => {
  ctx.log.info({foo: 'bar'}, 'message')
})
```

则新 `ctx.log` 打的所有日志都会带上 `uid: 1000`

#### 修改日志输出级别

> 如做测试时, 测试文件里可设置为 `fatal`, 禁用绝大部分日志输出

```js
app.log.level('error') // 同时也会修改 ctx.log 输出级别, 只输出 error 日志

或

ctx.log.level('warn') // 只影响 ctx.log, 只输出 warn、error 日志
```

### koa 1 支持

默认支持 `koa 2`, 可以通过 [`koa-convert`](https://github.com/koajs/convert#convertback) 转换支持 `koa 1`

```js
const convert = require('koa-convert')
const logger = require('@wac/koa-logger')

const app = require('koa')()

app.use(convert.back(logger(app)))

app.listen(8080)
```
