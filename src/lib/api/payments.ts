import type {
  PaymentStatusResponse,
  PixPaymentPayload,
  PixPaymentResponse,
} from "@/types/payment";
import { apiUrl } from "./client";

export class PaymentApiError extends Error {
  readonly status: number;
  readonly retryable: boolean;

  constructor(message: string, status: number) {
    super(message);
    this.name = "PaymentApiError";
    this.status = status;
    this.retryable = status === 429 || status >= 500;
  }
}

async function errorMessage(response: Response, fallback: string): Promise<string> {
  const body = await response.json().catch(() => null);
  const message = body?.message;
  if (Array.isArray(message)) return message.join(" ");
  if (typeof message === "string" && message.trim()) return message;
  return fallback;
}

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
    throw new Error(
      await errorMessage(response, "Erro ao gerar pagamento PIX"),
    );
  }

  return response.json();
}

export async function getPaymentStatus(
  payload: { paymentId: string; token: string },
  signal?: AbortSignal,
): Promise<PaymentStatusResponse> {
  const response = await fetch(apiUrl("/payment/status"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new PaymentApiError(
      await errorMessage(response, "Não foi possível verificar o pagamento"),
      response.status,
    );
  }

  return response.json();
}
