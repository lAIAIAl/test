/**
 * 基于 query 参数获取品类参数
 * - 判断是否存在af/a_f,
 *    - 若存在则直接获取对应品类信息；
 *    - 不存在则再根据直播间参数（lessonId, courseId, courseType）获取品类信息
 * 如果无法获取有效品类配置（BizInfo），则用钱堂教育兜底
 */
const { transformFunctionToValueWithCtx } = require('../../lib/util')
const BizService = require('../../service/biz')
const { defaultBizInfo } = require('../../constants/biz-info')
const logger = require('../../lib/logger')

/**
 * @param {bool} shouldBypass 是否跳过多品类授权判断
 * @param {object} devMockBizInfo
 **/
module.exports = function ({ isDev, shouldBypass = false, devMockBizInfo } = {}) {
  return async (ctx, next) => {
    // 是否跳过品类获取中间件(跳过则使用财商品类)
    if (transformFunctionToValueWithCtx(ctx, shouldBypass)) {
      ctx.bizInfo = defaultBizInfo
      return next()
    }

    // 非正式环境下 dev 才生效
    if (isDev && devMockBizInfo) {
      ctx.bizInfo = devMockBizInfo
      return next()
    }

    const { af, a_f, lessonId, courseId, courseType } = ctx.query

    // 无品类参数，默认财商返回
    if (!af && !a_f && !lessonId && !courseId && !courseType) {
      ctx.bizInfo = defaultBizInfo
      return next()
    }

    let bizInfo = {}
    const bizService = new BizService(ctx)

    try {
      if (af || a_f) {
        const bizResByAf = await bizService.getBizCodeByAf(af || a_f)
        if (bizResByAf && bizResByAf.code === 0) {
          bizInfo = bizResByAf.data || {}
        }
      } else if (lessonId || courseId || courseType) {
        const bizResByLiveParam = await bizService.getBizCodeByLiveParam({
          lessonId,
          courseId,
          courseType,
        })
        if (bizResByLiveParam && bizResByLiveParam.code === 0) {
          bizInfo = bizResByLiveParam.data || {}
        }
      }

      if (bizInfo.code) {
        const bizInfoRes = await bizService.getBizTypeConfig(bizInfo.code)
        if (
          bizInfoRes &&
          bizInfoRes.data &&
          bizInfoRes.data.appIds &&
          bizInfoRes.data.appIds.length > 0
        ) {
          bizInfo.config = bizInfoRes.data
        }
      }
    } catch (e) {
      //
    }

    logger.logBizInfoResult({ ctx, bizInfo })
    ctx.bizInfo = bizInfo.config ? bizInfo : defaultBizInfo
    await next()
  }
}
