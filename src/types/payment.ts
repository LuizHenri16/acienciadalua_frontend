export interface PixPaymentPayload {
  productId: string;
  payer: {
    email: string;
    name?: string;
    cpf?: string;
  };
  /** Repeating the same key returns the same PIX instead of creating another one. */
  idempotencyKey?: string;
}

export interface PixPaymentResponse {
  id: number;
  status: string;
  qr_code?: string;
  qr_code_base64?: string;
  ticket_url?: string;
  /** String id used by POST /payment/status. */
  payment_id?: string;
  /** Signed capability token required by POST /payment/status. */
  status_token?: string;
  expires_at?: string;
}

export type PaymentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "expired"
  | "refunded"
  | "error";

export interface PaymentStatusResponse {
  paymentId: string;
  status: PaymentStatus;
  providerStatus: string;
  statusDetail: string;
  productId: string;
  amount: string;
  purchaseId: string | null;
  accessGranted: boolean;
  approvedAt: string | null;
  expiresAt: string | null;
  retryable: boolean;
}
