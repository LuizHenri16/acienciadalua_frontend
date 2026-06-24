'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingPage } from "@/components/ui/loading/loadingPage";
import { Suspense } from "react";

function LoginHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("access_token");

        if (!token) {
            router.replace("/minha-conta/signin");
            return;
        }

        document.cookie = `customer_token=${token}; path=/; max-age=3600; SameSite=Strict`;
        router.replace("/minha-conta");
    }, [router, searchParams]);

    return <LoadingPage message="Verificando acesso" />;
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoadingPage message="Carregando" />}>
            <LoginHandler />
        </Suspense>
    );
}
