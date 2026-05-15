import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  function handleExit() {
    router.push("/panel/signin");
  }

  return (
    <header className="w-full border-b border-[#E5E5E3] bg-[#FAFAFA]/80 backdrop-blur-md sticky px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 ">
        <div
          className="flex flex-row items-center cursor-pointer"
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
