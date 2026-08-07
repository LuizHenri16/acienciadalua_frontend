"use client";

import { Material } from "@/types/material";
import { MonitorPlay, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductGrid } from "../ui/grid/productGrid";
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
      <ProductGrid materials={materials.slice(0, 3)} error={error} />
      <div className="mt-8 flex justify-center">
        <Link
          href="/produtos?categoria=professores"
          className="inline-flex items-center gap-2 border-2 border-rosa-rose text-rosa-rose font-bold text-sm px-6 py-3 squircle-border transition-all duration-300 hover:bg-rosa-rose hover:text-white group"
        >
          Ver todos os materiais para Professores
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.section>
  );
}
