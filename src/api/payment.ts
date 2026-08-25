const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createPreferences(productId: string): Promise<{ init_point: string; preference_id: string }> {
    const response = await fetch(`${API_URL}/payment/create-preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar preferência de pagamento');
    }

    return response.json();
}

export interface ProcessPaymentPayload {
    token: string;
    payment_method_id: string;
    installments: number;
    issuer_id: string;
    productId: string;
    payer: {
        email: string;
        name?: string;
        identification?: {
            type: string;
            number: string;
        };
    };
}

export interface ProcessPaymentResponse {
    id: number;
    status: string;
    status_detail: string;
}

export async function processPayment(payload: ProcessPaymentPayload): Promise<ProcessPaymentResponse> {
    const response = await fetch(`${API_URL}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || 'Erro ao processar pagamento');
    }

    return response.json();
}

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

export async function createPixPayment(payload: PixPaymentPayload): Promise<PixPaymentResponse> {
    const response = await fetch(`${API_URL}/payment/pix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || 'Erro ao gerar pagamento PIX');
    }

    return response.json();
}
