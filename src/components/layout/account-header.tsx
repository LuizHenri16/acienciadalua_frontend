'use client'

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearCustomerToken } from "@/lib/auth/cookies";

export function AccountHeader() {
    const router = useRouter();

    const handleExit = () => {
        clearCustomerToken();
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
