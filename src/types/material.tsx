export enum MaterialType {
    TEACHER = "Plano de aula",
    STUDENT = "Material de estudo"
}

export interface Material {
    id: string | number;
    title: string;
    description?: string;
    price: number;
    category: MaterialType | string;
    imageUrl?: string;
}

export interface ProductFormData {
    title: string;
    description: string;
    price: string;       // valor formatado exibido no input (ex: "R$ 49,90")
    priceValue: number;  // valor numérico real enviado para a API (ex: 49.90)
    category: MaterialType | string;
    pdf: File | null;
    cover: File | null;
    isActive: boolean;
}
