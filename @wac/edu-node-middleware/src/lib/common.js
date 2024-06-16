module.exports = class {
  static getAppCommonData(ctx) {
    const headers = ctx.headers
    const userAgent = headers['user-agent']
    const isWechat = /\sMicroMessenger\//.test(userAgent)
    const isMiniProgram = /\sminiProgram/.test(userAgent)
    const isIos = /(iPhone|iPad|iPod|iOS)/i.test(userAgent)
    const isAndroid = /(Android|Adr)/i.test(userAgent)
    const appPlatform =
      parseInt((userAgent + ' platform/0 ').match(/platform\/([0-9]+)/)[1]) ||
      +ctx.headers['x-platform'] ||
      0
    const isWacaiApp = !!appPlatform

    const appCommonData = {
      isWechat: isWechat,
      isIos: isIos,
      isAndroid: isAndroid,
      isWacaiApp: isWacaiApp,
      isMiniProgram: isMiniProgram,
      appPlatform: appPlatform,
      userAgent,
    }

    return appCommonData
  }
}
