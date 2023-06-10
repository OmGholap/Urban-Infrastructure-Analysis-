import { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
    title: string;
    labelName: string;
}

export interface FormValues {
    title: string;
    description: string;
    imageType: string;
    location: string;
    buildings: number | undefined;
}

export interface PropertyCardProps {
    id?: BaseKey | undefined;
    title: string;
    location: string;
    buildings: string;
    photo: string;
}
