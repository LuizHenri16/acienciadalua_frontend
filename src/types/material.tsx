export enum MaterialType {
    TEACH = "teach",
    STUDY = "study"
}

export interface Material {
    id: number;
    name: string;
    price: number;
    type: MaterialType;
    imageUrl?: string;
}


export interface MaterialDetails {
    id: string;
    name: string;
    price: number;
    type: MaterialType;
    imageUrl?: string;
}
