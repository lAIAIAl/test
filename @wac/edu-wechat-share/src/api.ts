import axios from './axios'
export const getWechatSignature = (conf = {} as any) => {
  conf = {
    ...conf,
    url: conf.url || `${location.origin}/wac/xuexi/api/tripartite/wechat-signature`,
    params: {
      url: encodeURIComponent(window.location.href.split('#')[0]),
      ...conf.params,
    },
  }
  return axios(conf)
}
