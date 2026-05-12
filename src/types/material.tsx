export enum MaterialType {
    TEACH = "Plano de aula",
    STUDY = "Material de estudo"
}

export interface Material {
    id: string | number;
    name: string;
    price: number;
    type: MaterialType | string;
    imageUrl?: string;
    description?: string;
}
