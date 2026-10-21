export enum MaterialType {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
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
