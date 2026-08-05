import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/api/product";
import type { Material } from "@/types/material";
import { CatalogContent } from "@/components/catalog/catalogContent";
import { ProductDetailsHeader } from "@/components/productdetails/header";
import { ProductDetailsFooter } from "@/components/productdetails/footer";

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

function CatalogLoading() {
    return (
        <div className="flex flex-col gap-8">
            <div className="h-9 w-56 bg-gray-200/70 rounded-xl animate-pulse" />
            <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-11 w-40 bg-gray-200/70 rounded-2xl animate-pulse" />
                ))}
            </div>
            <div className="h-12 w-full bg-gray-200/70 rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-[4/3] bg-gray-200/70 rounded-2xl animate-pulse" />
                ))}
            </div>
        </div>
    );
}

export default async function ProdutosPage() {
    const { materials, error } = await fetchAllProducts();

    return (
        <div className="min-h-screen flex flex-col font-sora bg-off-white">
            <ProductDetailsHeader />
            <main id="main-content" className="flex-1 pt-[65px]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                    <Suspense fallback={<CatalogLoading />}>
                        <CatalogContent materials={materials} error={error} />
                    </Suspense>
                </div>
            </main>
            <ProductDetailsFooter />
        </div>
    );
}
