import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProductDetailsFooter() {
    return (
        <footer className="mt-auto border-t border-gray-100 flex justify-center bg-[#fafafa]">
            <Link href="/" className="flex items-center gap-2 py-4 text-[#3D6B5C] font-bold text-sm hover:gap-3 transition-all">
                <ArrowLeft size={18} strokeWidth={2.5} />
                Voltar à vitrine
            </Link>
        </footer>
    )
}