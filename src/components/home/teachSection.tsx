"use client";

import { Material } from "@/types/material";
import { MonitorPlay } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";
import { motion } from "framer-motion";

interface TeachSectionProps {
  materials: Material[];
  error?: string | null;
}

export function TeachSection({ materials, error }: TeachSectionProps) {
  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <MonitorPlay className="w-5 h-5 text-rosa-rose" />
        <h2 className="text-xl font-bold text-texto-principal">
          Para <span className="text-rosa-rose">Dar Aula</span>
        </h2>
      </div>
      <ProductCarousel materials={materials} isLoading={false} error={error} />
    </motion.section>
  );
}
