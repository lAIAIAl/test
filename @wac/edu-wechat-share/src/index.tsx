import * as React from 'react'
import { getWechatSignature } from './api'
import { WechatShareProps } from './interface'
const defaultWxConfig = {
  appId: 'wxf25c265ad00db0b8', // 挖财钱堂学院
  debug: false,
  openTagList: ['wx-open-launch-weapp'],
  jsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    // 'updateAppMessageShareData',
    // 'updateTimelineShareData',
  ],
}
export default class WechatShare extends React.Component<WechatShareProps, {}> {
  static defaultProps = {
    wxConfig: defaultWxConfig,
    imgUrl: 'https://s1.wacdn.com/wis/539/069cc225b1020cef_200x200.png',
    type: 'link',
    dataUrl: '',
  }

  componentDidMount() {
    window.wx = require('weixin-js-sdk')
    this.initWxConfig()
  }

  async initWxConfig() {
    const {
      wxConfig: { debug, appId, jsApiList, openTagList, ...rest },
      wechatSignatureUrl,
      wxReadyCallback,
    } = this.props
    const authRes = await getWechatSignature({
      url: wechatSignatureUrl,
      params: {
        appId,
      },
    })
    if (authRes) {
      const { timeStamp, nonceStr, signature } = authRes
      window.wx.config({
        debug: debug || defaultWxConfig.debug,
        appId: appId || defaultWxConfig.appId, // 必填，公众号的唯一标识
        timestamp: timeStamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: jsApiList || defaultWxConfig.jsApiList, // 必填，需要使用的JS接口列表
        openTagList: openTagList || defaultWxConfig.openTagList,
        ...rest,
      })
      const self = this
      window.wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        self.registerWxShareApi('onMenuShareTimeline')
        self.registerWxShareApi('onMenuShareAppMessage')
        // self.registerWxShareApi('updateAppMessageShareData')
        // self.registerWxShareApi('updateTimelineShareData')
        wxReadyCallback && wxReadyCallback(window.wx)
      })

      window.wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        /* eslint-disable-next-line */
        console.log('wx error: ', res)
      })
    } else {
      // request_auth fail
    }
  }

  registerWxShareApi = (eventName) => {
    const { title, desc, link, imgUrl, type, dataUrl, onSuccess, onCancel } = this.props
    const conf = {
      title: typeof title === 'function' ? title() : title, // 分享标题
      desc: typeof desc === 'function' ? desc() : desc, // 分享描述
      link: typeof link === 'function' ? link() : link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: typeof imgUrl === 'function' ? imgUrl() : imgUrl, // 分享图标
      type,
      dataUrl,
      success: function () {
        // 'updateAppMessageShareData' 和 'updateTimelineShareData', 设置成功就调用
        // 'onMenuShareTimeline' 和 'onMenuShareAppMessage', 用户点击了分享才会调用
        onSuccess && onSuccess()
      },
      cancel: function () {
        onCancel && onCancel()
      },
    }
    window.wx[eventName](conf)
  }

  render() {
    return null
  }
}
