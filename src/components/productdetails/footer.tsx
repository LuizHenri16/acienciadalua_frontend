'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductDetailsFooter() {
    const router = useRouter();

    return (
        <footer className="mt-auto border-t border-gray-100 flex justify-center bg-[#fafafa]">
            <button onClick={() => router.back()} className="flex items-center gap-2 py-4 text-[#3D6B5C] font-bold text-sm hover:gap-3 transition-all">
                <ArrowLeft size={18} strokeWidth={2.5} />
                Voltar à vitrine
            </button>
        </footer>
    )
}