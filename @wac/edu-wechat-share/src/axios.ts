import axios from 'axios'
const instance = axios.create({
  baseURL: '',
  timeout: 20000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  function (config) {
    config.params = Object.assign(
      {
        noStoreTimeStamp: new Date().getTime(), // cache: no-store
      },
      config.params || {},
    )
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    const { code, data, result } = response.data || { code: '', data: null, result: null }

    switch (code) {
      case '0':
      case 0:
        return data || result
      default:
        break
    }
    return Promise.reject(response.data)
  },
  function (error) {
    const res = { error }
    return Promise.reject(res)
  },
)

export default instance
