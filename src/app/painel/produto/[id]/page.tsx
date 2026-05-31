import { notFound } from "next/navigation";
import { adminGetProductById } from "@/api/product";
import { ProductHeader } from "@/components/adminPanel/product/ProductHeader";
import { ProductForm } from "@/components/adminPanel/product/ProductForm";

interface EditProdutoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProdutoPage({ params }: EditProdutoPageProps) {
  const { id } = await params;
  const product = await adminGetProductById(id);

  if (!product) notFound();

  return (
    <div className="min-h-screen sm:px-6 lg:px-8 font-sora flex justify-center">
      <div className="w-full max-w-[480px]">
        <div className="bg-white rounded-md shadow-lg p-6 pb-8">
          <ProductHeader isEditing />
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
