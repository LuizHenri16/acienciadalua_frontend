'use client';

import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearAdminTokens } from "@/lib/auth/cookies";

export function AdminHeader() {
  const router = useRouter();

  function handleExit() {
    clearAdminTokens();
    router.push("/painel/signin");
  }

  return (
    <header className="w-full border-b border-borda bg-off-white/80 backdrop-blur-md sticky px-4 sm:px-6 py-2 sm:py-3">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/painel" className="flex flex-row items-center cursor-pointer min-w-0 min-h-11">
          <Image src="/acienciadalua-logo-var1.svg" alt="Logotipo A Ciência da Lua" width={32} height={32} />
          <div className="font-unkempt text-xl sm:text-2xl text-ouro-ink">
            A Ciência da <span className="text-xl sm:text-2xl text-turquesa-deep">Lua</span>
          </div>
        </Link>

        <button onClick={handleExit} className="flex items-center gap-1.5 px-3 min-h-11 text-sm text-turquesa-deep border border-turquesa-dark squircle-border transition-colors hover:opacity-80 cursor-pointer active:scale-95 shrink-0">
          Sair <LogOutIcon size={14} />
        </button>
      </div>
    </header>
  );
}
