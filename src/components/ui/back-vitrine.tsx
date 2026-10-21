'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackVitrine() {
    const router = useRouter();

    return (
        <button className="flex items-center gap-1 cursor-pointer hover:gap-2 transition-all" onClick={() => router.push("/")}>
            <ArrowLeft size={16} className="text-azul-med" /> <p className="font-medium text-sm text-azul-med"> Voltar à vitrine</p>
        </button>
    );
}
