const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getCustomerToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)customer_token=([^;]*)/);
    return match ? match[1] : '';
}

export async function customerRequestMagicLink(email: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error('Erro ao enviar o link de acesso');
    }
}

export async function getMe() {
    const response = await fetch(`${API_URL}/customers/me`, {
        headers: { Authorization: `Bearer ${getCustomerToken()}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Não autenticado');
    return response.json();
}

export async function getMyPurchases(): Promise<{ student: any[]; teacher: any[] }> {
    const response = await fetch(`${API_URL}/customers/me/purchases`, {
        headers: { Authorization: `Bearer ${getCustomerToken()}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Erro ao buscar compras');
    return response.json();
}
