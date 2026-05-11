import { MonitorPlay } from "lucide-react";
import { ProductCard } from "../ui/card";
import { Material, MaterialType } from "@/types/material";


// Placeholder for materials (will be replaced with API call)
const teachMaterials: Material[] = [
  { id: 1, name: "Plano de Aula — Ligações Iônicas", price: 24.9, type: MaterialType.TEACH },
  { id: 2, name: "Slides: Reações Orgânicas", price: 34.9, type: MaterialType.TEACH },
  { id: 3, name: "Kit Atividades — Soluções", price: 39.9, type: MaterialType.TEACH },
  { id: 4, name: "Banco de Questões ENEM Química", price: 49.9, type: MaterialType.TEACH },
];

export function TeachSection() {
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <MonitorPlay className="w-5 h-5 text-[#171717]" />
        <h2 className="text-xl text-[#171717]">
          Para dar <span className="text-[#68B999]">aula</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {teachMaterials.map((material) => (
          <ProductCard key={material.id} material={material} />
        ))}
      </div>
    </section>
  );
}
