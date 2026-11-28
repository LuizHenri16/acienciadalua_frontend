import type { Material } from "@/types/material";
import { apiUrl, privateApiUrl } from "./client";
import { HTTP_ONLY_SESSION } from "@/lib/auth/cookies";

// ─── Autenticado (painel admin) ───────────────────────────────────────────────

export async function adminGetProducts(token: string): Promise<Material[]> {
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl("/products") : apiUrl("/products"), {
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Falha ao buscar produtos");
  return response.json();
}

export async function adminGetProductById(id: string, token: string): Promise<Material> {
  const path = `/products/${encodeURIComponent(id)}`;
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl(path) : apiUrl(path), {
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Produto não encontrado");
  return response.json();
}

export async function adminCreateProduct(data: FormData, token: string): Promise<Material> {
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl("/products") : apiUrl("/products"), {
    method: "POST",
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
    body: data,
  });

  if (!response.ok) throw new Error("Falha ao criar produto");
  return response.json();
}

export async function adminUpdateProduct(id: string, data: FormData, token: string): Promise<Material> {
  const path = `/products/${encodeURIComponent(id)}`;
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl(path) : apiUrl(path), {
    method: "PUT",
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
    body: data,
  });

  if (!response.ok) throw new Error("Falha ao atualizar produto");
  return response.json();
}

export async function adminToggleProduct(id: string, token: string): Promise<Material> {
  const path = `/products/${encodeURIComponent(id)}/toggle`;
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl(path) : apiUrl(path), {
    method: "PATCH",
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
  });

  if (!response.ok) throw new Error("Falha ao alterar status do produto");
  return response.json();
}

export async function adminDeleteProduct(id: string, token: string): Promise<void> {
  const path = `/products/${encodeURIComponent(id)}`;
  const response = await fetch(token === HTTP_ONLY_SESSION ? privateApiUrl(path) : apiUrl(path), {
    method: "DELETE",
    ...(token === HTTP_ONLY_SESSION ? {} : { headers: { Authorization: `Bearer ${token}` } }),
  });

  if (!response.ok) throw new Error("Falha ao excluir produto");
}
