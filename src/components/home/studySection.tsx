import { Material, MaterialType } from "@/types/material";
import { BookOpen } from "lucide-react";
import { ProductCard } from "../ui/card";

const studyMaterials: Material[] = [
  { id: 1, name: "Caderno de Química Orgânica", price: 29.9, type: MaterialType.STUDY },
  { id: 2, name: "Resumão de Termoquímica", price: 19.9, type: MaterialType.STUDY },
  { id: 3, name: "Lista de Exercícios — Equilíbrio", price: 14.9, type: MaterialType.STUDY },
  { id: 4, name: "Mapa Mental: Tabela Periódica", price: 9.9, type: MaterialType.STUDY },
];

export function StudySection() {
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-[#171717]" />
        <h2 className="text-xl text-[#171717]">
          Para <span className="text-[#68B999]">Estudar</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {studyMaterials.map((material) => (
          <ProductCard key={material.id} material={material} />
        ))}
      </div>
    </section>
  );
}
