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

    function checkSession() {
        const token = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);

        setTimeout(() => {
            if (!token) {
                router.push("/panel/signin");
                return;
            }
            setIsAuthenticated(true);
        }, 300);
    }

    useEffect(() => {
        checkSession();
        adminGetProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

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
                    <div className="mt-8 text-center text-sm text-gray-400">Carregando produtos...</div>
                ) : (
                    <ProductList products={products} />
                )}
            </div>
        </div>
    );
}
