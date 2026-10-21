'use client';

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/layout/admin-header";
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats";
import { ProductList } from "@/components/admin/dashboard/product-list";
import { Material } from "@/types/material";
import { adminGetProducts } from "@/lib/api/admin-products";
import { getAdminToken } from "@/lib/auth/cookies";

export function AdminDashboard() {
    const [products, setProducts] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminGetProducts(getAdminToken())
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    function handleToggle(id: string, newState: boolean) {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, isActive: newState } : p)
        );
    }

    const total = products.length;
    const ativos = products.filter(p => p.isActive).length;
    const inativos = total - ativos;

    return (
        <div className="min-h-screen w-full bg-[#fafafa]">
            <AdminHeader />
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
