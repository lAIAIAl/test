/**
 * 微信授权，根据配置确定是否需要进行授权；
 * 外部可配置是否可跳过该授权；
 * 若接了用户中心的微信自动登录，该中间件功能主要用于获取 openId 用在支付时，否则该中间件做微信授权并在后面的中间件上报、绑定微信授权信息
 */
const { deleteUrlQuery, setCookie } = require('../../lib/util')
const WechatOauth = require('../../service/wechat-oauth')
const EduRedisStore = require('../../service/edu-redis-store')
const logger = require('../../lib/logger')
const BizService = require('../../service/biz')
const { wxConfigMap, defaultWxConfig } = require('../../constants/wechat-config')
const AuthSourceEnum = require('../../constants/wx-auth-source-enum')

/**
 * 获取微信授权页面url
 * 微信网页授权文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 * @param {string} appId 公众号app key
 * @param {string} redirectUri 重定向地址
 * @param {string} scope 授权方式 1.snsapi_base 静默获取 openId 2.snsapi_userinfo 弹窗获取用户信息
 */
function getWechatAuthorize({ appid, redirectUri, scope = 'snsapi_userinfo' }) {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
}

module.exports = function ({
  isDev = false,
  devMockWechatInfo,
  wxRedirectUri: getWxRedirectUri,
  storeKeyPrefix = '',
  storeUrls: getStoreUrls, // TODO：新增默认值，支持配置传入覆盖
  isIgnoreAuth,
  isMiniProgram = false, // 小程序授权逻辑，暂未使用，默认false
  scope: scopeFun = 'snsapi_userinfo', // 默认获取用户信息
  hookWxAuth, // 微信授权前的中转页；留口子，用于满足微信授权合规；
} = {}) {
  return async (ctx, next) => {
    const storeUrls = typeof getStoreUrls === 'function' ? getStoreUrls(ctx) : getStoreUrls
    if (!storeUrls || !storeUrls.redisGetUrl || !storeUrls.redisSetUrl) {
      throw new Error(
        'wechat-oauth 中 storeUrls 必须为一对象，若为函数则函数返回值为一对象，且其属性 redisGetUrl 和 redisSetUrl必须为 http url',
      )
    }
    // 非正式环境下 dev 才生效
    if (isDev && devMockWechatInfo) {
      ctx.wechatInfo = devMockWechatInfo
      return next()
    }

    ctx.wechatInfo = ctx.wechatInfo || {}

    // 是否可跳过微信授权
    const isIgnore = typeof isIgnoreAuth === 'function' ? isIgnoreAuth(ctx) : isIgnoreAuth
    if (isIgnore) {
      return next()
    }

    if (hookWxAuth && typeof hookWxAuth === 'function') {
      const isBlockAuth = hookWxAuth(ctx)
      if (isBlockAuth === true) {
        // 如果为 true，则阻塞 koa 中间件；例如跳转自定义微信授权中转页的场景
        return
      } else if (isBlockAuth === false) {
        // 如果返回 false，则仅跳过当前微信授权逻辑
        return next()
      }
      // 如果 hookWxAuth 函数无返回值，则继续现有微信流程
    }

    let scope = typeof scopeFun === 'function' ? scopeFun(ctx) : scopeFun

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, state, ...restQuery } = ctx.query
    ctx.query = restQuery // 删除授权成功后的微信回带的数据

    const { openid, nickname } = ctx.wechatInfo

    if (!['snsapi_base', 'snsapi_userinfo'].includes(scope)) {
      scope = 'snsapi_userinfo'
    }

    // 避免重复授权
    if (
      (scope === 'snsapi_userinfo' && nickname && openid) ||
      (scope === 'snsapi_base' && openid)
    ) {
      return next()
    }

    let wxConfig
    try {
      wxConfig = await getWxConfig(ctx)
    } catch (e) {
      wxConfig = defaultWxConfig
    }

    const wxRedirectUri =
      typeof getWxRedirectUri === 'function' ? getWxRedirectUri(ctx) : getWxRedirectUri
    const { appid, appsecret, source = '' } = wxConfig || {}

    ctx.url = deleteUrlQuery(ctx, ctx.url, ['code', 'state'])

    const currentUrl = `${wxRedirectUri}${ctx.url}`

    const wechatAuthUrl = getWechatAuthorize({
      appid,
      redirectUri: encodeURIComponent(currentUrl),
      scope,
    })

    // 微信授权
    if (!code) {
      setCookie(ctx, 'wx_union_id', '')
      return ctx.redirect(wechatAuthUrl)
    }

    const keyPrefix = typeof storeKeyPrefix === 'function' ? storeKeyPrefix(ctx) : storeKeyPrefix

    // 授权获取到code后，根据 scope 进行处理获取微信数据
    const wechatOauth = new WechatOauth({
      appid,
      appsecret,
      isMiniProgram,
      store: new EduRedisStore(ctx, { keyPrefix, ...storeUrls }),
    })

    // 微信基础授权
    if (scope === 'snsapi_base') {
      const wechatBaseInfo = await wechatOauth
        .weChatAuthorizeBase({ code })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })

      logger.logWechatAuth({
        ctx,
        scope,
        wechatInfo: wechatBaseInfo,
        appid,
        source,
      })

      if (!wechatBaseInfo || !wechatBaseInfo.openid) {
        setCookie(ctx, 'wx_union_id', '')
        return ctx.redirect(wechatAuthUrl)
      }

      const { unionid = '' } = wechatBaseInfo
      setCookie(ctx, 'wx_union_id', unionid)

      ctx.wechatInfo = Object.assign({}, wechatBaseInfo, { appid })

      return next()
    }

    // 微信信息授权
    if (scope === 'snsapi_userinfo') {
      const wechatInfo = await wechatOauth
        .weChatAuthorizeUserInfo({ code })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })

      logger.logWechatAuth({
        ctx,
        scope,
        wechatInfo,
        appid,
        source,
      })

      if (!wechatInfo || !wechatInfo.openid) {
        setCookie(ctx, 'wx_union_id', '')
        return ctx.redirect(wechatAuthUrl)
      }

      const { unionid = '' } = wechatInfo
      setCookie(ctx, 'wx_union_id', unionid)

      ctx.wechatInfo = Object.assign({}, wechatInfo, { appid })
    }

    await next()
  }
}

// 获取微信授权数据 {appid，appsecret}
async function getWxConfig(ctx) {
  const { _authPlatform } = ctx.query
  let appId = ''
  // 记录 appId 获取源，用于排查
  let source = AuthSourceEnum.AUTH_INITIAL
  const bizService = new BizService(ctx)
  // 优先基于platform获取appId，并用该appId做授权（场景为用户先微信授权登录，后业务授权）
  if (_authPlatform) {
    const platformAppIdRes = await bizService.getAppIdByPlatform(_authPlatform)
    if (platformAppIdRes && platformAppIdRes.data) {
      appId = platformAppIdRes.data
      source = AuthSourceEnum.AUTH_SUCCESS_BY_PLATFORM
    } else {
      source = AuthSourceEnum.AUTH_FAIL_BY_PLATFORM
    }
  }

  // platform授权失败，且有品类的情况
  if (source <= AuthSourceEnum.AUTH_INITIAL && ctx.bizInfo && ctx.bizInfo.config) {
    // 基于拿品类的 appId 列表
    const bizAppList = ctx.bizInfo.config.appIds || []
    // 用户已登录情况，基于uid获取授权信息，优先取已授权的appId
    if (ctx.userInfo && ctx.userInfo.uid) {
      const authRes = await bizService.getAuthInfo(ctx.userInfo.uid)
      if (authRes && authRes.data && authRes.data.length > 0) {
        const intersection = authRes.data.filter((i) => bizAppList.includes(i))
        appId = intersection[0] || ''
      }
      source = appId
        ? AuthSourceEnum.AUTH_SUCCESS_BY_USER_LIST
        : AuthSourceEnum.AUTH_FAIL_BY_USER_LIST
    }
    if (source <= AuthSourceEnum.AUTH_INITIAL && bizAppList[0]) {
      appId = bizAppList[0]
      source = AuthSourceEnum.AUTH_SUCCESS_BY_BIZ_CODE
    } else {
      source = AuthSourceEnum.AUTH_FAIL_BY_BIZ_CODE
    }
  }

  if (wxConfigMap[appId]) {
    return {
      appid: appId,
      appsecret: wxConfigMap[appId],
      source,
    }
  } else {
    logger.customLog(ctx, {
      logType: 'wechat-auth',
      mark: 'wx-config-error',
      msg: `获取appId配置异常-->异常appId:${appId}, 异常source:${source}`,
    })
    // 财商兜底
    return {
      ...defaultWxConfig,
      source: `errorSource:${appId}_${source}`,
    }
  }
}
