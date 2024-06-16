import { formShape } from '../design/form';
import { AxiosRequestConfig } from 'axios/index';
export interface PersonalInfoProps {
    headTitle?: any;
    form: formShape;
    loginMobile?: number | string;
    source?: string;
    productId?: number | string;
    templateCode?: string;
    orderId?: number | string;
    onSubmitCallBack?: (values: any) => void;
    axiosConfig?: AxiosRequestConfig;
    agreementChecked?: boolean;
    obviousProductStatus?: boolean;
}
export interface PersonalInfoState {
    userName: string;
    mobile: string;
    idno: string;
    agreementChecked?: boolean;
}
