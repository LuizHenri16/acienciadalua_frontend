import { ArrowLeft, UserIcon } from "lucide-react";
import Link from "next/link";

export function CatalogHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-borda">
            <nav aria-label="Navegação do catálogo" className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 min-h-[var(--header-h)]">
                <Link href="/" className="-m-3 flex items-center gap-2 p-3 text-texto-principal text-sm font-semibold hover:text-turquesa-deep transition-colors transition-opacity group">
                    <ArrowLeft size={16} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
                    Vitrine
                </Link>

                <div className="hidden md:flex items-center gap-1 text-xs text-texto-terciario font-medium">
                    <span className="opacity-50" style={{ fontFamily: "var(--font-unkempt)", fontSize: "1rem" }}>A Ciência da Lua</span>
                    <span className="mx-2 opacity-30">/</span>
                    <span className="text-turquesa-deep">Catálogo</span>
                </div>

                <Link href="/minha-conta/signin" className="-m-3 flex gap-1 items-center p-3 min-h-11 text-azul-med transition-opacity">
                    <UserIcon size={20} />
                    <span className="text-xs">Minha conta</span>
                </Link>
            </nav>
        </header>
    );
}