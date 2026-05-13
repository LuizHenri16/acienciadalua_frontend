"use client";

import { MonitorPlay } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";
import { Material, MaterialType } from "@/types/material";

import { ALL_MATERIALS } from "@/constants/materials";
import { useState, useEffect } from "react";

export function TeachSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [teachMaterials, setTeachMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const materials = ALL_MATERIALS.filter(m => m.type === MaterialType.TEACH);
      setTeachMaterials(materials);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <MonitorPlay className="w-5 h-5 text-ouro" />
        <h2 className="text-xl font-bold text-texto-principal">
          Para <span className="text-ouro">Dar Aula</span>
        </h2>
      </div>

      <ProductCarousel materials={teachMaterials} isLoading={isLoading} />
    </section>
  );
}
