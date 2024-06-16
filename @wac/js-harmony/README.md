### 背景
* node直接从harmony读取ip或数据


### 目标
* 输出ip+port
* 输出接口数据


### 接入

```

npm i -S @wac/js-harmony


```

```
server.js

const harmony = require('@wac/js-harmony')

    // const defaultOptions = {
    //   env: 'production', // 环境，挖财已有的环境包括：test, production, staging
    //   unit: 'default', // unit:  表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的jasmine服务器地址
    //   crossUnit: 2 // 默认为2。需要跨单元的场景只需要在查询时加上crossUnit参数 1:支持跨单元 2:不支持；跨单元指的是,在本单元没有可服务的节点时,流量路由到中心单元
    // }

const env = process.env.NODE_ENV === 'development' ? 'test' : process.env.NODE_ENV
const unit = process.env.NODE_ENV === 'production' ? 'hzqsh' : 'default'
app.use(harmony.init({ env: env, unit: unit }))

```

### 使用

	* 获取ip+port 

```
const harmony = require('@wac/js-harmony')

const ip = await harmony.getServer('jasmineserver.wacai.info')

返回：
{
	host: "172.16.49.173", 
	port: 8080, 
	weight: 10
}
```

  * 获取data
	

```
const harmony = require('@wac/js-harmony')

  const data = await harmony.getData({
    url: 'http://jasmineserver.wacai.info/jasmine/getConfig',
    qs: {
      module: 'jasmine_demo',
      subModule: 'quick_start',
      key: 'test'
    }
  })
  
  返回：
  {
    "code":0,
    "data":{
        "value":"hello jasmine",
        "version":3066
    }
  }
```


### 技术实现

![image](http://git.caimi-inc.com/client/leap-doc/uploads/fbda28883c0e7ae83bc9ebb6f1e0beb1/image.png)



* 流程图
	* 轮询获取harmony-serverIPList，间隔5分钟

	![image](http://git.caimi-inc.com/client/leap-doc/uploads/46c3b1de8e50feada90ee6bab8272128/image.png)

	* 轮询获取harmony-jasmineIPList，间隔30秒
	
	![image](http://git.caimi-inc.com/client/leap-doc/uploads/47919427bc5a5cf84e6573bb37fd74f9/image.png)



#### api接口
[文档](http://git.caimi-inc.com/wac-base/jasmine/wikis/http-api)

#### init
* params
	* unit: 表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的jasmine服务器地址
	* env: 表示环境，通过环境变量APP_ENV获取，挖财已有的环境包括：test, production, staging

* 启动
	* 开始轮询 


#### harmony


* ServerIPList
	* setTimeout轮询，间隔5分钟
	* 请求地址：http://api.cell.wacai.info/harmony/getServerList
		* [步骤1](http://git.caimi-inc.com/wac-base/jasmine/wikis/http-api)
		* 返回data存在内存中，harmonyServerList
		

* JasmineIPList
	* setTimeout轮询，间隔30秒
	* 请求地址：http://172.16.74.37:8080/harmony/v1/api/filterRealNodes
		* ip、port从内存harmonyServerList获取
		* [步骤2](http://git.caimi-inc.com/wac-base/jasmine/wikis/http-api)
		* 返回data存在内存中，jasmineServerList


### 单测

![image](http://git.caimi-inc.com/client/kuaidai-loan/uploads/62b565ddcb80bc57723179e33c3417c8/image.png)


### 相关人员
* 开发：天星