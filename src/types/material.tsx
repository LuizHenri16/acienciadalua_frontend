export enum MaterialType {
    TEACH = "teach",
    STUDY = "study"
}

export interface Material {
    id: string | number;
    name: string;
    price: number;
    type: MaterialType | string;
    imageUrl?: string;
    description?: string;
}
