const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createPreferences(productId: string): Promise<{ init_point: string }> {
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
