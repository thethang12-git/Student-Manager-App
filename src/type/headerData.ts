import { ReactNode } from "react";

export interface HeaderDataType {
    id: number;
    name: string;
    icon : ReactNode;
    link :string;
    count:number;
    isActive:boolean;
}