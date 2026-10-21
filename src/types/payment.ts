export interface PixPaymentPayload {
  productId: string;
  payer: {
    email: string;
    name?: string;
    cpf?: string;
  };
}

export interface PixPaymentResponse {
  id: number;
  status: string;
  qr_code: string;
  qr_code_base64: string;
  ticket_url: string;
}
