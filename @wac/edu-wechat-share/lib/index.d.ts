import * as React from 'react';
import { WechatShareProps } from './interface';
export default class WechatShare extends React.Component<WechatShareProps, {}> {
    static defaultProps: {
        wxConfig: {
            appId: string;
            debug: boolean;
            openTagList: string[];
            jsApiList: string[];
        };
        imgUrl: string;
        type: string;
        dataUrl: string;
    };
    componentDidMount(): void;
    initWxConfig(): Promise<void>;
    registerWxShareApi: (eventName: any) => void;
    render(): any;
}
