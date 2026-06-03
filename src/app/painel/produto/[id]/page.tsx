import { notFound } from "next/navigation";
import { getProductById } from "@/api/product";
import { ProductHeader } from "@/components/adminPanel/product/ProductHeader";
import { ProductForm } from "@/components/adminPanel/product/ProductForm";

interface EditProdutoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProdutoPage({ params }: EditProdutoPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="min-h-screen font-sora flex flex-col" style={{ background: 'linear-gradient(135deg, #f9eef2 0%, #f0eefc 100%)' }}>
      <ProductHeader isEditing />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-6 max-w-300 w-full mx-auto">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
