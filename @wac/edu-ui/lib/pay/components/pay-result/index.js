"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace.js");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _toast = _interopRequireDefault(require("../../../design/toast"));

var _constant = require("../../constant");

var _payFinish = _interopRequireDefault(require("./pay-finish"));

var _payFailCancel = _interopRequireDefault(require("./pay-fail-cancel"));

var _paySuccess = _interopRequireDefault(require("./pay-success"));

var _paySuccessAdvance = _interopRequireDefault(require("./pay-success-advance"));

var _paySuccessAgreementForm = _interopRequireDefault(require("./pay-success-agreement-form"));

require("./icon.less");

require("./index.less");

var _api = require("../../api");

var _utils = require("../../../common/utils");

var PayResult = function PayResult(props) {
  // 支付状态。0：初始状态，1：处理中，2:成功，3：失败，4:已退款
  var pid = props.pid,
      status = props.status,
      jumpUrl = props.jumpUrl,
      orderInfo = props.orderInfo,
      loginMobile = props.loginMobile;

  var _ref = orderInfo || {},
      orderId = _ref.orderId,
      templateCode = _ref.templateCode,
      productId = _ref.productId;

  var _React$useState = React.useState(status || _constant.PAY_STATUS.INIT),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      payStatus = _React$useState2[0],
      setPayStatus = _React$useState2[1]; // 未补充信息留痕状态：false:没有留痕


  var _React$useState3 = React.useState(null),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      recordStatus = _React$useState4[0],
      setRecordStatus = _React$useState4[1];

  var timer = React.useRef(null);
  React.useEffect(function () {
    if (!status || status === _constant.PAY_STATUS.DOING || status === _constant.PAY_STATUS.INIT) {
      queryPayResult();
    }
  }, [pid, status]);
  React.useEffect(function () {
    if (payStatus === _constant.PAY_STATUS.SUCCESS) {
      queryRecord();
    }
  }, [payStatus]);
  React.useEffect(function () {
    return function () {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  function queryPayResult() {
    var needPolling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    (0, _api.getPayResult)({
      pid: pid
    }, props.axiosConfig).then(function (result) {
      if (result.payStatus === _constant.PAY_STATUS.SUCCESS) {
        timer.current && clearTimeout(timer.current); // queryRecord()
      }

      setPayStatus(result.payStatus);

      if (result.payStatus === _constant.PAY_STATUS.DOING && needPolling) {
        polling();
      }

      if (!needPolling) {
        _toast.default.message('订单处理中，请稍后');
      }
    }).catch(function (e) {
      needPolling ? polling() : _toast.default.message(e.msg || e.error || '请求失败，请重试');
    });
  } // 查询是否进入过 补充信息


  function queryRecord() {
    var payType = (0, _utils.fetchLocalStorageWithKey)('payType') || ''; // 留痕类型：直播间微信支付：补充信息提交留痕 or 未补充信息留痕

    var type = payType === _constant.PAY_TYPES.WECHAT && props.from === 'live' ? 'supplementary_information_submit' : 'no_supplementary_agreement';
    var params = {
      orderId: orderId,
      // 订单
      productId: productId,
      source: props.from === 'live' ? 'live_broadcast' : 'page',
      // 来源: 直播间/投放页面
      type: type // 类型：未补充信息留痕

    };
    (0, _api.getRecord)(params, props.axiosConfig).then(function (data) {
      // 有经过未补充信息的留痕记录
      if (data && data.length > 0) {
        setRecordStatus(true);
      } else {
        setRecordStatus(false);
      }
    });
  } // 轮询查询支付结果


  function polling() {
    timer.current = setTimeout(function () {
      queryPayResult();
    }, 4000);
  } // 点击已完成支付，请求接口查询


  var onHasPay = function onHasPay() {
    queryPayResult(false);
  }; // 重新支付


  var onRetry = function onRetry() {
    if (props.retry) {
      props.retry();
    } else {
      var url = location.href.replace('pid=', '').replace('payStatus=-1', '');
      location.href = url;
    }
  }; // 提交信息表单


  function onSubmit() {
    if (props.from === 'live') {
      setRecordStatus(true);
    } else {
      setRecordStatus(false);
      jumpUrl && (location.href = jumpUrl);
    }
  } // 关闭


  function onJump() {
    jumpUrl && (location.href = jumpUrl);
  } // 自定义渲染结果页面


  if (props.renderPayResult && typeof props.renderPayResult === 'function') {
    return props.renderPayResult({
      payStatus: payStatus,
      queryPayResult: queryPayResult
    });
  } // 根据支付状态渲染不同的界面


  if (payStatus === _constant.PAY_STATUS.SUCCESS) {
    // 没有 未补充信息留痕 && 属于需要协议的类型，需要进入 补充信息
    if (recordStatus !== null && !recordStatus && templateCode) {
      return /*#__PURE__*/React.createElement(_paySuccessAgreementForm.default, {
        from: props.from,
        orderInfo: orderInfo,
        loginMobile: loginMobile,
        onSubmit: onSubmit
      });
    } // 自定义渲染成功页面


    if (props.renderPaySuccessResult && typeof props.renderPaySuccessResult === 'function') {
      return props.renderPaySuccessResult({
        payStatus: _constant.PAY_STATUS.SUCCESS
      });
    }

    if (props.from === 'live') {
      return /*#__PURE__*/React.createElement(_paySuccessAdvance.default, null);
    }

    return /*#__PURE__*/React.createElement(_paySuccess.default, {
      onJump: onJump
    });
  } else if (payStatus === _constant.PAY_STATUS.CANCEL) {
    return /*#__PURE__*/React.createElement(_payFailCancel.default, {
      title: "\u652F\u4ED8\u53D6\u6D88",
      onRetry: onRetry
    });
  } else if (payStatus === _constant.PAY_STATUS.FAIL) {
    return /*#__PURE__*/React.createElement(_payFailCancel.default, {
      title: "\u652F\u4ED8\u5931\u8D25",
      onRetry: onRetry
    });
  } // 渲染已完成支付


  return /*#__PURE__*/React.createElement(_payFinish.default, {
    onHasPay: onHasPay,
    onRetry: onRetry
  });
};

var _default = /*#__PURE__*/React.memo(PayResult);

exports.default = _default;