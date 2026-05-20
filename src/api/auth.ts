const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function adminSignIn(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await fetch(`${API_URL}/auth/admin/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Credenciais inválidas');
    }

    return response.json();
}
