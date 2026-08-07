"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Material, MaterialType } from "@/types/material";
import { ProductCard } from "@/components/ui/card/card";
import { PackageSearch, RotateCcw, Search } from "lucide-react";

type CategoryTab = "todos" | "alunos" | "professores";

const TABS: { id: CategoryTab; label: string }[] = [
    { id: "todos", label: "Todos os Produtos" },
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
        handleTabChange("todos");
    };

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

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-texto-principal">
                    Catálogo de <span className="text-turquesa-dark">Materiais</span>
                </h1>
                <p className="text-sm text-texto-secundario max-w-xl leading-relaxed">
                    Explore todos os materiais de Ciências criados pela Profa. Lua. Filtre por
                    público-alvo ou busque pelo título que você precisa.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                    {TABS.map((item) => {
                        const active = tab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleTabChange(item.id)}
                                aria-pressed={active}
                                className={`px-5 py-2.5 squircle-border text-sm font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                                    active
                                        ? "bg-turquesa-dark text-white shadow-sm"
                                        : "bg-white border border-borda text-texto-secundario hover:border-turquesa-dark/50 hover:text-turquesa-dark"
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-texto-terciario pointer-events-none" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por título ou palavra-chave..."
                        aria-label="Buscar materiais"
                        className="w-full pl-11 pr-4 py-3 squircle-border border border-borda bg-white text-sm text-texto-principal placeholder:text-texto-terciario/60 focus:outline-none focus:ring-2 focus:ring-turquesa-dark/40 transition-shadow"
                    />
                </div>
            </div>

            {error ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <p className="text-sm text-texto-secundario">{error}</p>
                </div>
            ) : filtered.length > 0 ? (
                <>
                    <p className="text-xs text-texto-terciario">
                        {filtered.length} {filtered.length === 1 ? "material encontrado" : "materiais encontrados"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((material) => (
                            <ProductCard key={material.id} material={material} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <div className="w-14 h-14 rounded-full bg-turquesa-dark/10 flex items-center justify-center">
                        <PackageSearch className="w-6 h-6 text-turquesa-dark" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-base font-bold text-texto-principal">Nenhum material encontrado</p>
                        <p className="text-sm text-texto-secundario max-w-sm">
                            {query
                                ? "Não achamos resultados para essa busca. Tente outra palavra-chave."
                                : "Ainda não há materiais nesta categoria. Volte em breve!"}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex items-center gap-2 border-2 border-turquesa-dark text-turquesa-dark font-bold text-sm px-5 py-2.5 squircle-border transition-all duration-300 hover:bg-turquesa-dark hover:text-white cursor-pointer"
                    >
                        <RotateCcw size={14} />
                        Limpar filtros
                    </button>
                </div>
            )}
        </div>
    );
}
