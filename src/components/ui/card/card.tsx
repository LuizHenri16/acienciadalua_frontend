import Link from "next/link";
import { Material, MaterialType, getMaterialFormat } from "@/types/material";
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
    const isFree = material.price <= 0;
    const format = getMaterialFormat(material);

    const coverUrl = material.coverUrl
        ? `${API_URL}/uploads/${material.coverUrl}`
        : null;

    const badgeBg = isTeacher
        ? "bg-rosa-rose/90 hover:bg-rosa-rose"
        : "bg-turquesa-dark/90 hover:bg-turquesa-dark";

    return (
        <div className="group bg-white border border-borda rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full">
            <div className="relative aspect-[4/3] overflow-hidden bg-off-white">
                <Link
                    href={`/produto/${material.id}`}
                    aria-label={material.title}
                    className="absolute inset-0 block"
                    tabIndex={-1}
                >
                    {coverUrl ? (
                        <Image
                            src={coverUrl}
                            alt={material.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                            📚
                        </div>
                    )}
                </Link>
                <span className={`absolute top-3 left-3 z-10 text-white text-[0.6rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors ${badgeBg}`}>
                    {format}
                </span>
                {isFree && (
                    <span className="absolute top-3 right-3 z-10 bg-ouro text-marinho text-[0.6rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Gratuito
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2.5 p-5 flex-1">
                <span className="text-lg font-extrabold text-turquesa-dark tracking-tight">
                    {formatPrice(material.price)}
                </span>

                <h3 className="text-[1rem] font-bold text-texto-principal leading-snug line-clamp-2">
                    {material.title}
                </h3>

                {material.description && (
                    <p className="text-xs text-texto-terciario leading-relaxed line-clamp-2">
                        {material.description}
                    </p>
                )}

                <Link
                    href={`/produto/${material.id}`}
                    className="bg-turquesa-dark text-white mt-auto flex items-center justify-center gap-2 hover:gap-3 w-full py-3.5 squircle-border font-bold text-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
                >
                    Ver Detalhes
                    <ArrowRightIcon size={14} />
                </Link>
            </div>
        </div>
    );
}
