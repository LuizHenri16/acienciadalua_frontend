'use client';

import { useState } from "react";
import { DashboardHeader } from "@/components/adminPanel/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/adminPanel/dashboard/DashboardStats";
import { ProductList } from "@/components/adminPanel/dashboard/ProductList";
import { Material, MaterialType } from "@/types/material";

// Mock Data
const MOCK_PRODUCTS: Material[] = [
  {
    id: "1",
    title: "Nome do material 1",
    description: "Descrição do material 1",
    price: 60.0,
    category: MaterialType.STUDENT,
  },
  {
    id: "2",
    title: "Nome do material 2",
    description: "Descrição do material 2",
    price: 90.0,
    category: MaterialType.TEACHER,
  },
  {
    id: "3",
    title: "Nome do material 3",
    description: "Descrição do material 3",
    price: 50.0,
    category: MaterialType.STUDENT,
  }
];

// O 3º item vamos simular como inativo para vermos o badge
(MOCK_PRODUCTS[2] as any).isActive = false;

export default function Panel() {
  // Estado para simular se temos ou não produtos
  const [showEmptyState, setShowEmptyState] = useState(false);

  const products = showEmptyState ? [] : MOCK_PRODUCTS;

  // Calculando estatísticas baseadas no mock
  const total = products.length;
  const ativos = products.filter(p => (p as any).isActive !== false).length;
  const inativos = total - ativos;

  return (
    <div className="min-h-screen w-full bg-[#fafafa]">
      <DashboardHeader />
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col">
        <DashboardStats total={total} ativos={ativos} inativos={inativos} />
        <ProductList products={products} />
      </div>
    </div>
  );
}