import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductHeaderProps {
  isEditing?: boolean;
}

export function ProductHeader({ isEditing = false }: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
      <Link href="/panel/" className="flex items-center text-texto-principal font-medium hover:text-gray-600 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar
      </Link>
      <h1 className="text-gray-800 font-medium">{isEditing ? 'Editar produto' : 'Novo produto'}</h1>
    </div>
  );
}
