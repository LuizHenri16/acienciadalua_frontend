import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProductDetailsHeader() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-1 text-text-principal text-lg hover:opacity-70 transition-opacity">
                <ArrowLeft size={18} strokeWidth={2.5} />
                Vitrine
            </Link>
            <Link href="/minhaconta/signin" className="text-sm text-azul-med opacity-80 transition-opacity">
                Minha conta
            </Link>
        </header>
    )
}