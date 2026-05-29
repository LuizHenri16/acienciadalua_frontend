export enum MaterialType {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

export function getMaterialTypeLabel(category: MaterialType | string): string {
    if (category === MaterialType.TEACHER) return "Plano de aula";
    if (category === MaterialType.STUDENT) return "Material de estudo";
    return category;
}

export interface Material {
    id: string;
    title: string;
    description?: string;
    price: number;
    category: MaterialType | string;
    coverUrl?: string;
    fileUrl?: string;
    isActive?: boolean;
    purchasedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductFormData {
    title: string;
    description: string;
    price: string;
    priceValue: number;
    category: MaterialType | string;
    pdf: File | null;
    cover: File | null;
    isActive: boolean;
}
