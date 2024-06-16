import React from 'react';
export declare type typeMaps = 'normal' | 'primary' | 'danger' | 'black';
export declare type sizeMaps = 'small' | 'medium' | 'large' | string;
export declare type shapeMaps = 'normal' | 'round';
export interface ButtonProps {
    className?: string;
    children?: any;
    size?: sizeMaps;
    type?: typeMaps;
    shape?: shapeMaps;
    disabled?: boolean;
    style?: React.CSSProperties;
    onClick?: (any: any) => void;
    showShadow?: boolean;
    block?: boolean;
    loading?: boolean;
    activeOpacity?: number;
    hideContentWhenLoading?: boolean;
    setRef?: (any: any) => void;
}
export interface ButtonState {
    opacity: number;
}
