declare type func = () => void;
export interface WechatShareProps {
    wxConfig: {
        debug?: boolean;
        appId?: string;
        jsApiList?: any[];
        openTagList?: any[];
        [prop: string]: any;
    };
    wechatSignatureUrl?: string;
    wxReadyCallback?: (wx: any) => void;
    title: string | func;
    desc?: string | func;
    link: string | func;
    imgUrl?: string | func;
    type?: 'music' | 'video' | 'link';
    dataUrl?: string;
    onSuccess?: func;
    onCancel?: func;
}
export {};
