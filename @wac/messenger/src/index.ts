export interface MessageWrapper {
  needDeserialization: boolean,
  data: string
}

export class Messenger {
  private targetWindow: Window
  private targetOrigin: string
  private sourceOrigin: string
  private receiveMessage: (evt: MessageEvent) => void

  public constructor(
    targetWindow: Window,
    targetOrigin: string,
    sourceOrigin: string = '*') {
    this.targetWindow = targetWindow;
    this.targetOrigin = targetOrigin;
    this.sourceOrigin = sourceOrigin;

    this.receiveMessage = (evt: MessageEvent): void => { console.log(evt) }
  }

  private unwarpperMessage(originalMessage: string): any {
    const messageWrapper: MessageWrapper = JSON.parse(originalMessage) as MessageWrapper;
    const { needDeserialization, data } = messageWrapper;

    if (needDeserialization) {
      return JSON.parse(data);
    }

    return data;
  }

  private createMessageWrapper(needDeserialization: boolean, data: string): MessageWrapper {
    return {
      needDeserialization,
      data
    }
  }

  public onMessage(callback: (message: any) => void): void {
    this.receiveMessage = (evt: MessageEvent): void => {
      const { origin, data } = evt;

      if (this.sourceOrigin !== '*' && origin !== this.sourceOrigin) {
        return;
      }

      const message: any = this.unwarpperMessage(data);

      callback(message);
    }

    window.addEventListener('message', this.receiveMessage);
  }

  public send(message: any): void {
    let syntheticMessage;

    if (typeof message === 'object') {
      syntheticMessage = this.createMessageWrapper(true, JSON.stringify(message));
    }

    syntheticMessage = this.createMessageWrapper(false, message as string);

    this.targetWindow.postMessage(syntheticMessage, this.targetOrigin);
  }

  public destroy(): void {
    window.removeEventListener('message', this.receiveMessage);
  }
}
