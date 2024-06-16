const _ = require('lodash')
const url = require('url')
const env = process.env.NODE_ENV || 'development'
const path = require('path')

// 从 host 中提取对应的 origin
const getOrigin = host => {
  if (!host) {
    return ''
  }

  if (_.isString(host)) {
    return host
  }

  const origin = host[env]

  if (!origin) {
    throw apiMapError(`host.${env} should not be empty!`)
  }

  return origin
}

// 获取 map 对应的 path
const getPath = (mapConfig = {}, path) => {
  if (_.isFunction(mapConfig)) {
    return mapConfig(path)
  }

  let pathname = path

  // 如果匹配 获取该匹配值
  if (mapConfig[path]) {
    pathname = mapConfig[path]
  } else {
    // 尝试使用正则模式
    for (let key of Object.keys(mapConfig)) {
      const reg = new RegExp(key)
      // 获取匹配的正则数据
      if (reg.test(path)) {
        pathname = path.replace(reg, mapConfig[key])
        break
      }
    }
  }

  return pathname
}

function apiMapError(message) {
  const error = new Error(message)
  error.name = '@wac/papaya-api-map'
  return error
}

function isURL(path) {
  return path.startsWith('http://') || path.startsWith('https://')
}

function validateRules(rules) {
  if (!_.isObject(rules) || _.isEmpty(rules)) {
    throw apiMapError('arguments rules must be an non-empty array or object!')
  }

  rules = [].concat(rules)

  rules.forEach(rule => {
    if (!_.isObject(rule)) {
      throw apiMapError('rule must be an object!')
    }

    const { host, map, match } = rule

    if (host && !(_.isString(host) || _.isObject(host))) {
      throw apiMapError('host needs to be a string or an object!')
    }

    if (map && !_.isObject(map) && !_.isFunction(map)) {
      throw apiMapError('map needs to be an object or a function!')
    }

    if (match && !(_.isRegExp(match) || _.isFunction(match))) {
      throw apiMapError('match needs be a reg or a function!')
    }
  })

  return rules
}

function validatePathname(pathname) {
  if (!pathname || !_.isString(pathname)) {
    throw apiMapError('arguments pathname is required and must be a string!')
  }
}

function findMatchRule(rules) {
  return function(pathname) {
    const rule = rules.find(({ match }) => {
      return _.isFunction(match)
        ? match(pathname)
        : match instanceof RegExp
          ? match.test(pathname)
          : true
    })

    return rule
  }
}

// 合并路径
function composeUrl(host, pathname) {
  const hostObj = url.parse(host, true, true)
  const pathObj = url.parse(pathname, true)

  hostObj.pathname = path.posix.join(hostObj.pathname, pathObj.pathname)
  hostObj.query = pathObj.query

  return hostObj.format()
}

module.exports = {
  getPath,
  getOrigin,
  apiMapError,
  isURL,
  validateRules,
  validatePathname,
  findMatchRule,
  composeUrl
}
