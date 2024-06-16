export interface IParams {
    eventCode: string;
    platform?: string;
    params?: any;
    [key: string]: any;
}
declare const _default: ({ eventCode, platform, params }: IParams) => void;
export default _default;
