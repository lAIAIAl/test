export declare type IOrderInfo = {
    templateCode?: string;
    obviousProductStatus?: boolean;
};
export interface PayNoticeProps {
    noticeText?: string;
    isShowOnlineService: boolean;
    orderInfo: IOrderInfo;
    defaultChecked?: boolean;
    onChangeCheckbox?: (data: any) => void;
}
