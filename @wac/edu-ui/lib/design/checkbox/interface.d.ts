export interface CheckboxProps {
    onChange?: (checked: boolean) => void;
    defaultChecked?: boolean;
    checked?: boolean;
    children?: any;
    className?: string;
}
export interface CheckboxState {
    checked: boolean;
}
