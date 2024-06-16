import { VisualConfigDataSubConfig } from '@wac/visual-suite';
interface ISelectorMap {
    [selector: string]: VisualConfigDataSubConfig[];
}
interface IEventTypeMap {
    [eventType: string]: ISelectorMap;
}
export interface IParsedSkylineVisualConfig {
    [pathname: string]: IEventTypeMap;
}
export declare const getParsedVisualConfig: () => IParsedSkylineVisualConfig;
export {};
