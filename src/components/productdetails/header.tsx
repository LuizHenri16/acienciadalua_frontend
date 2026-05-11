import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProductDetailsHeader() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3 text-[#171717] text-lg hover:opacity-70 transition-opacity">
                <ArrowLeft size={22} strokeWidth={2.5} />
                Vitrine
            </Link>
            <Link href="/minhaconta/signin" className="text-gray-500 text-sm hover:text-[#68B999] transition-colors">
                Minha conta
            </Link>
        </header>
    )
}