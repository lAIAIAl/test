import * as React from 'react';
import { NavBarProps } from './interface';
import './index.less';
export default class NavBar extends React.Component<NavBarProps, {}> {
    static defaultProps: {
        className: string;
        divider: boolean;
        showH5Header: number;
        title: string;
    };
    render(): JSX.Element;
    onLeftClick: () => void;
}
