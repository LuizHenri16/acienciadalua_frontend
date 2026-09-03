import { ProductDetailsFooter } from "@/components/productdetails/footer";
import { ProductDetailsHeader } from "@/components/productdetails/header";
import { ProductDetails } from "@/components/productdetails/productDetails";
import { getProductById } from "@/api/product";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";

const siteUrl = "https://acienciadalua.com.br";

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return {
            title: "Produto não encontrado",
            robots: { index: false, follow: false },
        };
    }

    const productUrl = `${siteUrl}/produto/${id}`;
    const imageUrl = product.coverUrl ?? `${siteUrl}/acienciadalua-logo-var1.svg`;
    const price = (product.price / 100).toFixed(2);

    return {
        title: product.title,
        description:
            product.description ??
            `${product.title} — Material didático de Ciências criado pela Profa. Lua para Ensino Fundamental e Médio.`,
        alternates: {
            canonical: productUrl,
        },
        openGraph: {
            title: `${product.title} | A Ciência da Lua`,
            description:
                product.description ??
                `${product.title} — Material didático de Ciências para alunos e professores.`,
            url: productUrl,
            siteName: "A Ciência da Lua",
            locale: "pt_BR",
            type: "website",
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: product.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.title} | A Ciência da Lua`,
            description:
                product.description ??
                `${product.title} — Material didático de Ciências.`,
            images: [imageUrl],
        },
    };
}

function buildProductSchema(product: {
    id: string;
    title: string;
    description?: string;
    price: number;
    coverUrl?: string;
    updatedAt?: string;
}) {
    const productUrl = `${siteUrl}/produto/${product.id}`;
    const imageUrl = product.coverUrl ?? `${siteUrl}/acienciadalua-logo-var1.svg`;
    const price = (product.price / 100).toFixed(2);

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description:
            product.description ??
            `${product.title} — Material didático de Ciências para Ensino Fundamental e Médio.`,
        image: imageUrl,
        url: productUrl,
        brand: {
            "@type": "Brand",
            name: "A Ciência da Lua",
        },
        offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "BRL",
            price: price,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "A Ciência da Lua",
            },
        },
    };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const productSchema = buildProductSchema(product);

    return (
        <div className="min-h-screen flex flex-col font-sora bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ProductDetailsHeader />
            <div className="flex flex-col flex-1 pt-16 lg:h-screen lg:overflow-hidden">
                <ProductDetails product={product} />
                <Footer/>
            </div>
        </div>
    );
}
