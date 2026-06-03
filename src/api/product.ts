const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Público (vitrine) ────────────────────────────────────────────────────────

export async function getProducts(category?: 'STUDENT' | 'TEACHER') {
    try {
        const params = new URLSearchParams();
        params.append('isActive', 'true');
        if (category) {
            params.append('category', category);
        }
        const response = await fetch(`${API_URL}/products?${params.toString()}`, {});

        if (!response.ok) return [];

        return response.json();
    } catch {
        return [];
    }
}

export async function getProductById(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

// ─── Autenticado (painel admin) ───────────────────────────────────────────────

function getToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);
    return match ? match[1] : '';
}

export async function adminGetProducts() {
    const response = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Falha ao buscar produtos');
    return response.json();
}

export async function adminGetProductById(id: string, token?: string) {
    const authToken = token ?? getToken();
    const response = await fetch(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        cache: 'no-store',
    });

    if (!response.ok) throw new Error('Produto não encontrado');
    return response.json();
}

export async function adminCreateProduct(data: FormData) {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
    });

    if (!response.ok) throw new Error('Falha ao criar produto');
    return response.json();
}

export async function adminUpdateProduct(id: string, data: FormData) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: data,
    });

    if (!response.ok) throw new Error('Falha ao atualizar produto');
    return response.json();
}

export async function adminToggleProduct(id: string) {
    const response = await fetch(`${API_URL}/products/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Falha ao alterar status do produto');
    return response.json();
}

export async function adminDeleteProduct(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error('Falha ao excluir produto');
}
