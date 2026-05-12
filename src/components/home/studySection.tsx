import { Material, MaterialType } from "@/types/material";
import { BookOpen } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";

// Data Mock
import { ALL_MATERIALS } from "@/constants/materials";

export function StudySection() {
  const studyMaterials = ALL_MATERIALS.filter(m => m.type === MaterialType.STUDY);
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-[#171717]" />
        <h2 className="text-xl font-bold text-[#171717]">
          Para <span className="text-[#68B999]">Estudar</span>
        </h2>
      </div>

      <ProductCarousel materials={studyMaterials} />
    </section>
  );
}
