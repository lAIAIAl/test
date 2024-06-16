const AUTH_INITIAL = 0
// 登录 platform 获取授权成功
const AUTH_SUCCESS_BY_PLATFORM = 1
// 登录 platform 获取授权失败
const AUTH_FAIL_BY_PLATFORM = -1
// 基于品类BizCode获取授权
const AUTH_SUCCESS_BY_BIZ_CODE = 2
// 基于品类BizCode获取授权失败
const AUTH_FAIL_BY_BIZ_CODE = -2
// 基于用户该品类已授权列表获取授权
const AUTH_SUCCESS_BY_USER_LIST = 3
// 基于用户该品类已授权列表获取授权失败
const AUTH_FAIL_BY_USER_LIST = -3

module.exports = {
  AUTH_INITIAL,
  AUTH_SUCCESS_BY_PLATFORM,
  AUTH_FAIL_BY_PLATFORM,
  AUTH_SUCCESS_BY_BIZ_CODE,
  AUTH_FAIL_BY_BIZ_CODE,
  AUTH_SUCCESS_BY_USER_LIST,
  AUTH_FAIL_BY_USER_LIST,
}
