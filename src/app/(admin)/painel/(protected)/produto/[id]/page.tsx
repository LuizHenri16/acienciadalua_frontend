import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { adminGetProductById } from "@/lib/api/admin-products";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { ADMIN_SIGNIN_ROUTE } from "@/lib/auth/routes";
import { ProductForm } from "@/components/admin/product/product-form";

interface EditProdutoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProdutoPage({ params }: EditProdutoPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value ?? "";

  if (!token) {
    redirect(ADMIN_SIGNIN_ROUTE);
  }

  const product = await adminGetProductById(id, token).catch(() => null);

  if (!product) notFound();

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
          <h1 className="text-xl font-bold text-texto-principal">Editar produto</h1>
          <p className="text-xs text-texto-secundario mt-0.5">
            Atualize informações, preço, arquivos ou visibilidade na vitrine.
          </p>
        </div>
      </div>

      <ProductForm product={product} />
    </div>
  );
}
