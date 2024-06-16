import { Promise } from 'es6-promise';
interface IterableObject {
    [key: string]: string;
}
interface ITrackPageParamType {
    ref?: string;
    params?: {
        [key: string]: any;
    };
}
interface ILoggerConfig {
    params?: object;
    opts?: object;
}
interface ISkylineCore {
    track(eventName: string, params?: object): IterableObject;
    trackPage(ref: string, params?: object): void;
    trackSinglePage(params?: object): void;
    triggerQALogger(eventName: string, config?: ILoggerConfig): void;
    loadSa(opts?: object): Promise<any>;
    checkStat(eventName: string, opts?: object): void;
}
interface IOptsType {
    serverUrl: string;
    enableQALogging: boolean;
    appName: string;
    _setCustomVar: IterableObject;
    sourceChannel?: string[];
    trackPageParams?: ITrackPageParamType;
    [key: string]: any;
}
export default class SkylineCore implements ISkylineCore {
    static sa: any;
    private enableQALogging;
    private commonParams;
    private sourceChannel;
    loadSa(opts: IOptsType): Promise<any>;
    track(eventName: string, customParams?: object): IterableObject;
    trackSinglePage(params?: object): void;
    trackPage(ref?: string, params?: object): void;
    triggerQALogger(eventName: string, config?: ILoggerConfig): void;
    registerCheckStatHook(fn: (requestParams: object, p: Promise<any>) => any): void;
    checkStat(eventName: string, config?: ILoggerConfig): void;
    private createParams;
}
export {};
