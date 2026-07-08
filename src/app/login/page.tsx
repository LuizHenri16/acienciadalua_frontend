'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/minha-conta/signin");
    }, [router]);

    return null;
}
