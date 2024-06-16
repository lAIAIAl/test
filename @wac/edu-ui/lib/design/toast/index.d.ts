import './style/index.less';
declare const Toast: {
    (children: any): void;
    message(children: any, delay?: number): void;
    loading(children: any, withMask?: boolean): {
        close: () => void;
    };
};
export default Toast;
