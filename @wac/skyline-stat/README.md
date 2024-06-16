# skyline-stat

> skyline 埋点组件，基于神策 js SDK 进行封装。关于神策埋点请[参考](https://www.sensorsdata.cn/manual/js_sdk.html)

## 使用方法

```
wnpm i -S  @wac/skyline-stat
```

```
import Stat from '@wac/skyline-stat'

Stat.init({
  environment: 'test',  // or 'production'
  projectName: 'skyline'
})
```


## 线上地址
UMD: https://s1.wacdn.com/c/wac/skyline-stat/1.2.0/index.js


## 配置说明

1. 默认会将点位上报到当前 app 所在的库中(需要 planck 对应升级)
2. 初始化后，会默认发送一个页面进入事件，不需要手动发送


### 手动埋点

示例，仅供参考

```js
import Stat from '@wac/skyline-stat'

Stat.init({
  environment: 'test',  // or 'production'
  projectName: 'skyline'
})

// 代理页面上所有含有 `data-stat` 属性的节点
$(document).on('click', '[data-stat]', (e) => {
  const target = $(e.currentTarget)
  const stat = JSON.parse(target.attr('data-stat')) // 属性值为 JSON 字符串

  Stat.send(stat.eventName, stat.params); // 方法参考下面 API `send`
})
```

HTML

```html
<button data-stat='{"eventName":"btnClick","params":{"aaa":"bbb"}}'>点我</button>
```

`eventName`、`params` 参数和 BI 约定即可

### 可视化埋点

在 `2.0.0` 之后，我们提供了可视化埋点的能力。只需要做少许的调整，即可使用：

+ 目标工程：

1. 安装 webpack 插件

```
wnpm i @wac/visual-config-injection-webpack-plugin -D
```

2. 修改 webpack 配置

```
const VisualConfigInjectionPlugin = require('@wac/visual-config-injection-webpack-plugin');

// webpack.config.js
{
  ...,
  plugins: [
    ...,
    new VisualConfigInjectionPlugin({ projectId, env })
  ]
}
```

3. 升级 Skyline

```
wnpm i @wac/skyline-stat@2 -S
```

4. 为 Skyline 增加配置项

```
import Skyline from '@wac/skyline-stat'

Skyline.init({
  environment: 'test', // or 'production'
  projectName: 'skyline',
  enableVisualTracking: true;
})
```

5. 接入完成


## API

### init(options)

`options` (Object) 初始化配置

> 在挖财 app 中时，environment、projectName、 appName 等会使用 native 端配置，即上报到所在 app 中。但也需配置（以供微信或者 pc 端)

- `environment` (String) 环境配置，与 projectName 配合使用 `必填`
  - 'test' or 'production' (测试或生产)
  - 会根据 environment 和 projectName 自动生成对应的 serverUrl
- `projectName`: (String) 项目名称， 即对应的生产仓库名  `必填`
- `serverUrl`  (String) 神策 url `已废弃`
  - 默认会从 native 端去取。取不到时，以设置的 serverUrl 为准（微信或者 pc 端)，serverUrl 应与自身 native 端设置的相同
- `appName`  (String) app 名称
  - 默认会从 native 端去取。取不到时，以设置的 appName 为准（微信或者 pc 端）
- `_setCustomVar` (Object) 自定义统计字段
  - 每个埋点请求都会带上
- `enableQALogging` (Boolean) [埋点 QA 工具](http://sakura.client.k2.test.wacai.info/sakura)上报开关,  [使用文档](http://git.caimi-inc.com/client/sakura/blob/master/docs/scene-qa.md#%E5%A6%82%E4%BD%95%E9%AA%8C%E8%AF%81)
  - 默认 `false`，**生产环境不要开启** (sakura 为验证埋点连通性工具，无 seesionId 时，sakura 中不会显示该数据)
- `showLog` (Boolean)  是否在网页控制台打 logger，显示发送的数据
  - 默认 `false`，生产环境不要开启
- `sourceChannel` (Array) 标准广告系列来源，一般不需要调整
  - 默认 `['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']`
- `sendType` (String) 发送方式， skyline 1.2 版本以后支持
  - 默认 'image'， 表示使用图片 get 请求方式发数据
  - 可选使用 'ajax' 和 'beacon' 方式发送数据，这两种默认都是 post 方式， beacon 方式兼容性较差， 具体详见 [神策文档](https://www.sensorsdata.cn/manual/js_sdk.html#141-%E6%99%AE%E9%80%9A%E5%8F%82%E6%95%B0)。

  ```
  Stat.init({
    _setCustomVar: {
      test: 2
    },
    enableQALogging: true,
    sendType: 'ajax'
  }}

  ```

  skyline 默认统计字段会以 `skl_` 开头，神策默认属性会以 `$` 开头，通过 `_setCustomVar` 设置的新增字段不能重名

  ```
  // skyline 默认统计字段
  `skl_login_id` 登录用户 uid
  `skl_token` 登录用户 token (加密版)
  `skl_raw_token` 登录用户 token (未加密版，服务端会把接收到skl_raw_token通过用户中心服务统一补充挖财的uid和userid，然后丢弃该参数)
  `skl_session_id` 用户会话   // 从 cookie 中取，默认 ''
  `skl_a_f` 活动统计        
  `skl_mc` 设备 mc       // 从 ua 中取，默认 ''
  `skl_version` 应用版本
  `skl_platform` 平台号   // 从 ua 中取，默认 -1
  `skl_app_name` 当前 app 名称
   ...
  ```

### send(eventName, params)

事件埋点

- `eventName` (String) 埋点事件
- `params` (Object) 埋点参数

```
Stat.send('login', {
    key: 'val'
})
```

### trackSinglePage(params)

> 初始化后，会默认发送一个页面进入事件，不需要手动发送。单页面中如想发送页面浏览事件，可使用此方法。

单页面中发送页面浏览事件。这个方法在页面 url 切换后调用，比如 react 可以在全局的 onUpdate 里来调用。其他框架使用类似的在全局的页面切换后调用。

由于 trackSinglePage 无法自定义事件名称，约定 pv 统计的 key 为：`skl_page`(value 为 string 类型)，否则数仓同学不予处理。


- `params` (Object) 埋点参数

```
Stat.trackSinglePage({
  key: 'val'
}}
```

#### 页面事件和普通事件的差异
- 页面进入事件会在初始化时默认发送，普通事件需要手动发送
- 页面事件在神策中的事件名固定，均为 `$pageview`, 普通事件的事件名为自定义的 `eventName`
- 页面事件会比普通事件默认多收集 referrer 等预置属性， 具体请看: [ $pageview（Web 浏览页面）事件的预置属性](https://www.sensorsdata.cn/manual/js_sdk.html#613-pageview%EF%BC%88web-%E6%B5%8F%E8%A7%88%E9%A1%B5%E9%9D%A2%EF%BC%89%E4%BA%8B%E4%BB%B6%E7%9A%84%E9%A2%84%E7%BD%AE%E5%B1%9E%E6%80%A7)


> [所有事件都会有的预置属性](https://www.sensorsdata.cn/manual/js_sdk.html#611-%E6%89%80%E6%9C%89%E4%BA%8B%E4%BB%B6%E9%83%BD%E4%BC%9A%E6%9C%89%E7%9A%84%E9%A2%84%E7%BD%AE%E5%B1%9E%E6%80%A7%EF%BC%9A)

> 除上述预置属性外， `$url`、`$url_path`、`$title`  也会默认收集

### 数据类型说明
> 事件名或属性名不满足条件的不能落库

> 属性值不满足条件的，会自动将该值删除，然后落库

- 事件名（event 的值）和属性名（params 中 key 取值）都需是合法的变量名，即不能以数字开头，**且只包含**：大小写字母、数字、下划线和$；
- params 只能是 object 类型。必须是 key: value 格式。且 value 只能是 string/number/date/boolean/array 这几种类型
- 属性值 （params 中 value 取值）为 object 的会被删除
- array 里的必须是字符串
- 相同属性名，在不同 event 中，必须保持类型一致。

示例：
```js
// 发送参数
{
dateOk: new Date(),
numberOk: 1111,
stringOk: '1111',
arrayOk: ['haha', 'hahaha'],
arrayTest: [111, 'hahaha', {test: 'test'}],
arrayNumFail: [11, 123],
objectFail: {
  aa: 1111,
  bb: 2222
}
}

// 实际接收参数
{
dateOk: new Date(),
numberOk: 1111,
stringOk: '1111',
arrayOk: ['haha', 'hahaha'],
arrayTest: ['hahaha']
}

```

### [点位验证](http://git.caimi-inc.com/client/sdk-skyline/blob/master/doc/1.0.0/export.md#%E9%AA%8C%E8%AF%81)