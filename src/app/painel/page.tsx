'use client';

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/adminPanel/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/adminPanel/dashboard/DashboardStats";
import { ProductList } from "@/components/adminPanel/dashboard/ProductList";
import { Material } from "@/types/material";
import { adminGetProducts } from "@/api/product";
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/components/ui/loading/loadingPage";

export default function Panel() {
    const [products, setProducts] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);

        if (!token) {
            router.push("/painel/signin");
            return;
        }
        setIsAuthenticated(true);

        adminGetProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [router]);

    function handleToggle(id: string, newState: boolean) {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, isActive: newState } : p)
        );
    }

    const total = products.length;
    const ativos = products.filter(p => p.isActive).length;
    const inativos = total - ativos;

    if (!isAuthenticated) {
        return <LoadingPage message="Verificando sessão" />;
    }

    return (
        <div className="min-h-screen w-full bg-[#fafafa]">
            <DashboardHeader />
            <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col">
                <DashboardStats total={total} ativos={ativos} inativos={inativos} />
                {loading ? (
                    <div className="mt-8 flex flex-col gap-3 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 squircle-border bg-white">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0" />
                                    <div className="flex flex-col gap-2 min-w-0 flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                                    <div className="h-5 bg-gray-200 rounded-full w-16" />
                                    <div className="h-8 bg-gray-200 rounded-lg w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ProductList products={products} onToggle={handleToggle} />
                )}
            </div>
        </div>
    );
}
