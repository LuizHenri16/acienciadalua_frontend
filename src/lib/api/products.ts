import type { Material } from "@/types/material";
import { apiUrl } from "./client";

// ─── Público (vitrine) ────────────────────────────────────────────────────────

export async function getProducts(category?: "STUDENT" | "TEACHER"): Promise<Material[]> {
  const params = new URLSearchParams();
  params.append("isActive", "true");
  if (category) {
    params.append("category", category);
  }
  const response = await fetch(apiUrl(`/products?${params.toString()}`), {
    next: { revalidate: 3600 },
  });
  if (!response.ok) return [];
  return response.json();
}

export async function getProductById(id: string): Promise<Material | null> {
  const response = await fetch(apiUrl(`/products/${id}`), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
