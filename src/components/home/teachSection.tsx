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
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex flex-row gap-2 items-center">
        <MonitorPlay className="w-5 h-5 lg:w-8 lg:h-8 text-rosa-rose" />
        <h2 className="text-xl lg:text-2xl font-bold text-texto-principal">
          Materiais para <span className="text-rosa-rose">Professores</span>
        </h2>
        </div>
        <p className="text-md text-texto-secundario">Economize horas de planejamento. Encontre jogos didáticos, slides dinâmicos e planos de aula prontos para encantar seus alunos e transformar o ensino de Química.</p>
      </div>
      <ProductCarousel materials={materials} isLoading={false} error={error} />
    </motion.section>
  );
}
