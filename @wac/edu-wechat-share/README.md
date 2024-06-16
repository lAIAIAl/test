# @wac/edu-wechat-share
> 财商教育线使用的微信分享

## 安装
``` bash
wnpm i --save-dev @wac/edu-wechat-share
```

## 使用
``` js
import WechatShare from '@wac/edu-wechat-share'

<WechatShare
  wechatSignatureUrl="http://live.wac-edu.k2.wacaiyun.com/wac/xuexi/api/tripartite/wechat-signature"
  title="挖财【小白理财训练营】免费报名啦，7天入门理财赚钱啦！"
  imgUrl="https://s1.wacdn.com/wis/539/069cc225b1020cef_200x200.png"
  desc="金融大咖直播授课，社群班主任带学，快速入门理财赚钱"
  link={() => {
    let shareLink = Util.changeURLArg(
      commonData.shareUrl || window.location.origin + '/wac/xuexi/activity/share/router',
      'shareCode',
      shareCode,
    )
    shareLink = Util.changeURLArg(shareLink, 'a_f', 'BSE_qtxyzbjw_001')
    return shareLink
  }}
  onSuccess={() => {}}
/>
```

## API 
| 属性                 | 类型                        | 是否必填 | 默认值                                                       | 备注                                                         |
| -------------------- | --------------------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| wxConfig.debug       | boolean                     | N        | false                                                        | 见 wx.config                                                 |
| wxConfig.appId       | string                      | Y        | 'wxf25c265ad00db0b8'                                                          | 挖财钱堂学院公众号的appid                                                 |
| wxConfig.jsApiList   | string[]                    | Y        | ['onMenuShareTimeline','onMenuShareAppMessage']              | 见 wx.config                                                 |
| wxConfig.openTagList | string[]                    | N        | ['wx-open-launch-weapp']                                     | 见 wx.config                                                 |
| wxConfig[prop]       | any                         | N        | -                                                            | 见 wx.config  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#63                                              |
| wechatSignatureUrl   | string                      | N        | ${location.origin}/wac/xuexi/api/tripartite/wechat-signature | 获取微信签名的api，接口响应值需为{code: 0, data: {timeStamp, nonceStr, signature}} |
| title                | string , func              | Y        | -                                                            | 分享标题                                                     |
| desc                 | string , func              | N        | -                                                            | 分享描述                                                     |
| link                 | string , func              | Y        | -                                                            | 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 |
| imgUrl               | string , func              | N        | 'https://s1.wacdn.com/wis/539/069cc225b1020cef_200x200.png'  | 分享图标                                                     |
| type                 | 'music' , 'video' , 'link' | N        | 'link'                                                       | 分享类型                                                     |
| dataUrl              | string                      | N        | ''                                                           | 如果type是music或video，则要提供数据链接                     |
| onSuccess            | func                        | N        | -                                                            |       分享成功后的的回调                                                       |
| onCancel             | func                        | N        | -                                                        |                                                              |
| wxReadyCallback      | (wx) => void                 | N        | -                                                        |        wx.ready 内会调用改函数                         |
