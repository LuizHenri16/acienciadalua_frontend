import { Material } from "@/types/material";
import { ProductCard } from "../card/card";

interface ProductGridProps {
    materials: Material[];
    error?: string | null;
}

export function ProductGrid({ materials, error }: ProductGridProps) {
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <p className="text-sm text-texto-secundario">{error}</p>
            </div>
        );
    }

    if (materials.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <p className="text-sm font-semibold text-texto-principal">Nenhum material disponível ainda.</p>
                <p className="text-sm text-texto-secundario">Volte em breve — estamos preparando novidades.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
                <ProductCard key={material.id} material={material} />
            ))}
        </div>
    );
}
