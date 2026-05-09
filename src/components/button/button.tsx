'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";


export interface ButtonProps {
    name: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

export function Button({ name, onClick, variant = 'primary' }: ButtonProps) {
    return (
        <button className={`w-full py-3.5 mt-5 cursor-pointer rounded-xl shadow-md font-bold transition-colors ${variant === 'primary' ? 'bg-[#68B999] hover:opacity-90 text-white' : 'bg-[#3D6B5C] hover:opacity-90 text-[#E5E5E3]'}`}
            onClick={onClick}>
            {name}
        </button>
    );
}

export function BackVitrine() {
    const router = useRouter();

    return (
        <button className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-colors" onClick={() => router.push("/")}>
            <Image src="/arrow-back.svg" alt="Logo" width={11} height={9} /> <p className="font-medium text-sm"> Voltar à vitrine</p>
        </button>
    );
}