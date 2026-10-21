'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccountHeader } from "@/components/layout/account-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccountWelcome } from "@/components/account/account-banner";
import { MaterialSection } from "@/components/account/material-section";
import { Material } from "@/types/material";
import { getMe, getMyPurchases } from "@/lib/api/customers";
import { getCustomerToken } from "@/lib/auth/cookies";
import { LoadingPage } from "@/components/ui/loading-page";
import { BackgroundLights } from "@/components/ui/background-lights";
import { BackVitrine } from "@/components/ui/back-vitrine";

export default function Conta() {
    const [userName, setUserName] = useState("");
    const [materials, setMaterials] = useState<Material[]>([]);
    const [materialsLoading, setMaterialsLoading] = useState(true);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        Promise.all([getMe(getCustomerToken()), getMyPurchases(getCustomerToken())])
            .then(([me, purchases]) => {
                setUserName(me.name ?? me.email ?? "");
                setMaterials([...purchases.student, ...purchases.teacher]);
            })
            .catch(() => {
                router.push("/minha-conta/signin");
            })
            .finally(() => {
                setLoading(false);
                setMaterialsLoading(false);
            });
    }, [router]);

    if (loading) {
        return <LoadingPage message="Verificando sessão" />;
    }

    return (
        <div className="w-full min-h-dvh flex flex-col bg-[#fafafa] font-sora relative">
            <BackgroundLights />
            <AccountHeader />
            <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20 flex flex-col gap-6">
                <AccountWelcome totalMateriais={materials.length} userName={userName} />
                <MaterialSection materials={materials} loading={materialsLoading} />

                <div className="flex justify-center border-t border-borda pt-6">
                    <BackVitrine tone="light" />
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
