import { ProductHeader } from "@/components/adminPanel/product/ProductHeader";
import { ProductForm } from "@/components/adminPanel/product/ProductForm";

export default function ProdutoPage() {
  return (
    <div className="min-h-screen font-sora flex flex-col bg-linear-to-r from-marinho/10 to-[#fafafa]" >
      <ProductHeader />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-16 max-w-300 w-full mx-auto">
        <ProductForm />
      </div>
    </div>
  );
}
