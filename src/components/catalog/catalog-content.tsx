"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PackageSearch, RotateCw, Search, SlidersHorizontal } from "lucide-react";
import { Material, MaterialType } from "@/types/material";
import { ProductCard } from "@/components/catalog/product-card";

type CategoryTab = "todos" | "alunos" | "professores";
type SortOption = "default" | "price_asc" | "price_desc" | "title_asc";

const TABS: { id: CategoryTab; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "alunos", label: "Para Alunos" },
  { id: "professores", label: "Para Professores" },
];

function getTabFromParam(param: string | null): CategoryTab {
  if (param === "alunos" || param === "professores") return param;
  return "todos";
}

interface CatalogContentProps {
  materials: Material[];
  error?: string | null;
}

export function CatalogContent({ materials, error }: CatalogContentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const tab = getTabFromParam(searchParams.get("categoria"));

  const handleTabChange = (next: CategoryTab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "todos") {
      params.delete("categoria");
    } else {
      params.set("categoria", next);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleClear = () => {
    setQuery("");
    setSortBy("default");
    handleTabChange("todos");
  };

  const counts = useMemo(() => {
    const students = materials.filter((m) => m.category === MaterialType.STUDENT).length;
    const teachers = materials.filter((m) => m.category === MaterialType.TEACHER).length;
    return { total: materials.length, students, teachers };
  }, [materials]);

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

    if (sortBy === "default") return items;

    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "title_asc":
          return a.title.localeCompare(b.title, "pt-BR");
        default:
          return 0;
      }
    });
  }, [materials, tab, query, sortBy]);

  const hasActiveFilters = tab !== "todos" || query.trim() !== "" || sortBy !== "default";

  return (
    <div className="flex flex-col">
      {/* Storefront Hero Banner */}
      <section className="w-full bg-hero">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-[calc(var(--header-h)+2.25rem)] pb-20 sm:pt-[calc(var(--header-h)+3rem)] sm:pb-24 lg:pt-[calc(var(--header-h)+3.5rem)] lg:pb-28">
          <div className="flex flex-col gap-5 max-w-3xl content-enter">
            <p className="text-xs sm:text-sm font-semibold text-turquesa-light">
              Catálogo completo · A Ciência da Lua
            </p>
            <h1 className="text-slate-100 font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-balance">
              Materiais de Química com{" "}
              <span className="text-turquesa font-caveat text-4xl sm:text-5xl lg:text-6xl font-bold">
                propósito
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Explore resumos visuais e exercícios comentados para estudantes, além de jogos, slides e planos de aula prontos para professores.
            </p>

            {!error && counts.total > 0 && (
              <div className="flex items-stretch gap-0 border-t border-white/[0.08] pt-5 mt-1">
                <div className="flex flex-col gap-0.5 pr-6">
                  <span className="text-2xl font-extrabold text-turquesa tabular-nums tracking-tight">
                    {counts.total}
                  </span>
                  <span className="text-xs text-white/70">
                    {counts.total === 1 ? "material no catálogo" : "materiais no catálogo"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 px-6 border-l border-white/[0.08]">
                  <span className="text-2xl font-extrabold text-white tabular-nums tracking-tight">
                    {counts.students}
                  </span>
                  <span className="text-xs text-white/70">para alunos</span>
                </div>
                <div className="flex flex-col gap-0.5 pl-6 border-l border-white/[0.08]">
                  <span className="text-2xl font-extrabold text-rosa-rose tabular-nums tracking-tight">
                    {counts.teachers}
                  </span>
                  <span className="text-xs text-white/70">para professores</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Catalog Controls & Grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-10 lg:px-14 mt-4 sm:mt-10 mb-10 sm:mb-14 flex flex-col gap-4 sm:gap-6">
        <div className="bg-white border-y sm:border border-borda squircle-border max-sm:rounded-none! p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {TABS.map((item) => {
              const active = tab === item.id;
              const tabCount =
                item.id === "todos"
                  ? counts.total
                  : item.id === "alunos"
                  ? counts.students
                  : counts.teachers;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 shrink-0 squircle-border text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap ${
                    active
                      ? "bg-turquesa-deep text-white shadow-sm"
                      : "bg-off-white/75 border border-borda text-texto-secundario hover:border-turquesa-dark/50 hover:text-turquesa-deep"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`text-xs tabular-nums ${
                      active ? "text-white/80" : "text-texto-terciario"
                    }`}
                  >
                    {tabCount}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1 sm:w-72">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-texto-terciario pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título ou tema..."
                aria-label="Buscar materiais"
                className="w-full pl-10 pr-4 py-2.5 squircle-border-sm border border-borda bg-off-white/60 focus:bg-white text-sm text-texto-principal placeholder:text-texto-terciario transition-colors"
              />
            </div>

            <div className="inline-flex items-center gap-2 shrink-0">
              <SlidersHorizontal
                className="w-4 h-4 text-texto-terciario hidden sm:block shrink-0"
                aria-hidden="true"
              />
              <select
                aria-label="Ordenar materiais"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto px-3.5 py-2.5 squircle-border-sm border border-borda bg-off-white/60 focus:bg-white text-xs sm:text-sm font-semibold text-texto-principal cursor-pointer"
              >
                <option value="default">Ordenação padrão</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="title_asc">Nome (A–Z)</option>
              </select>
            </div>
          </div>
        </div>

        {error ? (
          <div
            role="alert"
            className="flex flex-col items-center justify-center gap-3 py-14 sm:py-16 px-6 text-center bg-white border-y sm:border border-borda squircle-border max-sm:rounded-none! shadow-sm"
          >
            <p className="text-base font-bold text-texto-principal">{error}</p>
            <p className="text-sm text-texto-secundario max-w-md">
              Atualize a página em instantes para tentar carregar o catálogo novamente.
            </p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div className="flex items-center justify-between gap-3 px-4 sm:px-0">
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-xs sm:text-sm text-texto-secundario tabular-nums"
              >
                {filtered.length}{" "}
                {filtered.length === 1 ? "material encontrado" : "materiais encontrados"}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-turquesa-deep hover:underline cursor-pointer whitespace-nowrap"
                >
                  <RotateCw size={13} aria-hidden="true" />
                  <span>Limpar filtros</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((material) => (
                <ProductCard key={material.id} material={material} fullWidthMobile />
              ))}
            </div>
          </>
        ) : (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-4 py-14 sm:py-16 px-6 text-center border-y sm:border border-borda squircle-border max-sm:rounded-none! bg-white shadow-sm"
          >
            <div className="w-14 h-14 squircle-border-sm bg-turquesa-dark/10 flex items-center justify-center">
              <PackageSearch className="w-6 h-6 text-turquesa-dark" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-texto-principal">
                Nenhum material encontrado
              </p>
              <p className="text-sm text-texto-secundario max-w-sm">
                {query
                  ? "Não achamos resultados para essa busca. Tente outra palavra-chave."
                  : "Estamos preparando novos materiais para você. Volte em breve!"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="group inline-flex items-center gap-2 border-2 border-turquesa-dark text-turquesa-deep font-bold text-sm px-5 py-2.5 squircle-border transition-all duration-300 bg-white hover:bg-turquesa-deep hover:text-white cursor-pointer"
            >
              <RotateCw size={16} aria-hidden="true" />
              <span>Limpar filtros</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
