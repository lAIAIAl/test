import { PayProps, PayState } from '../../interface';
export interface PayOrderProps extends PayProps {
    setPayState: (data: PayState) => void;
    checkClickPay: () => any;
}
export interface PayOrderState {
    payType: string;
}
