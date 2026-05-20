"use client";

import { Material } from "@/types/material";
import { MonitorPlay } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";

interface TeachSectionProps {
  materials: Material[];
}

export function TeachSection({ materials }: TeachSectionProps) {

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <MonitorPlay className="w-5 h-5 text-ouro" />
        <h2 className="text-xl font-bold text-texto-principal">
          Para <span className="text-ouro">Dar Aula</span>
        </h2>
      </div>
      <ProductCarousel materials={materials} isLoading={false} />
    </section>
  );
}
