const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(category?: 'STUDENT' | 'TEACHER') {
    const params = new URLSearchParams();
    params.append('isActive', 'true');
    if (category) {
        params.append('category', category);
    }
    const response = await fetch(`${API_URL}/products?${params.toString()}`, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
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
