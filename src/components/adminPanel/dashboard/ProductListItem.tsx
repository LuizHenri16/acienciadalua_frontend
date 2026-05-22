import { Edit } from "lucide-react";
import Link from "next/link";
import { Material, getMaterialTypeLabel } from "@/types/material";
import { API_URL } from "@/lib/constants/constants";

interface ProductListItemProps {
  product: Material;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const label = getMaterialTypeLabel(product.category);

  const coverUrl = product.coverUrl
    ? `${API_URL}/uploads/${product.coverUrl}`
    : null;

  return (
    <div className="flex items-center justify-between p-4 mb-3 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#8b5cf6] overflow-hidden shrink-0">
          {coverUrl && (
            <img src={coverUrl} alt={product.title} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800 line-clamp-1">{product.title}</span>
          <span className="text-xs text-gray-500">{formattedPrice}</span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${product.isActive ? 'text-green-600 border-green-600 bg-[#d5f4e6]' : 'text-gray-400 border-gray-200 bg-gray-50'}`}>
          {product.isActive ? 'Ativo' : 'Inativo'}
        </div>
        <Link href={`/panel/produto/${product.id}`} className="flex items-center gap-1 bg-turquesa-dark hover:bg-opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
          <Edit className="w-3 h-3" />
          Editar
        </Link>
      </div>
    </div>
  );
}
