import * as React from 'react';
import './index.less';
import { ButtonProps, ButtonState } from './interface';
export default class Button extends React.Component<ButtonProps, ButtonState> {
    constructor(props: any);
    static defaultProps: {
        activeOpacity: number;
        hideContentWhenLoading: boolean;
        showShadow: boolean;
        disabled: boolean;
        loading: boolean;
        type: string;
        shape: string;
        size: string;
        onClick: () => void;
    };
    getInitOpacity(props?: Readonly<ButtonProps> & Readonly<{
        children?: React.ReactNode;
    }>): number;
    onClick: any;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    render(): JSX.Element;
    setRef: (el: any) => void;
}
