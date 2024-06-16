### 背景
* node直接从jasmine平台直接读取配置数据


### 目标
* 读取和存储jasmine配置数据
* 查询配置数据 
* 添加、修改配置


### 设计文档
* [文档](http://git.caimi-inc.com/client/js-jasmine/issues/1)


### 使用前注意事项
* [依赖jasmine配置平台](https://wacai.com/s/E4)
	* 需要找`@柏仁`添加主模块和子模块
	* Jasmine权限申请：https://wacai.com/s/E4

* 依赖 js-harmony，动态获取jasmine服务地址
	* [harmony文档](http://git.caimi-inc.com/client/js-harmony)
	
* 通过api添加、修改配置时，需要`@柏仁`开通模块权限，跟jasmine配置平台的权限不一样


### 接入 

```

npm i -S @wac/js-jasmine


```

#### 挂载

* 建议应用全局拥有一个Jasmine实例

```
const jasmine = require('@wac/js-jasmine')

app.jasmine = new Jasmine({
  env: 'test',
  unit: 'default',
  diskPath: path.join(__dirname, '../data')
})
    
```
* `env参数注意事项`：development环境请用test
* `unit参数注意事项`：请确认你的服务线上环境的部署单元

* 输入

|    name    | type     | value         |  remark | 
| :-------- |:------    | :------     | :------  | 
| env  | string | 'production' |  环境，挖财已有的环境包括：test, production, staging | 
| unit  | string | 'default' |  unit:  表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的 | 
| diskPath  | string |  path路径 | 项目根目录下（默认，可在初始化时设置）./jasmine/module/subModule/config.json | 

* 输出

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| jasmine  | class | jasmine实例 | jasmine实例 |



   
#### 数据ready通知

```
  app.jasmine.on('ready', () => {
  
  })
```


#### 获取模块全部配置

```
  const mod = ctx.app.jasmine.getModule('loan-leap', 'leap-h5')
  const con = await mod.getConfig()
  
```

* 输入

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| mainModule  | string | 'loan-leap' | 主模块名称 | 
| subModule  | string | 'leap-h5' | 子模块名称 | 

* 输出

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| con  | {} | {\"test\":\"测试修改配置\"} | 配置内容 |
| 不存在内容 | {} | {} | 不存在内容 |
| 接口错误  | {} | {code: 1, error: xxxx} | 接口错误 |




#### 根据key获取模块配置

```
  const mod = ctx.app.jasmine.getModule('loan-leap', 'leap-h5')
  const con = await mod.getConfigByKey('notification')
  
```

* 输入

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| mainModule  | string | 'loan-leap' | 主模块名称 | 
| subModule  | string | 'leap-h5' | 子模块名称 | 
| key  | string | 'notification' | key | 

* 输出

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| con  | {} | {\"test\":\"测试修改配置\"} | 配置内容 |
| 不存在内容 | {} | {} | 不存在内容 |
| 接口错误  | {} | {code: 1, error: xxxx} | 接口错误 |


#### 添加模块配置
* 需要`@柏仁`开通模块权限，跟jasmine配置平台的权限不一样

```
  const mod = ctx.app.jasmine.getModule('loan-leap', 'leap-h5')
  const result = await mod.add('addTest1111', {test:'测试add配置'})
  
```

* 输入

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| mainModule  | string | 'loan-leap' | 主模块名称 | 
| subModule  | string | 'leap-h5' | 子模块名称 | 
| key  | string | 'addTest1111' | key | 
| value  | * | {test:'测试add配置'} | 需要加的配置内容 | 

* 输出

|    name    | type     | value         | remark | 
| :-------- |:------    | :------     |:------     |
| code  | int | 0 | 成功：0，失败：1 |
| error  | string | '失败' | 错误内容 |

如：{code: 1, error: xxxx} ，`调用方需自己处理错误情况`

#### 修改模块配置
* 需要`@柏仁`开通模块权限，跟jasmine配置平台的权限不一样

```
  const mod = ctx.app.jasmine.getModule('loan-leap', 'leap-h5')
  const result = await mod.update('addTest1111', {test:'测试修改配置'})
  
```

* 输入、输出同上面 `添加模块配置`

### 单测

![image](http://git.caimi-inc.com/client/js-jasmine/uploads/ddb0bdd5cc227f5b5e8a1546aa25f905/image.png)


### 相关人员
* 开发：天星
* jasmine支持：柏仁