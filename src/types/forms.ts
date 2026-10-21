import type { MaterialType } from "@/types/material";

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  priceValue: number;
  category: MaterialType | string;
  file: File | null;
  cover: File | null;
  isActive: boolean;
}
