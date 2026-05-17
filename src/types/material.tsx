export enum MaterialType {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

// Helper para exibir o nome amigável no frontend
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
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
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
