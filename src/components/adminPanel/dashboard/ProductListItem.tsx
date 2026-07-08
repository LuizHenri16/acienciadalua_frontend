'use client';

import { useState } from 'react';
import { Edit } from "lucide-react";
import Link from "next/link";
import { Material, MaterialType, getMaterialTypeLabel } from "@/types/material";
import { API_URL } from "@/lib/constants/constants";
import { adminToggleProduct } from "@/api/product";
import Image from "next/image";

interface ProductListItemProps {
  product: Material;
  onToggle: (id: string, newState: boolean) => void;
}

export function ProductListItem({ product, onToggle }: ProductListItemProps) {
  const [toggling, setToggling] = useState(false);
  const isTeacher = product.category === MaterialType.TEACHER;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const label = getMaterialTypeLabel(product.category);

  const coverUrl = product.coverUrl
    ? `${API_URL}/uploads/${product.coverUrl}`
    : null;

  async function handleToggle() {
    if (toggling) return;
    setToggling(true);
    try {
      await adminToggleProduct(product.id);
      onToggle(product.id, !product.isActive);
    } finally {
      setToggling(false);
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-3 border border-borda squircle-border bg-white shadow-sm hover:shadow-md transition-shadow ${!product.isActive ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-12 h-12 rounded-lg bg-turquesa-dark overflow-hidden shrink-0 relative">
          {coverUrl && (
            <Image src={coverUrl} alt={product.title} fill className="object-cover" sizes="48px" />
          )}
        </div>

        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="text-sm font-bold text-texto-principal line-clamp-1">{product.title}</span>

          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 sm:items-center">
            <span className="text-xs text-texto-secundario shrink-0">{formattedPrice}</span>
            <span className={`py-0.5 text-[0.6rem] md:text-xs font-medium text-center squircle-border shrink-0 ${isTeacher ? "bg-rosa-rose text-white w-24 md:w-30" : "bg-turquesa-light text-petroleo w-34 md:w-38"}`}>{label}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
        <button
          type="button"
          onClick={handleToggle}
          disabled={toggling}
          aria-label={product.isActive ? 'Desativar produto' : 'Ativar produto'}
          className="flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <div className={`w-9 h-5 rounded-full relative transition-colors ${product.isActive ? 'bg-turquesa-dark' : 'bg-borda'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${product.isActive ? 'left-[18px]' : 'left-0.5'}`} />
          </div>
          <span className={`text-[11px] font-medium ${product.isActive ? 'text-turquesa-dark' : 'text-texto-terciario'}`}>
            {product.isActive ? 'Ativo' : 'Inativo'}
          </span>
        </button>

        <Link href={`/painel/produto/${product.id}`} className="flex items-center gap-1 border border-turquesa-dark text-turquesa-dark hover:bg-turquesa-light px-3 py-1.5 squircle-border text-xs font-bold transition-colors">
          <Edit className="w-3 h-3" />
          Editar
        </Link>
      </div>
    </div>
  );
}
