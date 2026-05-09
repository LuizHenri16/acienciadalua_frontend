'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {

    const router = useRouter();

    return (
        <header className="w-full flex justify-between px-6 py-1  border-custom-light-gray">
            {/* Logo */}
            <div className="flex flex-row items-center gap-2 p-2">
                <Image src="/acienciadalua-logo.svg" alt="Logo" width={30} height={30} />
                <h1 className="font-unkempt text-2xl text-yellow-light-custom">A Ciência da <span className="text-2xl text-green-dark-custom">Lua</span> </h1>
            </div>

            {/* My Account Button */}
            <button onClick={() => router.push("/minhaconta/signin")}
                className="rounded-lg font-light text-[#5A5A58] transition-colors hover:opacity-90 cursor-pointer">
                Minha conta
            </button>
        </header>
    );
}