import { Material } from "@/types/material";
import { ProductCard } from "../card/card";

interface ProductCarouselProps {
    materials: Material[];
}

export function ProductCarousel({ materials }: ProductCarouselProps) {
    return (
        <div className="relative w-full">
            <div className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth px-1">
                {materials.map((material) => (
                    <div
                        key={material.id}
                        className="min-w-[240px] md:min-w-[280px] cursor-pointer snap-start transition-transform duration-300 hover:opacity-95"
                    >
                        <ProductCard material={material} />
                    </div>
                ))}
                <div className="min-w-px h-full" />
            </div>
        </div>
    );
}
