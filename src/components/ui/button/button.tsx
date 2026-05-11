'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";

export interface ButtonProps {
    name: string;
    loadingName?: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
}

export function Button({ name, loadingName, onClick, variant = 'primary', loading = false }: ButtonProps) {
    return (
        <button className={`w-full py-4 mt-5 cursor-pointer squircle-border shadow-md font-bold transition-colors ${variant === 'primary' ? 'bg-[#68B999] hover:opacity-90 text-white' : 'bg-[#3D6B5C] hover:opacity-90 text-[#E5E5E3]'}`}
            onClick={onClick}
            disabled={loading}>
            {loading ? <span className="w-full flex justify-center items-center gap-2 animate-pulse">{loadingName} <HashLoader size={20} color="white" /></span> : <span className="font-medium">{name}</span>}
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