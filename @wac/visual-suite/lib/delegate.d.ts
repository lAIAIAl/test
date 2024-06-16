import { EventDistroyObject } from './index';
export interface CompositeEvent extends Event {
    selector?: string;
    delegateTarget?: HTMLElement;
}
export declare function delegate(elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, seletor: string | string[], type: string, callback: (evt: CompositeEvent) => void, useCapture?: boolean): EventDistroyObject[];
