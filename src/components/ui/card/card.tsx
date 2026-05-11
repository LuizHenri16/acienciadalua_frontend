import Link from "next/link";
import { Material } from "@/types/material";

interface CardProps {
    material: Material
}

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCard({ material }: CardProps) {
    return (
        <div key={material.id} className="bg-white h-80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="w-full aspect-4/3 bg-[#7c4dbe]" />
            <div className="p-3 flex flex-col gap-2 flex-1">
                <p className="text-sm font-medium text-[#171717] leading-snug">
                    {material.name}
                </p>
                <p className="text-sm font-bold text-[#171717]">
                    {formatPrice(material.price)}
                </p>
                <Link
                    href={`/product/${material.id}`}
                    className="mt-auto w-full cursor-pointer bg-[#3D6B5C] hover:bg-[#2f5549] transition-colors text-white text-xs font-medium py-2 rounded-lg text-center block"
                >
                    ver detalhes
                </Link>
            </div>
        </div>
    );
}

