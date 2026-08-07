import { MetadataRoute } from "next";

const BASE_URL = "https://acienciadalua.com.br";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  id: string;
  updatedAt?: string;
}

async function getActiveProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products?isActive=true`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getActiveProducts();

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/produto/${product.id}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/produtos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/produtos?categoria=alunos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/produtos?categoria=professores`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/minha-conta`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...productEntries,
  ];
}
