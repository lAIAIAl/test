const OAuth = require('wechat-oauth')
const TIME_OUT = 7100 // 单位秒
module.exports = class WechatOauth {
  constructor({ appid, appsecret, isMiniProgram = false, store }) {
    this.store = store
    this.clientOAuth = new OAuth(
      appid,
      appsecret,
      store && store.getJSON
        ? async (openid, callback) => {
            // 传入一个根据openid获取对应的全局token的方法
            // 在getUser时会通过该方法来获取token
            const data = await store.getJSON(`${openid}:token`)
            callback(null, data)
          }
        : null,
      store && store.getJSON
        ? async (openid, token, callback) => {
            // 请将token存储到全局，持久化时请注意，每个openid都对应一个唯一的token!
            await store.setJSON(`${openid}:token`, token, {
              timeout: TIME_OUT,
            })
            callback(null)
          }
        : null,
      isMiniProgram,
    )
  }

  /**
   * 微信个人信息授权
   * {
   *  openid: 'openid',
   *  nickname: 'Buddy',
   *  sex: 1,
   *  language: 'zh_CN',
   *  city: '',
   *  province: '',
   *  country: 'Cuba',
   *  headimgurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32',
   *  privilege: [],
   *  unionid: 'unionid',
   *  accessToken: 'accessToken'
   * }
   */
  weChatAuthorizeUserInfo({ code }) {
    return new Promise((resolve, reject) => {
      // 获取AccessToken
      this.clientOAuth.getAccessToken(code, (err, result) => {
        if (!err) {
          // eslint-disable-next-line no-console
          // console.log('oauth result:', result)
          resolve(result.data)
        } else {
          // eslint-disable-next-line no-console
          // console.log('oauth err:', err)
          reject(err)
        }
      })
    }).then((ret) => {
      const accessToken = ret.access_token
      return new Promise((resolve, reject) => {
        // 获取用户详细信息
        this.clientOAuth.getUser(ret.openid, async (err, result) => {
          if (!err) {
            // eslint-disable-next-line no-console
            // console.log('oauth user result:', result)
            resolve(Object.assign({}, result, { accessToken, isSnapshotUser: ret.is_snapshotuser }))
          } else {
            // eslint-disable-next-line no-console
            // console.log('oauth user err:', err)
            reject(err)
          }
        })
      })
    })
  }

  weChatAuthorizeBase({ code }) {
    return new Promise((resolve, reject) => {
      // 获取AccessToken
      this.clientOAuth.getAccessToken(code, (err, result) => {
        if (!err) {
          // eslint-disable-next-line no-console
          // console.log('oauth result:', result)
          resolve(result.data)
        } else {
          // eslint-disable-next-line no-console
          // console.log('oauth err:', err)
          reject(err)
        }
      })
    })
  }
}
