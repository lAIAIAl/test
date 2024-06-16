interface IParamsType {
    serverUrl?: string;
    environment?: string;
    projectName: string;
}
export interface IExtractObject {
    selector: string;
    tagName: string;
    pathname?: string;
}
export declare function parse(querystring?: string): any;
export declare function isWacai(): boolean;
export declare function getServerUrl({ serverUrl, environment, projectName }: IParamsType): string;
export declare function getReferrer(ref?: string): string;
export declare const isEditMode: () => boolean;
export declare const extract: (element: HTMLElement) => IExtractObject;
export {};
