import * as React from 'react';
import './index.less';
import { IconProps } from './interface';
export default class Icon extends React.Component<IconProps, {}> {
    static defaultProps: {
        tag: string;
    };
    render(): React.DOMElement<{
        className: string;
    } & {
        children?: React.ReactNode;
    }, Element>;
}
