import type { Material } from "@/types/material";
import { apiUrl } from "./client";

// ─── Público (vitrine) ────────────────────────────────────────────────────────

// A vitrine precisa refletir o painel imediatamente. Não cacheie estas buscas:
// uma resposta vazia durante uma indisponibilidade da API ficava gravada por até
// 1h e a loja continuava sem produtos mesmo depois de a API voltar.
const STOREFRONT_FETCH_OPTIONS: RequestInit = { cache: "no-store" };

export async function getProducts(category?: "STUDENT" | "TEACHER"): Promise<Material[]> {
  const params = new URLSearchParams();
  params.append("isActive", "true");
  if (category) {
    params.append("category", category);
  }

  const url = apiUrl(`/products?${params.toString()}`);
  const response = await fetch(url, STOREFRONT_FETCH_OPTIONS);

  if (!response.ok) {
    console.error(`[products] GET ${url} respondeu ${response.status}`);
    throw new Error(`Falha ao buscar produtos (${response.status})`);
  }

  return response.json();
}

export async function getProductById(id: string): Promise<Material | null> {
  const url = apiUrl(`/products/${id}`);
  const response = await fetch(url, STOREFRONT_FETCH_OPTIONS);

  if (!response.ok) {
    if (response.status !== 404) {
      console.error(`[products] GET ${url} respondeu ${response.status}`);
    }
    return null;
  }

  return response.json();
}
