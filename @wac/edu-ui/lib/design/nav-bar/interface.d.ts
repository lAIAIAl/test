export interface NavBarProps {
    title: string;
    divider: boolean;
    rightContent: any;
    showH5Header: number | string | boolean;
    className: string;
    onLeftClick?: () => void;
}
