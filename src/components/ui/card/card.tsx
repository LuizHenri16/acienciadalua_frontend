import Link from "next/link";
import { Material } from "@/types/material";
import { ArrowLeftCircleIcon, ArrowRightCircle, ArrowRightFromLine, ArrowRightIcon } from "lucide-react";

interface CardProps {
    material: Material
}

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCard({ material }: CardProps) {
    return (
        <div key={material.id} className="bg-white h-84 border border-borda-med squircle-border overflow-hidden flex flex-col">
            <div className="w-full aspect-4/3 bg-[#7c4dbe]" />
            <div className="p-3 flex flex-col gap-2 flex-1">
                <p className={`p-0.5 text-[0.6rem] md:text-xs font-normal text-center uppercase squircle-border ${material.category === "Plano de aula" ? "bg-ouro-light text-[#7A5200] w-24 md:w-30" : "bg-turquesa-light text-petroleo w-34 md:w-38"} `}>
                    {material.category}
                </p>
                <p className="text-sm font-medium text-texto-principal leading-snug">
                    {material.title}
                </p>
                <p className="text-sm font-bold text-texto-principal">
                    {formatPrice(material.price)}
                </p>
                <Link
                    href={`/product/${material.id}`}
                    className="flex gap-0.5 mt-auto mb-1 cursor-pointer font-medium transition-colors text-azul-med hover:text-turquesa-dark text-xs"
                >
                    ver detalhes <ArrowRightIcon size={16} />
                </Link>
            </div>
        </div>
    );
}

