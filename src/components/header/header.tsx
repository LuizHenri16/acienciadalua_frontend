'use client'

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {

    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 80);
                ticking = false;
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`w-full fixed top-0 left-0 right-0 z-50 px-2 transition-colors duration-300 ${isScrolled ? "bg-marinho/80 backdrop-blur-md" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6 sm:px-10 lg:px-14">
                <div
                    className="flex flex-row items-center gap-2 py-2 cursor-pointer"
                    onClick={() => document.getElementById("banner")?.scrollIntoView({ behavior: "smooth" })}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById("banner")?.scrollIntoView({ behavior: "smooth" }); } }}
                    tabIndex={0}
                    role="button"
                    aria-label="Rolar para o topo da página"
                >
                    <Image src="/acienciadalua-logo-var1.svg" alt="A ciência da Lua - logo" width={36} height={36} />
                    <p className="font-unkempt text-xl lg:text-4xl text-ouro">
                        A Ciência da <span className="text-xl lg:text-4xl text-turquesa-dark">Lua</span>
                    </p>
                </div>
                <button onClick={() => router.push("/minha-conta/signin")} className="text-white/90 text-sm md:text-md font-semibold transition-colors hover:opacity-90 cursor-pointer active:scale-95"> Minha conta </button>
            </div>
        </header>
    );
}

export function DashboardHeader() {
    const router = useRouter();

    const handleExit = () => {
        document.cookie = "customer_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/");
    };

    return (
        <header className="w-full border-b border-borda bg-off-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2">
                <div
                    className="flex flex-row items-center gap-2 p-2 cursor-pointer"
                    onClick={() => router.push("/")}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push("/"); } }}
                    tabIndex={0}
                    role="button"
                    aria-label="Voltar para a página inicial"
                >
                    <Image src="/acienciadalua-logo-var1.svg" alt="Logotipo A Ciência da Lua" width={32} height={32} />
                    <h1 className="font-unkempt text-2xl text-ouro">
                        A Ciência da <span className="text-2xl text-turquesa-dark">Lua</span>
                    </h1>
                </div>

                <button onClick={handleExit} className="flex items-center gap-1 text-azul-med text-sm transition-colors hover:opacity-90 cursor-pointer active:scale-95">
                    Sair <LogOutIcon size={14} />
                </button>
            </div>
        </header>
    );
}