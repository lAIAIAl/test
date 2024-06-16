import * as React from 'react';
import './index.less';
import { PayProps, PayState } from './interface';
export default class PayContainer extends React.Component<PayProps, PayState> {
    static defaultProps: {
        isShowOnlineService: boolean;
        from: string;
        orderInfo: {};
        couponInfo: {};
    };
    constructor(props: any);
    setPayState: (data: any) => void;
    render(): JSX.Element;
}
