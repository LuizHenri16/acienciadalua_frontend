'use client'

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {

    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`w-full sticky top-0 z-50 ${isScrolled ? "bg-[#fafafa]/0 backdrop-blur-3xl" : "bg-marinho"} `}>
            <div className="max-w-5xl mx-auto flex justify-between items-center px-2 md:px-6 py-2">
                <div className="flex flex-row items-center gap-2 p-2 cursor-pointer"
                    onClick={() => router.push("/")}>
                    <Image src="/acienciadalua-logo-var1.svg" alt="A ciência da Lua - logo" width={36} height={36} />
                    <h1 className="font-unkempt text-xl lg:text-4xl text-ouro">
                        A Ciência da <span className="text-xl lg:text-3xl text-turquesa-dark">Lua</span>
                    </h1>
                </div>
                <button onClick={() => router.push("/minha-conta/signin")} className="text-azul-med text-sm transition-colors hover:opacity-90 cursor-pointer active:scale-95"> Minha conta </button>
            </div>
        </header>
    );
}

export function DashboardHeader() {
    const router = useRouter();

    const handleExit = () => {
        router.push("/");
    };

    return (
        <header className="w-full border-b border-[#E5E5E3] bg-[#FAFAFA]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2">
                <div
                    className="flex flex-row items-center gap-2 p-2 cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={32} height={32} />
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