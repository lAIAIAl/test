const env = process.env.NODE_ENV || 'development'
const { URL } = require('url')
function appendUrlQuery(ctx, url, queryObj = {}) {
  if (!url) return url
  const newUrl = new URL(url, `${env === 'production' ? 'https' : ctx.protocol}://${ctx.host}`)
  for (const key in queryObj) {
    newUrl.searchParams.delete(key)
    newUrl.searchParams.append(key, queryObj[key])
  }
  if (!`${url}`.startsWith('http')) {
    return `${newUrl.pathname}${newUrl.search}`
  }
  return newUrl.toString()
}
function deleteUrlQuery(ctx, url, arr = []) {
  if (!url) return url
  const newUrl = new URL(url, `${env === 'production' ? 'https' : ctx.protocol}://${ctx.host}`)
  arr.map((key) => {
    newUrl.searchParams.delete(key)
  })
  if (!`${url}`.startsWith('http')) {
    return `${newUrl.pathname}${newUrl.search}`
  }
  return newUrl.toString()
}

function removePrefix(path, prefix) {
  if (!path || path === '/' || !prefix) {
    return path
  }
  return path.replace(new RegExp(`^${prefix}`), '')
}

function setCookie(ctx, key, value, option = {}) {
  if (!key || !value) return

  // 根据host设置cookie 域名
  const matchDomain = ctx.request.header.host.match(/\.[\w]+\.(com|info)/)
  const domain = (matchDomain && matchDomain[0]) || ''

  ctx.cookies.set(key, value, {
    domain: domain,
    httpOnly: false,
    ...option,
  })
}

function checkPath(path, pattern) {
  if (!path || !pattern) {
    return false
  }
  if (path === pattern) {
    return true
  }
  const regStr = `${pattern}`.replace(/\/:[^/]*/g, '/[^/]*')
  return new RegExp(`^${regStr}$`).test(path)
}

function checkPathIsInList(path, list) {
  if (!path || !list || !list.length) {
    return false
  }
  return list.some((pattern) => checkPath(path, pattern))
}

function transformFunctionToValueWithCtx(ctx, v) {
  if (!ctx) {
    throw new Error('缺少 ctx')
  }
  return typeof v === 'function' ? v(ctx) : v
}

module.exports = {
  appendUrlQuery,
  deleteUrlQuery,
  removePrefix,
  setCookie,
  checkPath,
  checkPathIsInList,
  transformFunctionToValueWithCtx,
}
