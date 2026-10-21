import { AdminProductHeader } from "@/components/layout/admin-product-header";
import { ProductForm } from "@/components/admin/product/product-form";

export default function ProdutoPage() {
  return (
    <div className="min-h-dvh font-sora flex flex-col bg-linear-to-r from-marinho/10 to-[#fafafa]" >
      <AdminProductHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-16 max-w-[75rem] w-full mx-auto">
        <ProductForm />
      </main>
    </div>
  );
}
