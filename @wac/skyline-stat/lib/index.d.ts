import { Promise } from 'es6-promise';
import SkylineCore from '@wac/skyline-core';
interface ISkylineUserCenter {
    init(opts: object): Promise<any>;
}
interface IterableObject {
    [key: string]: string;
}
interface InitOptsType {
    projectName: string;
    appName: string;
    environment?: string;
    serverUrl?: string;
    enableQALogging?: boolean;
    _setCustomVar?: IterableObject;
    sourceChannel?: string[];
    enableBridge?: boolean;
    enableVisualTracking?: boolean;
    debugVisualTracking?: boolean;
    debugSourceOrigin?: string;
    debugTargetOrigin?: string;
    isSPA?: boolean;
    showLog?: boolean;
    sendType?: string;
}
declare class SkylineUserCenter extends SkylineCore implements ISkylineUserCenter {
    private promise;
    private appName;
    private sourceChannelStandard;
    private interceptEnabled;
    private currentLocation?;
    private eventCancelObject?;
    constructor();
    init(opts: InitOptsType): Promise<any>;
    send(eventName: string, params?: object): Promise<any>;
    trackSinglePage(params: object): Promise<any>;
    registerCheckStatHook(fn: (requestParams: object, p: Promise<any>) => any): void;
    private initWithBridge;
    private constituteElement;
    private syncLocation;
    private highlightElement;
    private cancelHighlightElement;
    private requestCookie;
    private getNativeConfig;
    private getCustomParams;
    private getSklParams;
    private enableInterceptor;
    private interceptPageEventIfMatching;
    private getUtm;
}
declare const instance: SkylineUserCenter;
export declare const __stat__: SkylineUserCenter;
export default instance;
