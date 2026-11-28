'use client';

import { useMemo, useState } from "react";
import { Library, RotateCw, Search } from "lucide-react";
import { Material, MaterialType } from "@/types/material";
import { BannerNoMaterials } from "@/components/account/account-banner";
import { PurchasedMaterialCard } from "@/components/account/purchased-material-card";

type FilterTab = "todos" | "alunos" | "professores";

const TABS: Array<{ id: FilterTab; label: string }> = [
  { id: "todos", label: "Todos os Materiais" },
  { id: "alunos", label: "Para Alunos" },
  { id: "professores", label: "Para Professores" },
];

interface MaterialSectionProps {
  materials: Material[];
  loading?: boolean;
}

export function SkeletonPurchasedCard() {
  return (
    <div className="bg-white border border-borda squircle-border overflow-hidden flex flex-col shadow-sm">
      <div className="aspect-[4/3] skeleton-shimmer" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3.5 w-32 rounded-full skeleton-shimmer" />
        <div className="h-5 w-4/5 rounded-full skeleton-shimmer" />
        <div className="h-3.5 w-full rounded-full skeleton-shimmer" />
        <div className="h-11 w-full rounded-2xl skeleton-shimmer mt-2" />
      </div>
    </div>
  );
}

export function MaterialSection({ materials, loading = false }: MaterialSectionProps) {
  const [tab, setTab] = useState<FilterTab>("todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let items = materials;
    if (tab === "alunos") {
      items = items.filter((m) => m.category === MaterialType.STUDENT);
    } else if (tab === "professores") {
      items = items.filter((m) => m.category === MaterialType.TEACHER);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter((m) => {
        const title = m.title?.toLowerCase() ?? "";
        const description = m.description?.toLowerCase() ?? "";
        return title.includes(q) || description.includes(q);
      });
    }
    return items;
  }, [materials, tab, query]);

  const handleResetFilters = () => {
    setTab("todos");
    setQuery("");
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Library className="w-6 h-6 text-turquesa-dark shrink-0" aria-hidden="true" />
          <h2 className="text-xl lg:text-2xl font-bold text-texto-principal">
            Meus <span className="text-turquesa-dark">Materiais</span>
          </h2>
        </div>

        {!loading && materials.length > 0 && (
          <p className="text-xs text-texto-terciario tabular-nums">
            {filtered.length} {filtered.length === 1 ? "material exibido" : "materiais exibidos"}
          </p>
        )}
      </div>

      {!loading && materials.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-pressed={active}
                  className={`px-5 py-2.5 shrink-0 squircle-border text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap ${
                    active
                      ? "bg-turquesa-deep text-white shadow-sm"
                      : "bg-white border border-borda text-texto-secundario hover:border-turquesa-dark/50 hover:text-turquesa-deep"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80 shrink-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-texto-terciario pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nos meus materiais..."
              aria-label="Buscar nos meus materiais"
              className="w-full pl-11 pr-4 py-2.5 squircle-border border border-borda-forte bg-white text-sm text-texto-principal placeholder:text-texto-terciario"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <span className="sr-only">Carregando materiais…</span>
          {[1, 2, 3].map((i) => (
            <SkeletonPurchasedCard key={i} />
          ))}
        </div>
      ) : materials.length === 0 ? (
        <BannerNoMaterials />
      ) : filtered.length === 0 ? (
        <div
          role="status"
          className="flex flex-col items-center justify-center gap-4 py-14 px-6 text-center border border-borda squircle-border bg-white shadow-sm"
        >
          <p className="text-base font-bold text-texto-principal">
            Nenhum material encontrado com esse filtro
          </p>
          <p className="text-sm text-texto-secundario max-w-sm">
            Ajuste a categoria selecionada ou tente buscar por outro termo.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 border-2 border-turquesa-dark text-turquesa-deep font-bold text-sm px-5 py-2.5 squircle-border transition-all duration-300 bg-white hover:bg-turquesa-deep hover:text-white cursor-pointer"
          >
            <RotateCw size={15} aria-hidden="true" />
            <span>Limpar filtros</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((material) => (
            <PurchasedMaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </section>
  );
}
