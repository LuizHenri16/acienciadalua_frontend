import { MonitorPlay } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";
import { Material, MaterialType } from "@/types/material";


import { ALL_MATERIALS } from "@/constants/materials";

export function TeachSection() {
  const teachMaterials = ALL_MATERIALS.filter(m => m.type === MaterialType.TEACH);
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <MonitorPlay className="w-5 h-5 text-[#171717]" />
        <h2 className="text-xl font-bold text-[#171717]">
          Para dar <span className="text-[#68B999]">aula</span>
        </h2>
      </div>

      <ProductCarousel materials={teachMaterials} />
    </section>
  );
}
