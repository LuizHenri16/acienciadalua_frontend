import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import type { Material } from "@/types/material";
import { CatalogContent } from "@/components/catalog/catalog-content";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";
import { SiteFooter } from "@/components/layout/site-footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Catálogo de Materiais",
    description:
        "Explore todos os materiais didáticos de Ciências da Profa. Lua: resumos, mapas conceituais e exercícios para alunos, e jogos, slides e planos de aula para professores.",
    alternates: {
        canonical: "/produtos",
    },
};

async function fetchAllProducts(): Promise<{ materials: Material[]; error: string | null }> {
    try {
        const [students, teachers] = await Promise.all([
            getProducts("STUDENT"),
            getProducts("TEACHER"),
        ]);
        return { materials: [...students, ...teachers], error: null };
    } catch {
        return {
            materials: [],
            error: "Não foi possível carregar os materiais. Tente novamente mais tarde.",
        };
    }
}

export default async function ProdutosPage() {
    const { materials, error } = await fetchAllProducts();

    return (
        <CatalogShell>
            <main id="main-content" className="flex-1 pt-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <Suspense fallback={<CatalogSkeleton />}>
                        <CatalogContent materials={materials} error={error} />
                    </Suspense>
                </div>
            </main>
            <SiteFooter />
        </CatalogShell>
    );
}
