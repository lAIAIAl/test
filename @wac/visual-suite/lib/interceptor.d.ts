import { EventCancelObject } from './index';
export declare type ConstituteCallback = (element: HTMLElement, constituted: boolean) => void;
export declare class Interceptor {
    private constitutedElements;
    private cancelHighlightedEvent;
    break(element: HTMLElement, type: string, callback?: (evt: Event) => void): void;
    constitute(element: HTMLElement, allowMulti: boolean, callback?: ConstituteCallback): void;
    constituteAuto(allowMulti: boolean, callback?: ConstituteCallback): void;
    highlight(selectors: string | string[]): EventCancelObject;
    private repair;
}
