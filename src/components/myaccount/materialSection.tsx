import { Material } from "@/types/material";
import { BannerNoMaterials } from "./banner";
import { PurchasedMaterialCard } from "../ui/card/purchasedMaterialCard";

interface MaterialSectionProps {
    materials: Material[]
}

export function MaterialSection({ materials }: MaterialSectionProps) {

    return (
        <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-sm font-semibold text-texto-secundario">Meus materiais</h1>
            {materials.length > 0 ? (
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