"use client";

import { Material, MaterialType } from "@/types/material";
import { BookOpen } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";

// Data Mock
import { ALL_MATERIALS } from "@/constants/materials";
import { useState, useEffect } from "react";

export function StudySection() {
  const [isLoading, setIsLoading] = useState(true);
  const [studyMaterials, setStudyMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const materials = ALL_MATERIALS.filter(m => m.category === MaterialType.STUDENT);
      setStudyMaterials(materials);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-turquesa-dark" />
        <h2 className="text-xl font-bold text-texto-principal">
          Para <span className="text-turquesa-dark">Estudar</span>
        </h2>
      </div>

      <ProductCarousel materials={studyMaterials} isLoading={isLoading} />
    </section>
  );
}
