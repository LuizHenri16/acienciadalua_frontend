import { ProductDetails } from "@/components/product/product-details";
import { getProductById } from "@/lib/api/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/config/site";
import { buildProductSchema } from "@/lib/seo/schemas";

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

    const productUrl = `${SITE_URL}/produto/${id}`;
    const imageUrl = product.coverUrl ?? `${SITE_URL}/acienciadalua-logo-var1.svg`;

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

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <>
            <JsonLd data={buildProductSchema(product)} />
            <CatalogShell>
                <div className="flex flex-col flex-1 pt-[var(--header-h)]">
                    <ProductDetails product={product} />
                    <SiteFooter/>
                </div>
            </CatalogShell>
        </>
    );
}
