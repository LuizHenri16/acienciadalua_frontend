import { ProductHeader } from "@/components/adminPanel/product/ProductHeader";
import { ProductForm } from "@/components/adminPanel/product/ProductForm";

export default function ProdutoPage() {
  return (
    <div className="min-h-screen sm:px-6 lg:px-8 font-sora flex justify-center">
      <div className="w-full max-w-[480px]">
        <div className="bg-white rounded-md shadow-lg p-6 pb-8">
          <ProductHeader />
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
