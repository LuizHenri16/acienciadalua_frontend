import { Material } from "@/types/material";
import { BannerNoMaterials } from "@/components/account/account-banner";
import { PurchasedMaterialCard } from "@/components/account/purchased-material-card";
import { Library } from "lucide-react";

interface MaterialSectionProps {
    materials: Material[]
    loading?: boolean
}

function SkeletonPurchasedCard() {
    return (
        <div className="flex items-stretch bg-white border border-borda-med squircle-border shadow-sm overflow-hidden">
            <div className="w-1.5 shrink-0 skeleton-shimmer" />
            <div className="flex items-center gap-4 flex-1 p-4">
                <div className="w-14 h-14 shrink-0 squircle-border skeleton-shimmer" />
                <div className="flex flex-col flex-1 min-w-0 gap-2">
                    <div className="h-4 rounded-full w-3/5 skeleton-shimmer" />
                    <div className="flex items-center gap-2">
                        <div className="h-3 rounded-full w-16 skeleton-shimmer" />
                        <div className="h-3 rounded-full w-20 skeleton-shimmer" />
                    </div>
                </div>
                <div className="w-20 h-9 rounded-full skeleton-shimmer shrink-0" />
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
                <div role="status" aria-live="polite" aria-busy="true" className="flex flex-col gap-3">
                    <span className="sr-only">Carregando materiais…</span>
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
