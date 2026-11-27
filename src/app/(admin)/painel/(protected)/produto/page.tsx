import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product/product-form";
import { adminGetProductById } from "@/lib/api/admin-products";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";

interface ProdutoPageProps {
  searchParams: Promise<{ duplicate?: string }>;
}

export default async function ProdutoPage({ searchParams }: ProdutoPageProps) {
  const { duplicate } = await searchParams;
  let duplicateFrom = undefined;

  if (duplicate) {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value ?? "";
    if (token) {
      duplicateFrom = await adminGetProductById(duplicate, token).catch(() => undefined);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href="/painel/produtos"
          aria-label="Voltar para produtos"
          className="flex items-center justify-center w-10 h-10 rounded-full painel-control hover:bg-[#F5F4F0]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-texto-principal">
            {duplicateFrom ? "Duplicar produto" : "Novo produto"}
          </h1>
          <p className="text-xs text-texto-secundario mt-0.5">
            {duplicateFrom
              ? "Revise os dados e envie os arquivos para criar uma nova versão."
              : "Cadastre um material didático digital para publicar na vitrine."}
          </p>
        </div>
      </div>

      <ProductForm duplicateFrom={duplicateFrom} />
    </div>
  );
}
