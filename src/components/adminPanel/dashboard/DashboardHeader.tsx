'use client';

import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  function handleExit() {
    document.cookie = 'admin_token=; path=/; max-age=0';
    document.cookie = 'admin_refresh_token=; path=/; max-age=0';
    router.push("/painel/signin");
  }

  return (
    <header className="w-full border-b border-[#E5E5E3] bg-[#FAFAFA]/80 backdrop-blur-md sticky px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-2 lg:px-8">
        <Link href="/panel" className="flex flex-row items-center cursor-pointer">
          <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={32} height={32} />
          <h1 className="font-unkempt text-2xl text-ouro">
            A Ciência da <span className="text-2xl text-turquesa-dark">Lua</span>
          </h1>
        </Link>

        <button onClick={handleExit} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-turquesa-dark border border-turquesa-dark squircle-border transition-colors hover:opacity-80 cursor-pointer active:scale-95">
          Sair <LogOutIcon size={14} />
        </button>
      </div>
    </header>
  );
}
