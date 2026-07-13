"use client";

import { Material } from "@/types/material";
import { BookOpen } from "lucide-react";
import { ProductCarousel } from "../ui/carousel/productCarousel";
import { motion } from "framer-motion";

interface StudySectionProps {
  materials: Material[];
  error?: string | null;
}

export function StudySection({ materials, error }: StudySectionProps) {
  return (
    <motion.section
      id="produtos"
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex gap-2 items-center">
        <BookOpen className="w-5 h-5 lg:w-8 lg:h-8 text-turquesa-dark" />
        <h2 className="text-xl lg:text-2xl font-bold text-texto-principal">
          Materiais para <span className="text-turquesa-dark">Alunos</span>
        </h2>
        </div>
        <p className="text-md text-texto-secundario">Chega de decoreba. Encontre resumos visuais e guias práticos para dominar a Química, salvar sua nota e vencer os vestibulares no seu próprio ritmo</p>
      </div>
      <ProductCarousel materials={materials} isLoading={false} error={error} />
    </motion.section>
  );
}
