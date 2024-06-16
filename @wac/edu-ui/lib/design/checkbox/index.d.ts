import * as React from 'react';
import './index.less';
import { CheckboxProps, CheckboxState } from './interface';
export default class CheckBox extends React.Component<CheckboxProps, CheckboxState> {
    static defaultProps: {
        defaultChecked: boolean;
    };
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        checked: any;
    };
    onChange: () => void;
    render(): JSX.Element;
}
