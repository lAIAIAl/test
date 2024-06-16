# static-deploy

> 发布静态资源到挖财 CDN 服务器

## 使用

### 安装

```bash
$ wnpm i -D @wac/static-deploy
```

### 样例代码

```javascript

const deploy = require('@wac/static-deploy');

deploy({
	namespace: 'wacdn-file',
	path: 'finance/activities/2016',
	cwd: './build',
	imagemin: true
}).then((ret) => {
	// 发布异常
	if (ret.code !== 0) {
		return Promise.reject(ret.error);
	}
	
	// 发布成功
	console.log(ret); // { code: 0, data: { urls: ['xxx']} } 
}).catch((err) => {
	console.log(err.stack || err);
});

```

## 参数

#### namespace `string`

七牛空间名称, 目前支持 `wacdn-file`, `h5-page`, `sites`, `sites-test`。另外提供测试环境 `wacdn-test` (`test.wacdn.com`) 空间, 此为虚拟的"七牛空间"。其中 `wacdn-test`, `wacdn-file` 只支持非覆盖发布, 相同路径不同内容发布会失败, 其他空间支持覆盖发布。除 `wacdn-test` 外, 其他空间均支持文件预取和刷新缓存, [参考](https://support.qiniu.com/hc/kb/section/93685/)

各空间资源对应域名

```js
{
	'wacdn-file': 'http://s1.wacdn.com',
	'wacdn-test': 'http://test.wacdn.com',
	'h5-page': 'http://page.wacdn.com',
	'sites': 'http://sites.wacai.com',
	'sites-test': 'http://sites.test.wacdn.com',
}
```

默认: `wacdn-file`

#### env `string`

发布环境, 该参数已废弃, 建议直接设置 `namespace`

设置为 `test` 时, 发布空间 `namespace` 会强制设置 `wacdn-test`, 其他值时 `namespace` 为默认的 `wacdn-file`

#### path `string`

资源 url 路径, 可替代 `group`, `project` 参数, 

规则: `path` => path.join(`group`, `project`)

资源 url 规则: `http://${domain}/${path}/${filePath}`

默认: `""`

#### group `string`

项目组

默认: `""`

#### project `string`

项目名称

默认: `""`

#### cwd `string`

相对或绝对路径, 本地需要上传文件的目录, 生成资源 `url` 不包含该目录名称。

默认: `process.cwd()`
 
#### files `string`

需要发布的资源 `glob` 规则, 默认 `cwd` 下所有文件。 [语法参考](https://github.com/isaacs/node-glob#glob-primer)

默认: `**/*`

#### imagemin `boolean`

是否在发布服务器上对图片进行压缩

会做增量压缩, 减少发布时间和处理的麻烦, 建议开启。

默认: `false`

#### urls `array`

需要刷新缓存的 url 列表

支持覆盖发布的空间会对已上传的文件自动刷新

不建议依赖此功能刷新七牛缓存, 改变资源路径是更好的方式

默认: `[]`

#### debug `boolean`

开启 debug , 不删除上传处理过程中的临时文件

默认: `false`

#### \_\_URL\_\_ `string`

上传接口, fallback 或 debug 使用

默认: `http://deploy.wacdn.com/static-pack`

## 支持

有任何发布模块或上传接口的问题, 请咨询 `@号钟` `@瓷松`
