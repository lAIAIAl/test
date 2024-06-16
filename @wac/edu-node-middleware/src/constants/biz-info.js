const { defaultWxConfig } = require('./wechat-config')

const defaultBizInfo = {
  id: 1, // 品类id
  code: 'finance', // 品类code
  name: '财商', // 品类名称
  brandName: '钱堂教育', // 品牌名称
  config: {
    appIds: [defaultWxConfig.appid], // 品类appIds
  },
}

module.exports = {
  defaultBizInfo,
}
