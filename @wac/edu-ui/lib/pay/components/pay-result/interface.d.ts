import { AxiosRequestConfig } from 'axios/index';
export declare type IOrderInfo = {
    orderId?: string | number;
    productId?: string | number;
    templateCode?: string;
};
export interface PayResultProps {
    pid?: string | number;
    status: string | number;
    jumpUrl?: string;
    renderPayResult?: (data: object) => any;
    renderPaySuccessResult?: (data: object) => any;
    retry?: () => void;
    from?: string;
    axiosConfig?: AxiosRequestConfig;
    orderInfo?: IOrderInfo;
    loginMobile?: string | number;
}
export interface PaySuccessAgreementProps {
    from?: string;
    orderInfo?: object;
    loginMobile?: string | number;
    onSubmit: () => void;
}
