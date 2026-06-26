import { Material } from "@/types/material";
import { BannerNoMaterials } from "./banner";
import { PurchasedMaterialCard } from "../ui/card/purchasedMaterialCard";
import { Library } from "lucide-react";

interface MaterialSectionProps {
    materials: Material[]
    loading?: boolean
}

function SkeletonPurchasedCard() {
    return (
        <div className="flex items-stretch bg-white border border-borda-med rounded-2xl shadow-sm overflow-hidden animate-pulse">
            <div className="w-1.5 shrink-0 bg-gray-200" />
            <div className="flex items-center gap-4 flex-1 p-4">
                <div className="w-14 h-14 shrink-0 squircle-border bg-gray-200" />
                <div className="flex flex-col flex-1 min-w-0 gap-2">
                    <div className="h-4 bg-gray-200 rounded w-3/5" />
                    <div className="flex items-center gap-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-3 bg-gray-200 rounded w-20" />
                    </div>
                </div>
                <div className="w-16 h-9 bg-gray-200 squircle-border shrink-0" />
            </div>
        </div>
    );
}

export function MaterialSection({ materials, loading = false }: MaterialSectionProps) {

    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-turquesa-dark" />
                <h2 className="text-xl font-bold text-texto-principal">
                    Meus <span className="text-turquesa-dark">Materiais</span>
                </h2>
            </div>
            {loading ? (
                <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                        <SkeletonPurchasedCard key={i} />
                    ))}
                </div>
            ) : materials.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {materials.map((material) => (
                        <PurchasedMaterialCard
                            key={material.id}
                            material={material}
                        />
                    ))}
                </div>
            ) : (
                <BannerNoMaterials />
            )}
        </div>
    );
}