'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductHeader } from "@/components/adminPanel/product/ProductHeader";
import { ProductForm } from "@/components/adminPanel/product/ProductForm";
import { LoadingPage } from "@/components/ui/loading/loadingPage";

export default function ProdutoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.match(/(?:^|;\s*)admin_token=([^;]*)/);

    if (!token) {
      router.push("/painel/signin");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  if (!isAuthenticated) {
    return <LoadingPage message="Verificando sessão" />;
  }

  return (
    <div className="min-h-screen font-sora flex flex-col bg-linear-to-r from-marinho/10 to-[#fafafa]" >
      <ProductHeader />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-16 max-w-[75rem] w-full mx-auto">
        <ProductForm />
      </div>
    </div>
  );
}
