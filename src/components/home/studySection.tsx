"use client";

import { Material } from "@/types/material";
import { BookOpen } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";

interface StudySectionProps {
  materials: Material[];
}

export function StudySection({ materials }: StudySectionProps) {
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-turquesa-dark" />
        <h2 className="text-xl font-bold text-texto-principal">
          Para <span className="text-turquesa-dark">Estudar</span>
        </h2>
      </div>
      <ProductCarousel materials={materials} isLoading={false} />
    </section>
  );
}
