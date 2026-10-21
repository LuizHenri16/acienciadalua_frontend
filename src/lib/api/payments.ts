import type { PixPaymentPayload, PixPaymentResponse } from "@/types/payment";
import { apiUrl } from "./client";

export async function createPreferences(
  productId: string,
): Promise<{ init_point: string; preference_id: string }> {
  const response = await fetch(apiUrl("/payment/create-preferences"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar preferência de pagamento");
  }

  return response.json();
}

export async function createPixPayment(payload: PixPaymentPayload): Promise<PixPaymentResponse> {
  const response = await fetch(apiUrl("/payment/pix"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Erro ao gerar pagamento PIX");
  }

  return response.json();
}
