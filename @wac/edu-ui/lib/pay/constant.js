"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAY_TYPES = exports.PAY_STATUS = void 0;
// 支付系统基础配置
// export const PAY_CONFIG = {
//   businessCode: '16011001',
//   source: 1,
// }
// // 微信配置
// export const WECAHT_CONFIG = {
//   thirdPlatformAppId: 'wxf25c265ad00db0b8',
//   payWay: 50,
// }
// // 支付宝配置
// export const ALI_CONFIG = {
//   thirdPlatformAppId: '2021001194605303',
//   payWay: 80,
// }
// // 京东配置
// export const JD_CONFIG = {
//   thirdPlatformAppId: '1606893094085000',
//   payWay: 40,
// }
// 支付状态map，payStatus 0：初始状态，1：处理中，2:成功，3：失败，4:已退款，-1:取消
var PAY_STATUS = {
  INIT: '0',
  DOING: '1',
  SUCCESS: '2',
  FAIL: '3',
  REFUNDED: '4',
  CANCEL: '-1'
}; // 支付方式

exports.PAY_STATUS = PAY_STATUS;
var PAY_TYPES = {
  WECHAT: 'wechat',
  ALIPAY: 'alipay',
  JDPAY: 'jdpay'
};
exports.PAY_TYPES = PAY_TYPES;