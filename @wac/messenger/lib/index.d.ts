export interface MessageWrapper {
    needDeserialization: boolean;
    data: string;
}
export declare class Messenger {
    private targetWindow;
    private targetOrigin;
    private sourceOrigin;
    private receiveMessage;
    constructor(targetWindow: Window, targetOrigin: string, sourceOrigin?: string);
    private unwarpperMessage;
    private createMessageWrapper;
    onMessage(callback: (message: any) => void): void;
    send(message: any): void;
    destroy(): void;
}
