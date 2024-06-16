import * as React from 'react';
import './index.less';
import { PayOrderProps, PayOrderState } from './interface';
export default class PayOrder extends React.Component<PayOrderProps, PayOrderState> {
    static defaultProps: {
        payType: any;
        orderInfo: {};
        couponInfo: {};
        showAliPayQrCode: boolean;
        showAliPay: boolean;
        showJdPay: boolean;
        showWechatPay: boolean;
    };
    constructor(props: any);
    componentDidMount(): void;
    wxTradeType: () => "WAP" | "JSAPI" | "H5";
    handleUrl: (url: any, key: any, value: any) => any;
    mackRecord: () => any;
    checkPayTypeCanPay: (payType: any) => boolean;
    /**
     * 立即支付
     */
    handlePay: () => Promise<void>;
    handleJdPay: (result: any) => void;
    handleWechatPay: (result: any) => void;
    handleAliPay: (result: any) => void;
    /**
     * 微信内，JSAPI支付
     */
    jsapiPay: (pid: any, payData: any) => Promise<void>;
    onPaySelected(type: any): void;
    /**
     * 渲染支付显示页
     */
    render(): JSX.Element;
}
