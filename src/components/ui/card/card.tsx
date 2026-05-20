'use client';

import Link from "next/link";
import { Material, MaterialType, getMaterialTypeLabel } from "@/types/material";
import { ArrowRightIcon } from "lucide-react";
import { API_URL } from "@/lib/constants/constants";
import { motion } from "framer-motion";

interface CardProps {
    material: Material
}

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCard({ material }: CardProps) {
    const isTeacher = material.category === MaterialType.TEACHER;
    const label = getMaterialTypeLabel(material.category);

    const coverUrl = material.coverUrl
        ? `${API_URL}/uploads/${material.coverUrl}`
        : null;

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: '0 8px 8px rgba(0,0,0,0.10)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white h-84 border border-borda-med squircle-border overflow-hidden flex flex-col cursor-pointer"
        >
            <div className="w-full h-40 bg-[#7c4dbe]">
                {coverUrl && (
                    <img src={coverUrl} alt={material.title} className="w-full h-full object-cover" />
                )}
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1">
                <p className={`p-0.5 text-[0.6rem] md:text-xs font-normal text-center uppercase squircle-border ${isTeacher ? "bg-ouro-light text-[#7A5200] w-24 md:w-30" : "bg-turquesa-light text-petroleo w-34 md:w-38"}`}>
                    {label}
                </p>
                <p className="text-sm font-medium text-texto-principal leading-snug">
                    {material.title}
                </p>
                <p className="text-lg font-bold text-texto-principal">
                    R$ {formatPrice(material.price)}
                </p>
                <Link
                    href={`/product/${material.id}`}
                    className="flex gap-0.5 mt-auto mb-1 cursor-pointer font-medium transition-colors text-azul-med hover:text-turquesa-dark text-xs"
                >
                    ver detalhes <ArrowRightIcon size={16} />
                </Link>
            </div>
        </motion.div>
    );
}
