import { ArrowLeft, UserIcon } from "lucide-react";
import Link from "next/link";

export function ProductDetailsHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-borda">
            <Link href="/" className="flex items-center gap-2 text-texto-principal text-sm font-semibold hover:text-turquesa-dark transition-colors transition-opacity group">
                <ArrowLeft size={16} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
                Vitrine
            </Link>

            <div className="hidden md:flex items-center gap-1 text-xs text-texto-terciario font-medium">
                <span className="opacity-50" style={{ fontFamily: "var(--font-unkempt)", fontSize: "1rem" }}>A Ciência da Lua</span>
                <span className="mx-2 opacity-30">/</span>
                <span>Produto</span>
            </div>

            <Link href="/minha-conta/signin" className="text-azul-med flex gap-1 items-center opacity-80 hover:opacity-100 transition-opacity">
                <UserIcon size={20} />
                <p className="text-xs">Minha conta</p>
            </Link>
        </header>
    );
}