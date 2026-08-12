import { Material } from "@/types/material";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getCustomerToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)customer_token=([^;]*)/);
    return match ? match[1] : '';
}

export async function customerSignIn(email: string, password: string): Promise<{ access_token: string }> {
    const response = await fetch(`${API_URL}/auth/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw { status: response.status, message: body.message || 'Erro ao fazer login' };
    }

    return response.json();
}

export async function customerSetPassword(email: string, password: string): Promise<{ access_token: string }> {
    const response = await fetch(`${API_URL}/auth/user/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar senha');
    }

    return response.json();
}

export async function customerForgotPassword(email: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/user/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error('Erro ao solicitar redefinição');
    }
}

export async function customerResetPassword(token: string, password: string): Promise<{ access_token: string }> {
    const response = await fetch(`${API_URL}/auth/user/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
        throw new Error('Token inválido ou expirado');
    }

    return response.json();
}

export async function getMe() {
    const response = await fetch(`${API_URL}/customers/me`, {
        headers: { Authorization: `Bearer ${getCustomerToken()}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Não autenticado');
    return response.json();
}

export async function getMyPurchases(): Promise<{ student: Material[]; teacher: Material[] }> {
    const response = await fetch(`${API_URL}/customers/me/purchases`, {
        headers: { Authorization: `Bearer ${getCustomerToken()}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Erro ao buscar compras');
    return response.json();
}

export async function downloadPurchase(productId: string): Promise<Blob> {
    const response = await fetch(`${API_URL}/customers/me/downloads/${productId}`, {
        headers: { Authorization: `Bearer ${getCustomerToken()}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Erro ao baixar arquivo');
    return response.blob();
}
