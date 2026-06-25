const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

export async function adminSignIn(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await fetch(`${API_URL}/auth/admin/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new HttpError('Credenciais inválidas', response.status);
    }

    return response.json();
}
