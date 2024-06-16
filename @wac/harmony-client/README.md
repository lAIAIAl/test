# harmony-client

服务发现（Harmony），Node.js 客户端

## 安装

```bash
npm install @wac/harmony-client
```

## 用法

```js
const Harmony = require('@wac/harmony-client')

const harmony = new Harmony()

harmony.on('error', err => {
  console.error(err)
})

await harmony.ready()
```

## 构造函数

```js
const harmony = new Harmony({
  env: 'test' // 环境 test, staging, production，默认 process.env.NODE_ENV
  crossUnit: 1 // 是否进行跨单元路由寻址 1：开启，2：关闭，默认开启
  cacheDir: '/your/app/.harmony', // 缓存目录，默认应用根路径 .harmony/ 下
  probeInterval: 3000 // 探测间隔，默认 3s
})
```

## API

* getNodeList(domain, options)，获取服务域名可用的节点列表
  * domain \<String\>，广义的服务域名
  * opts.unit \<String\>，机房单元 hzifc、hzqsh、hzxs
  * opts.tags \<Object\>，路由标签，默认为空

```js
const ret = await harmony.getNodeList('jasmineserver.wacai.info', {
  unit: 'hzifc',
  tags: { appGroup: 'dev-middleware-dannong' }
})

// [
//   {
//     host: '172.16.83.175',
//     port: 8080,
//     weight: 10
//   },
//   {
//     host: '172.16.89.176',
//     port: 8080,
//     weight: 10
//   }
// ]
```

* getNode(domain, options)，获取服务域名可用的节点
  * 参数同上

> 按权重随机获取某一个节点信息

```js
const ret = await harmony.getNode('jasmineserver.wacai.info', {
  unit: 'hzifc',
  tags: { appGroup: 'dev-middleware-dannong' }
})

// {
//   host: '172.16.83.175',
//   port: 8080
// }
```

选取算法：

* 权重`weight`为 -1 代表该节点不健康，大于 0 表示健康，优先选取健康节点
* 在健康节点中，按权重选取其一
* 若所有节点均不健康，则随机返回一个节点

## 设计文档

http://git.caimi-inc.com/trinity/discussions/issues/550

## 开发人员
@sufang
