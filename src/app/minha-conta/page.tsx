'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Banner } from "@/components/myaccount/banner";
import { MaterialSection } from "@/components/myaccount/materialSection";
import { Material } from "@/types/material";
import { getMe, getMyPurchases } from "@/api/customer";
import { LoadingPage } from "@/components/ui/loading/loadingPage";
import { BackgroundLights } from "@/components/ui/decor/BackgroundLights";
import { BackVitrine } from "@/components/ui/button/button";

export default function Conta() {
    const [userName, setUserName] = useState("");
    const [materials, setMaterials] = useState<Material[]>([]);
    const [materialsLoading, setMaterialsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = document.cookie.match(/(?:^|;\s*)customer_token=([^;]*)/);

        setTimeout(async () => {
            if (!token) {
                router.push("/minha-conta/signin");
                return;
            }

            try {
                const [me, purchases] = await Promise.all([getMe(), getMyPurchases()]);
                setUserName(me.name ?? me.email);
                setMaterials([...purchases.student, ...purchases.teacher]);
                setIsAuthenticated(true);
            } catch {
                router.push("/minha-conta/signin");
            } finally {
                setMaterialsLoading(false);
            }
        }, 300);
    }, [router]);

    if (!isAuthenticated) {
        return <LoadingPage message="Verificando sessão" />;
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#fafafa] font-sora relative">
            <BackgroundLights />
            <DashboardHeader />
            <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20 flex flex-col gap-6">
                <Banner totalMateriais={materials.length} userName={userName} />
                <MaterialSection materials={materials} loading={materialsLoading} />

                <div className="flex justify-center border-t border-borda pt-6">
                    <BackVitrine />
                </div>
            </main>
            <Footer />
        </div>
    );
}
