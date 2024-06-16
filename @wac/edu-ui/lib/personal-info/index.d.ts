import * as React from 'react';
import { PersonalInfoProps, PersonalInfoState } from './interface';
import './index.less';
import 'core-js/modules/es7.promise.finally';
export default class PersonalInfo extends React.Component<PersonalInfoProps, PersonalInfoState> {
    static propTypes: {
        form: any;
    };
    constructor(props: any);
    tel: any;
    showKnow: boolean;
    allowBind: boolean;
    timer: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    makeRecord: (type: any, config?: {}) => any;
    onChange: (name: any) => (value: any) => void;
    submit: () => void;
    render(): JSX.Element;
}
