// 默认微信配置-钱堂教育学习中心(原挖财钱堂学院）
const defaultWxConfig = {
  appid: 'wxf25c265ad00db0b8',
  appsecret: '0c442ebfbb2c22203cf1ab5d55d0389e',
}

const wxConfigMap = {
  [defaultWxConfig.appid]: defaultWxConfig.appsecret,
  // 钱堂财商学院
  wxb5caa43a32153e85: 'f7ddc60127834bda28ecccebc7693b81',
  // 钱堂精英学社
  wx845c11ce9abe6fe4: '606ac5f04dd0641a4310a55bf913643a',
  // 钱堂财富学堂
  wxd4c4368057b0c7a4: '092fd678c970a24720f034dbb27884da',
  // 钱堂教育微课堂
  wxebf4b8b8bd08c2f4: 'ccc3cf17c6a07e6e4d3cacef1a47bdcd',
  // 本猿教育 yingyan@wacai.com
  wxe6ff227283dc6bc2: 'a388527071565c00eb0e42b334e0be21',
  // 学也无涯 danqiusheng
  wx31db156cee53e4f4: 'd3062500b224820b4ad5580417f9ad0e',
  // 齐遇兴
  wx2aeea1a90a334b1a: 'dfbd45a9b1ec2a01df1bf30b9c14de8e',
  // 望康学习中心
  wx5a7a359fdbfeace3: 'beaf85778f888d948c1b63ef31df3145',
}

module.exports = {
  wxConfigMap,
  defaultWxConfig,
}
