import Link from "next/link";
import { ProductListItem } from "./ProductListItem";
import { Material } from "@/types/material";
import { Button } from "@/components/ui/button/button";
import { Plus } from "lucide-react";

interface ProductListProps {
  products: Material[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-gray-600">Produtos cadastrados</h2>
        <Link
          href="/panel/produto"
          className="bg-turquesa-dark hover:opacity-90 text-white px-3 py-1.5 squircle-border text-xs font-bold transition-colors flex items-center gap-1"
        >
          <Plus size={16} /> Novo produto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-turquesa-dark squircle-border bg-white mt-4">
          <p className="text-sm font-bold text-texto-principal mb-1">Nenhum material ainda</p>
          <p className="text-xs text-gray-500 mb-4 text-center">
            Cadastre seu primeiro material e ele<br />
            aparecerá na vitrine.
          </p>
          <Link
            href="/panel/produto"
            className="bg-turquesa-dark hover:opacity-90 text-white px-6 py-2 rounded-lg text-xs font-bold transition-colors"
          >
            Cadastrar material
          </Link>
        </div>
      ) : (
        <div className="flex flex-col">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
