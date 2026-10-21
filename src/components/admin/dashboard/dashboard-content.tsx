'use client';

import { useCallback, useEffect, useState } from "react";
import { AdminHeader } from "@/components/layout/admin-header";
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats";
import { ProductList } from "@/components/admin/dashboard/product-list";
import { Material } from "@/types/material";
import { adminGetProducts } from "@/lib/api/admin-products";
import { getAdminToken } from "@/lib/auth/cookies";

export function AdminDashboard() {
    const [products, setProducts] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProducts = useCallback(() => {
        adminGetProducts(getAdminToken())
            .then(setProducts)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    function handleRetry() {
        setLoading(true);
        setError(false);
        fetchProducts();
    }

    function handleToggle(id: string, newState: boolean) {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, isActive: newState } : p)
        );
    }

    const total = products.length;
    const ativos = products.filter(p => p.isActive).length;
    const inativos = total - ativos;

    return (
        <div className="min-h-dvh w-full bg-[#fafafa]">
            <AdminHeader />
            <main id="main-content" tabIndex={-1} className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col">
                <DashboardStats total={total} ativos={ativos} inativos={inativos} />
                {error ? (
                    <div role="alert" className="mt-8 flex flex-col items-center gap-3 px-6 py-8 squircle-border border border-coral/30 bg-coral/10 text-center">
                        <p className="text-sm font-medium text-texto-principal">Não foi possível carregar os produtos.</p>
                        <button
                            type="button"
                            onClick={handleRetry}
                            className="px-4 py-2 squircle-border bg-turquesa-deep text-white text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : loading ? (
                    <div role="status" aria-live="polite" aria-busy="true" className="mt-8 flex flex-col gap-3 animate-pulse">
                        <span className="sr-only">Carregando…</span>
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
            </main>
        </div>
    );
}
