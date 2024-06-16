const util = require('./util')

module.exports = rules => {
  rules = util.validateRules(rules)

  const findMatchRule = util.findMatchRule(rules)

  return pathname => {
    util.validatePathname(pathname)

    const rule = findMatchRule(pathname)

    // 如果找不到对应的 rule 则直接返回 pathname
    if (!rule) {
      return pathname
    }

    const { host, map } = rule

    // 解析 host
    const origin = util.getOrigin(host)
    // 计算 map 映射路径
    const actualPath = util.getPath(map, pathname)

    // 如果是 http:// 和 https:// 开头的字符串，则直接返回
    if (util.isURL(actualPath)) {
      return actualPath
    }

    return util.composeUrl(origin, actualPath)
  }
}
