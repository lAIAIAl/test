# Papaya api map

Papaya 脚手架 url 映射组件，根据浏览器请求路径和当前服务的运行环境生成真实的服务端地址。

- 支持多环境接口地址映射（development、test、staging、production）

- 支持多服务接口地址映射（多组服务端域名映射）

## Installation

```shell
  $ wnpm i --save @wac/papaya-api-map
```

## 基本用法

```js
  const papayaApiMap = require('@wac/papaya-api-map')
    
  const rules = {
    // 服务域名
    host: {
      development: 'http://localhost:9005/mock',
      test: 'http://api.test.wacai.info',
      staging: 'http://api.staging.wacai.info',
      production: 'http://api.wacai.info'
    }
  }]
    
  const mapper = papayaApiMap(rules)
  
  // NODE_ENV = 'development'
  mapper('/api/query') // http://localhost:9005/mock/app/query

  // NODE_ENV = 'test'
  mapper('/api/query') // http://api.test.wacai.info/api/query
```

`host` 可以为以环境变量作为 key 的 map，或者是固定的地址

我们会根据当前的环境变量获取实际的 host，并和传入的 path 合并成实际的服务端请求地址

## 路径映射规则

```js
  const papayaApiMap = require('@wac/papaya-api-map')
    
  const rules = {
    // 服务域名
    host: defaultHost,
    // 映射规则
    map: {
      // 正常映射 
      '/api/query': '/app/query',
      // 正则映射，多用于 RESTful 接口，请正确的使用"()" 和 $x 设置 
      '/api/update/(\\d+)': '/app/update/$1',
       // 固定映射模式，会直接返回对应的地址 
      '/api/delete': 'https://www.api.com/app/delete'
    }
  }
    
  const mapper = papayaApiMap(rules)
  
  // 默认匹配
  mapper('/api/query') // defaultHost + /app/query

  // 正则匹配
  mapper('/api/update/123') // defaultHost + /app/update/123

  // 无匹配，按原路径处理
  mapper('/api/create') // defaultHost + /api/create
  
  // 匹配结果为 URL，直接返回该 URL
  mapper('/api/delete') // https://www.api.com/app/delete
```

可以通过 `map` 字段对 path 进行处理，支持正则映射

如果映射得到的结果为 URL （ `http` 或 `https` 开头的字符串）时，`mapper` 方法会直接返回该结果

如果路径没有对应的匹映射规则，按原路径处理

## 多服务映射

```js
  const papayaApiMap = require('@wac/papaya-api-map')
    
  const rules = [{
    // 匹配模式
    match: /^\/my-api/,
    host: myHost
  }, {
    // 默认匹配服务域名
    host: defaultHost
  }]
    
  const mapper = papayaApiMap(rules)
 
  mapper('/my-api/query') // myHost + /api/query  
  mapper('/api/query') // defaultHost + /api/query
```

可以通过添加` match` 字段和多个映射规则支持多服务转发

请注意：按顺序匹配 `match`  规则，请确保所有的路径都能被正确匹配，如果全部匹配失败会将传入的参数原样返回

推荐最后一条规则不要添加 `match` 参数，作为默认规则

## API

### props

|name|type|required|default|description|
|----|----|--------|-------|-----------|
|rules|object / object[]|✓||参考下面的详细配置|

#### rules 元素属性

| name  | type                                   | required | default    | description                                                  |
| ----- | -------------------------------------- | -------- | ---------- | ------------------------------------------------------------ |
| match | RegExp / function(path:string):boolean |          | () => true | 路径匹配规则，可以是正则表达式或是函数                       |
| host  | object / string                        |          |            | 不同环境对应的服务端域名映射对象（如果是对象，则会根据环境变量 `NODE_ENV` 获取当前环境） |
| map   | object / function(path:string):string  |          |            | 路径映射规则，如果是对象（对象 key 支持正则表达式），map 的 key 请以 / 开头 \| |

## Issues

[issues here](http://git.caimi-inc.com/client/papaya-api-map/issues)

## Changelog

[CHANGELOG.md](http://git.caimi-inc.com/client/papaya-api-map/blob/master/CHANGELOG.md)
