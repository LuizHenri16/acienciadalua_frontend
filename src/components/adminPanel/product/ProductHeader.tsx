import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProductHeader() {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
      <Link href="/panel/" className="flex items-center text-texto-principal font-medium hover:text-gray-600 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Vitrine
      </Link>
      <h1 className="text-gray-800 font-medium">Novo produto</h1>
    </div>
  );
}
