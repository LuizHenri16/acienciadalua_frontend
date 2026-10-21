import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminGetProductById } from "@/lib/api/admin-products";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { AdminProductHeader } from "@/components/layout/admin-product-header";
import { ProductForm } from "@/components/admin/product/product-form";

interface EditProdutoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProdutoPage({ params }: EditProdutoPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value ?? '';

  if (!token) redirect('/painel/signin');

  const product = await adminGetProductById(id, token);

  if (!product) notFound();

  return (
    <div className="min-h-dvh font-sora flex flex-col" style={{ background: 'linear-gradient(135deg, #f9eef2 0%, #f0eefc 100%)' }}>
      <AdminProductHeader isEditing />
      <main id="main-content" tabIndex={-1} className="flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-6 max-w-[75rem] w-full mx-auto">
        <ProductForm product={product} />
      </main>
    </div>
  );
}
