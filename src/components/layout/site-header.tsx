'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {

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
        <header className={`w-full fixed top-0 left-0 right-0 z-50 px-2 transition-colors duration-300 ${isScrolled ? "bg-marinho/80 backdrop-blur-md" : "bg-linear-to-b from-marinho/70 to-transparent"}`}>
            <nav aria-label="Navegação principal" className="max-w-7xl mx-auto flex justify-between items-center py-2 px-3 sm:px-8 lg:px-14">
                <a
                    href="#banner"
                    className="flex flex-row items-center gap-2 py-2 cursor-pointer"
                    aria-label="Ir para o início da página"
                >
                    <Image src="/acienciadalua-logo-var1.svg" alt="A ciência da Lua - logo" width={36} height={36} />
                    <span className="font-unkempt text-lg sm:text-2xl lg:text-4xl text-ouro">
                        A Ciência da <span className="text-lg sm:text-2xl lg:text-4xl text-turquesa-dark">Lua</span>
                    </span>
                </a>
                <button onClick={() => router.push("/minha-conta/signin")} className="-m-3 p-3 min-h-11 text-white/90 text-sm md:text-base font-semibold transition-colors hover:opacity-90 cursor-pointer active:scale-95 shrink-0"> Minha conta </button>
            </nav>
        </header>
    );
}
