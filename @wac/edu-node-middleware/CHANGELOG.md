# @wac/edu-node-middleware

### 3.2.1
1. 新增望康学习中心、齐遇兴 公众号配置
### 3.2.0
1. logger 新增公共字段: real_ip, mini_app_id, mini_app_ver
2. logger logType、levelMap 新增类型用于粒度区分
3. logger 新增 expireEntryLog 函数
4. logger customLog 新增入参，增加自定义灵活度
5. logger logBizInfoResult 支持单个 ctx 只上报一次
### 3.1.7
1. 新增appId配置
### 3.1.6
1. 修复ucenterApi错误
### v3.1.5
1. wechatAuth 中间件 ctx.wechatInfo 新增 isSnapshotUser 参数
2. wechatAuth 中间件新增 hookWxAuth 参数，用于自定义微信授权逻辑
### v3.1.4
1. 更换java测试环境host
### v3.1.3
1. javalog 新增耗时
### v3.1.2
1. 新增日志：获取微信配置异常 'wx-config-error'
2. biz service response 的 code 不为0时日志上报
3. 优化: 自定义日志、BizInfo
### v3.1.1
1. 新增自定义日志

### v3.1.0
1. check-login 跳转到登录页面的处理权可交由外部处理 `handleLogin(ctx, {loginUrl})`

### v3.0.4
1. 新增 query-biz-info 中间件
2. check-login 新增逻辑
   - 微信环境下登录跳转的业务url（redirectUrl）新增新登录标识 _authPlatform === ${platform} (仅提供给wechat-auth中间件使用)
3. 微信授权中间件 wechat-auth: 
   - 新增 isDev, devMockWechatInfo；用于 mock 微信信息
   - 删除 wxConfig 入参，由内部逻辑承接 appId 获取等逻辑
   - 授权后的 ctx.wechatInfo 新增授权所用的 appid 与授权源（platform、品类、已授权列表等）

详情：https://wacai.feishu.cn/docs/doccnVCq6Q4dW8yk1G5FPC8gJlg#YSilS6

### v2.0.5
release in 2022-06-06
将 query 中的 wctk cookie 设置为 maxAge: 15天, httpOnly false.
### v2.0.3
release in 2022-05-25
小程序环境下将 query 中的 wctk 设置在 header: 'x-access-token'中
### v2.0.1
release in 2022-03-18
修正正式环境下 url protocol 的修改逻辑
### v2.0.0
release in 2022-02-18

1. 中间件 check-login 和 wechat-auth 调整入参，即内部部分逻辑交由外部自行处理了

### v1.0.13
release in 2022-2-16

update logger

### v1.0.12
release in 2022-2-16

check-login 内，非小程序会校验query上的wctk及其ip，接收的wctk值=`encodeURIComponent(挖财token + '@' + ip)` 或 挖财token

### v1.0.8
release in 2022-2-11
1. ctx.userInfo 新增手机号掩码输出 exportedMobile
2. 登录 auth 校验失败时，将用户中心的 errorCode 返回

### v1.0.6

release in 2021-9-14
1. lib/common.js 增加小程序字段 isMiniProgram

### v1.0.5
release in 2021-8

1. check-login 中 getBindWechat 支持 function 入参
2. check-login 白名单校验支持 restful 形式
3. wechat-auth 中需要授权的path校验规则更新，支持 restful 形式

### v1.0.4
release in 2021-7.20

logger 日志记录页面错误是增加 page_url

### v1.0.2
release in 2021-4.29

登录、微信授权

