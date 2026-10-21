import type { Material } from "@/types/material";
import { apiUrl } from "./client";
import { HttpError } from "./http-error";

export interface CustomerProfile {
  name?: string;
  email?: string;
}

export async function signIn(email: string, password: string): Promise<{ access_token: string }> {
  const response = await fetch(apiUrl("/auth/user/signin"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new HttpError(body.message || "Erro ao fazer login", response.status);
  }

  return response.json();
}

export async function setPassword(email: string, password: string): Promise<{ access_token: string }> {
  const response = await fetch(apiUrl("/auth/user/password"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar senha");
  }

  return response.json();
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(apiUrl("/auth/user/forgot-password"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Erro ao solicitar redefinição");
  }
}

export async function resetPassword(token: string, password: string): Promise<{ access_token: string }> {
  const response = await fetch(apiUrl("/auth/user/reset-password"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  if (!response.ok) {
    throw new Error("Token inválido ou expirado");
  }

  return response.json();
}

export async function getMe(token: string): Promise<CustomerProfile> {
  const response = await fetch(apiUrl("/customers/me"), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Não autenticado");
  return response.json();
}

export async function getMyPurchases(
  token: string,
): Promise<{ student: Material[]; teacher: Material[] }> {
  const response = await fetch(apiUrl("/customers/me/purchases"), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Erro ao buscar compras");
  return response.json();
}

export async function downloadPurchase(productId: string, token: string): Promise<Blob> {
  const response = await fetch(apiUrl(`/customers/me/downloads/${productId}`), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Erro ao baixar arquivo");
  return response.blob();
}
