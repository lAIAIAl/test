import * as React from 'react';
interface itemObj {
    payType: string;
    logoUrl: string;
    title: string;
    tips?: React.ReactNode | string;
    isShow: boolean;
}
export interface PayTypeItemsProps {
    items: itemObj[];
    onPaySelected: (selectedPayType: string) => void;
    selectedPayType: string;
}
export {};
