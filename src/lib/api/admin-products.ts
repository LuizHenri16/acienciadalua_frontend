import type { Material } from "@/types/material";
import { apiUrl } from "./client";

// ─── Autenticado (painel admin) ───────────────────────────────────────────────

export async function adminGetProducts(token: string): Promise<Material[]> {
  const response = await fetch(apiUrl("/products"), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Falha ao buscar produtos");
  return response.json();
}

export async function adminGetProductById(id: string, token: string): Promise<Material> {
  const response = await fetch(apiUrl(`/products/${id}`), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Produto não encontrado");
  return response.json();
}

export async function adminCreateProduct(data: FormData, token: string): Promise<Material> {
  const response = await fetch(apiUrl("/products"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });

  if (!response.ok) throw new Error("Falha ao criar produto");
  return response.json();
}

export async function adminUpdateProduct(id: string, data: FormData, token: string): Promise<Material> {
  const response = await fetch(apiUrl(`/products/${id}`), {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });

  if (!response.ok) throw new Error("Falha ao atualizar produto");
  return response.json();
}

export async function adminToggleProduct(id: string, token: string): Promise<Material> {
  const response = await fetch(apiUrl(`/products/${id}/toggle`), {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao alterar status do produto");
  return response.json();
}

export async function adminDeleteProduct(id: string, token: string): Promise<void> {
  const response = await fetch(apiUrl(`/products/${id}`), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao excluir produto");
}
