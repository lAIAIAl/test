type func = () => void
export interface WechatShareProps {
  wxConfig: {
    debug?: boolean
    appId?: string
    jsApiList?: any[]
    openTagList?: any[]
    [prop: string]: any
  }
  wechatSignatureUrl?: string // 获取微信签名的api
  wxReadyCallback?: (wx: any) => void // 可处理 wx.ready 后的操作
  title: string | func // 分享标题
  desc?: string | func // 分享描述
  link: string | func // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl?: string | func // 分享图标
  type?: 'music' | 'video' | 'link' // 分享类型,music、video或link，不填默认为link
  dataUrl?: string // 如果type是music或video，则要提供数据链接，默认为空
  onSuccess?: func
  onCancel?: func
}
