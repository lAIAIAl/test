import classNames from 'classnames'
import { page } from 'decorator'
import T from 'prop-types'
import React, { Component } from 'react'
import './index.less'

@page()
class QRCodeWxCommon extends Component {
  componentDidMount() {
    // const { channelInfo = {} } = this.props
    // if (channelInfo.name === 'xmly') {
    //   /// 初始化喜马拉雅代码
    //   (function (win, doc, src, version) {
    //     // eslint-disable-next-line no-console
    //     console.log('set base code:', channelInfo.data.xmly_app)
    //     var sc = doc.createElement('script')
    //     sc.type = 'text/javascript'
    //     sc.src = src + '?v=' + version
    //     win.XMLY_ADOCPC_APPKEY = channelInfo.data.xmly_app
    //     var s = document.getElementsByTagName('script')[0]
    //     s.parentNode.insertBefore(sc, s)
    //     var xmlyAdLog = win.xmlyAdLog = win.xmlyAdLog || []
    //     xmlyAdLog.track = xmlyAdLog.track || function (type, msg) {
    //       xmlyAdLog.push([type, msg])
    //     }
    //   })(window, document, '//s1.xmcdn.com/yx/ad-jssdk-static/last/dist/app.min.js', new Date().getTime())
    //   window.xmlyAdLog.track(channelInfo.data.xmly_type, { key: channelInfo.data.xmly_key })
    // }
  }

  render() {
    const { data } = this.props
    return (
      <div
        className={classNames({
          'm-qrcode-teacger-page': true,
          'm-qrcode-teacger-page-wechat': true,
        })}
      >
        {/* <NavBar divider={false} /> */}
        <div className={'container'}>
          <div className={'background'}>
            <img className={'img'} src={data.url || ''} />
            <div className="tip-container">
              <div className="tip-prefix">长按无法识别</div>
              <div className="online-service-entrance">
                <a href="https://help.wacai.com/help/customerCenter/common/entrance?entranceId=9017">
                  请联系客服
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

QRCodeWxCommon.propTypes = {
  // 渠道信息
  // channelInfo: T.object,
  // isWechat: T.bool,
  data: T.object,
}

export default QRCodeWxCommon
