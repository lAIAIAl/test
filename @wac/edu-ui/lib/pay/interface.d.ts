import { AxiosRequestConfig } from 'axios/index';
export declare type IOrderInfo = {
    title: string;
    orderAmount: number;
    couponAmount?: number;
    payAmount: number;
    showPrice?: number;
    templateCode?: string;
    templateVersion?: string;
    orderId?: string | number;
    productId?: string | number;
    obviousProductStatus?: boolean;
    agreementChecked?: boolean;
};
export interface PayProps {
    orderInfo: IOrderInfo;
    pid?: string | number;
    wxPayParam?: {
        openId: string | number;
        appId: string;
    };
    successUrl?: string;
    isWechatEnv: boolean;
    token?: string;
    couponInfo?: {
        id: number;
        [prop: string]: any;
    };
    axiosConfig?: AxiosRequestConfig;
    isShowOnlineService?: boolean;
    payType?: string;
    from?: 'live' | '';
    payResultProps?: {
        [prop: string]: any;
    };
    loginMobile: string | number;
    paySubmitData?: object | null | undefined;
    beforePaySubmit: (data: any) => void;
    paySubmitSuccessCallback: (data: any) => void;
    showAliPayQrCode: boolean;
    showAliPay: boolean;
    showJdPay: boolean;
    showWechatPay: boolean;
}
export interface PayState {
    payStatus: number | string;
    pid: string | number;
    agreementChecked?: boolean;
}
