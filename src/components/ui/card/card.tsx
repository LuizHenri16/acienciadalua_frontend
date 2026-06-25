'use client';

import Link from "next/link";
import { Material, MaterialType, getMaterialTypeLabel } from "@/types/material";
import { ArrowRightIcon } from "lucide-react";
import { API_URL } from "@/lib/constants/constants";
import Image from "next/image";

interface CardProps {
    material: Material;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export function ProductCard({ material }: CardProps) {
    const isTeacher = material.category === MaterialType.TEACHER;
    const label = getMaterialTypeLabel(material.category);

    const coverUrl = material.coverUrl
        ? `${API_URL}/uploads/${material.coverUrl}`
        : null;

    const headerBg = isTeacher ? "#8c3a52" : "#2C9E95";
    const headerGradient = isTeacher
        ? "from-[#D4728A] via-[#b85c75] to-[#8c3a52]"
        : "from-[#2C9E95] via-[#249188] to-[#1a6e67]";

    return (
        <div
            className="bg-white squircle-border overflow-visible flex flex-col cursor-pointer shadow-md transition-shadow duration-300 w-full"
        >
            <div className={`relative w-full rounded-t-4xl bg-linear-to-br ${headerGradient} overflow-hidden h-50 md:h-60 lg:h-68`}>
                <span className={`squircle-border backdrop-blur-sm absolute border border-white/40 top-4 left-4 z-10 text-white text-[0.6rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${isTeacher ? 'bg-rosa-rose/50' : 'bg-turquesa-light/60'}`}>
                    {label}
                </span>
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        alt={material.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                        📚
                    </div>
                )}
            </div>

            <div className="relative flex mt-4">
                <span className="bg-turquesa-dark text-white text-[1.05rem] lg:text-xl font-bold px-8 tracking-tight py-2.5 rounded-r-full">
                    {formatPrice(material.price)}
                </span>
            </div>

            <div className="flex flex-col gap-3 px-5 pt-4 pb-5 flex-1">
                <p className="text-[1rem] font-bold text-texto-principal leading-snug line-clamp-2">
                    {material.title}
                </p>

                {material.description && (
                    <p className="text-xs text-texto-terciario leading-relaxed line-clamp-2">
                        {material.description}
                    </p>
                )}

                <Link href={`/produto/${material.id}`} className="bg-turquesa-dark text-white mt-auto flex items-center justify-center gap-2 hover:gap-3  w-full py-3.5 squircle-border font-bold text-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]" >
                    <p>Ver detalhes</p>
                    <ArrowRightIcon size={14} />
                </Link>
            </div>
        </div>
    );
}
