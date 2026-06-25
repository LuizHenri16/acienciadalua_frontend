"use client";

import { Material } from "@/types/material";
import { BookOpen } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";
import { motion } from "framer-motion";

interface StudySectionProps {
  materials: Material[];
}

export function StudySection({ materials }: StudySectionProps) {
  return (
    <motion.section
      id="produtos"
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-turquesa-dark" />
        <h2 className="text-xl font-bold text-texto-principal">
          Para <span className="text-turquesa-dark">Estudar</span>
        </h2>
      </div>
      <ProductCarousel materials={materials} isLoading={false} />
    </motion.section>
  );
}
