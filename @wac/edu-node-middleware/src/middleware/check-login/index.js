const url = require('url')
const { URL } = require('url')
const axios = require('../../lib/axios')
const logger = require('../../lib/logger')
const {
  appendUrlQuery,
  removePrefix,
  deleteUrlQuery,
  checkPathIsInList,
} = require('../../lib/util')

/**
 * 判断当前用户是否已经登录，并将uid绑定到ctx对象
 * @param {bool} isDev 是否是开发模式
 **/
module.exports = ({
  isDev = false,
  devMockUserInfo,
  baseURI = '',
  checkAuthUrl = '',
  loginWhitelist = [],
  loginUrl,
  logoutUrl,
  platform: getPlatform,
  checkBindWechat: getCheckBindWechat, // 判断用户中心返回的数据中是否含有 unionid ，值为true的情况下业务会在微信环境内若无 unionid 则认为未登录
  isIgnoreCheckLogin,
  handleLogin,
} = {}) => {
  return async (ctx, next) => {
    if (!ctx.path.includes(baseURI)) {
      return next()
    }

    // 直接跳过登录校验
    const isIgnoreCheck =
      typeof isIgnoreCheckLogin === 'function' ? isIgnoreCheckLogin(ctx) : isIgnoreCheckLogin
    if (isIgnoreCheck) {
      return next()
    }

    let { needLogin, wctk: queryWctkStr, ...restQuery } = ctx.query
    let queryWctk = ''
    // needLogin, wctk 会被删掉
    ctx.query = restQuery
    if (queryWctkStr) {
      queryWctkStr = decodeURIComponent(queryWctkStr)
      queryWctk = `${queryWctkStr}`.split('@')[0]
      const isMiniProgram = /\sminiProgram/.test(ctx.headers['user-agent'])
      // 链接上的wctk，如果在非小程序环境内，则需要校验ip，ip校验不通过则不认这个wctk
      if (!isMiniProgram) {
        const queryWctkIp = `${queryWctkStr}`.split('@')[1]
        let ip = (ctx.headers['x-forwarded-for'] || ctx.request.ip).replace('::ffff:', '')
        ip = `${ip}`.split(',')[0]
        if (!queryWctkIp || ip !== queryWctkIp) {
          queryWctk = ''
        }
      }
      if (queryWctk) {
        const hostName = ctx.request.header.host
        const domainNameMatch = hostName.match(/^([^.]+\.)+([^:/]+).*$/)
        const domainName = domainNameMatch[1] + domainNameMatch[2]
        ctx.cookies.set('wctk', queryWctk, {
          domain: domainName,
          maxAge: 1296000000,
          httpOnly: false,
        })
        ctx.cookies.set('access_token', queryWctk, {
          domain: domainName,
          maxAge: 1296000000,
          httpOnly: false,
        })
        // 小程序环境内有时cookie会设置失败，所以需要额外增加header的部分，用于请求其他外部服务（如跨工程的node）
        ctx.headers['x-access-token'] = queryWctk
      }
    }

    // 兼容多个版本的 token 描述方式
    const token =
      queryWctk ||
      ctx.headers['x-access-token'] ||
      ctx.cookies.get('X-ACCESS-TOKEN') ||
      ctx.cookies.get('access_token') ||
      ctx.cookies.get('wctk') ||
      ctx.cookies.get('kdtoken') ||
      ''
    ctx.userInfo = ctx.userInfo || { uid: 0, token }

    // 开发环境使用 mock 数据
    if (isDev) {
      ctx.userInfo = { token, ...devMockUserInfo } || { uid: 70242562, token }
      return next()
    }

    const platform = typeof getPlatform === 'function' ? getPlatform(ctx) : getPlatform

    checkAuthUrl = appendUrlQuery(ctx, checkAuthUrl, {
      platform,
      getBindWechat: true, // 为true时返回数据会有unionid字段
    })

    // 合并 header 供用户中心接口使用
    const headers = Object.assign({}, ctx.headers, {
      host: url.parse(checkAuthUrl, true, true).host,
      'X-ACCESS-TOKEN': token,
    })

    // 移除不需要的字段
    delete headers['content-length']
    delete headers['content-type']

    const opts = {
      method: 'post',
      url: checkAuthUrl,
      headers,
    }

    // 访问用户中心数据
    const res = await axios(opts)
      .then((response) => {
        return response
      })
      .catch((err) => {
        if (err.response) {
          return {
            status: err.response.status,
            data: {
              errCode: err.response.status,
              error: err.response.data,
            },
          }
        } else if (err.request) {
          return {
            status: ctx.res.statusCode,
            data: {
              errCode: ctx.res.statusCode,
              error: err.message + '; no response was received.',
            },
          }
        } else {
          return {
            status: ctx.res.statusCode,
            data: {
              errCode: ctx.res.statusCode,
              error: err.message,
            },
          }
        }
      })

    const body = res.data
    const purePath = removePrefix(ctx.path, baseURI)

    const isWechat = /\sMicroMessenger\//.test(ctx.headers['user-agent'])

    const whiteList = typeof loginWhitelist === 'function' ? loginWhitelist(ctx) : loginWhitelist
    const isWhiteLogin = checkPathIsInList(purePath, whiteList) && needLogin !== '1'
    // 非登录白名单的未登录用户
    if (!isWhiteLogin && !body.result) {
      // logger.logCheckLogin(ctx, opts, res)
      return handleNoLogin(ctx, { platform, loginUrl, logoutUrl, body, isWechat, handleLogin })
    }

    const checkBindWechat =
      typeof getCheckBindWechat === 'function'
        ? getCheckBindWechat(ctx)
        : getCheckBindWechat || false

    // 微信环境内，非登录白名单的又要微信授权登录，但响应中没有unioid，则认为登录不成功
    if (isWechat && !isWhiteLogin && checkBindWechat === true && !body.result.unionid) {
      logger.logCheckLogin(ctx, opts, res)
      return handleNoLogin(ctx, {
        platform,
        loginUrl,
        logoutUrl,
        bindWechat: true,
        body,
        isWechat,
        handleLogin,
      })
    }

    // 用户已经登录，将用户信息注入 ctx.userInfo
    ctx.userInfo = body.result || { uid: 0 }
    ctx.userInfo.token = token
    ctx.userInfo.exportedMobile = parseMobileWithStar(ctx.userInfo.mobile)

    // if (isWechat) {
    //   setCookie(ctx, 'wx_union_id', ctx.userInfo.unionid || '')
    // }

    await next()
  }
}

function handleNoLogin(
  ctx,
  {
    platform = '',
    loginUrl: getLoginUrl,
    logoutUrl: getLogoutUrl,
    bindWechat,
    body = {},
    isWechat,
    handleLogin,
  } = {},
) {
  // setCookie(ctx, 'wx_union_id', '')

  // Xhr 异常处理
  if ((ctx.headers['X-Requested-With'] || ctx.headers['x-requested-with']) === 'XMLHttpRequest') {
    return (ctx.body = {
      code: +body.errCode || 1,
      error: '请重新登录',
    })
  }

  // query中配置的登录链接
  let loginUrl =
    ctx.query.loginUrl || (typeof getLoginUrl === 'function' ? getLoginUrl(ctx) : getLoginUrl)
  let logoutUrl = typeof getLogoutUrl === 'function' ? getLogoutUrl(ctx) : getLogoutUrl

  let redirectUrl = deleteUrlQuery(ctx, ctx.href, ['code', 'state', 'needLogin', 'wctk'])

  if (isWechat && !redirectUrl.includes('_authPlatform=')) {
    // 增加标识参数，标识新登录的场景（新登录场景可以基于platform获取appId）
    redirectUrl += (redirectUrl.indexOf('?') >= 0 ? '&' : '?') + `_authPlatform=${platform}`
  }

  if (bindWechat) {
    // 微信授权登录的，要先失效当前挖财登录token再重新登录
    logoutUrl +=
      (logoutUrl.indexOf('?') >= 0 ? '&' : '?') + 'url=' + encodeURIComponent(redirectUrl)
    return ctx.redirect(logoutUrl)
  }

  loginUrl = new URL(loginUrl)

  !loginUrl.searchParams.get('needLogin') && loginUrl.searchParams.append('needLogin', '1')
  !loginUrl.searchParams.get('platform') && loginUrl.searchParams.append('platform', platform)
  !loginUrl.searchParams.get('pwdlogin') && loginUrl.searchParams.append('pwdlogin', '0')
  loginUrl.searchParams.delete('url')
  loginUrl.searchParams.append('url', redirectUrl)
  loginUrl.searchParams.delete('loginUrl')

  const newLoginUrl = loginUrl.toString()

  // 外部处理登录逻辑
  if (handleLogin) {
    handleLogin(ctx, { platform, redirectUrl, loginUrl: newLoginUrl })
    return
  }

  return ctx.redirect(newLoginUrl)
}

function parseMobileWithStar(mobile) {
  if (!mobile) return ''
  return mobile.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
