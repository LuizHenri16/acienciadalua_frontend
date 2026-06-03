import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductHeaderProps {
  isEditing?: boolean;
}

export function ProductHeader({ isEditing = false }: ProductHeaderProps) {
  return (
    <div className="w-full bg-white border-b border-borda px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
      <Link
        href="/painel/"
        className="flex items-center justify-center w-8 h-8 squircle-border border border-borda-med text-texto-principal hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <h1 className="text-sm font-bold text-texto-principal">
        {isEditing ? 'Editar produto' : 'Novo produto'}
      </h1>
    </div>
  );
}
