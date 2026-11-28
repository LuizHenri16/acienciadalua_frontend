"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  BookOpen,
  Edit3,
  Copy,
  Eye,
  Trash2,
  X,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { MaterialType, type Material } from "@/types/material";
import { getAdminToken } from "@/lib/auth/cookies";
import { uploadUrl } from "@/lib/api/client";
import { adminDeleteProduct, adminToggleProduct } from "@/lib/api/admin-products";
import { getAdminProductsWithFallback } from "@/lib/api/admin-panel";
import { formatCurrency } from "@/lib/format/currency";
import { getMaterialFormat, getMaterialTypeLabel } from "@/lib/format/material";
import { ConfirmDialog } from "@/components/admin/ui/confirm-dialog";
import { useAdminToast } from "@/components/admin/ui/toast";

type StatusFilter = "all" | "active" | "inactive";
type CategoryFilter = "all" | MaterialType.STUDENT | MaterialType.TEACHER;
type SortOption =
  | "recent"
  | "best_selling"
  | "price_asc"
  | "price_desc"
  | "title_asc";

export function ProductsManager() {
  const router = useRouter();
  const { showToast } = useAdminToast();

  const [products, setProducts] = useState<Material[]>([]);
  const [salesByProduct, setSalesByProduct] = useState<Record<string, number>>({});
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Material | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Material | null>(null);

  const reloadProducts = useCallback(() => {
    setLoading(true);
    setError(false);
    getAdminProductsWithFallback(getAdminToken())
      .then((res) => {
        setProducts(res.data.products);
        setSalesByProduct(res.data.salesByProduct);
        setIsDemo(res.isDemo);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let active = true;
    getAdminProductsWithFallback(getAdminToken())
      .then((res) => {
        if (!active) return;
        setProducts(res.data.products);
        setSalesByProduct(res.data.salesByProduct);
        setIsDemo(res.isDemo);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleToggle(product: Material) {
    if (togglingId) return;
    setTogglingId(product.id);
    const nextState = !product.isActive;

    try {
      if (!isDemo) {
        await adminToggleProduct(product.id, getAdminToken());
      }
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isActive: nextState } : p))
      );
      showToast({
        title: nextState ? "Produto publicado na vitrine" : "Produto desativado",
        description: product.title,
      });
    } catch {
      showToast({
        title: "Não foi possível alterar o status",
        description: "Tente novamente em instantes.",
        variant: "error",
      });
    } finally {
      setTogglingId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      if (!isDemo) {
        await adminDeleteProduct(productToDelete.id, getAdminToken());
      }
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      showToast({
        title: "Produto excluído",
        description: `${productToDelete.title} foi removido do catálogo.`,
      });
      setProductToDelete(null);
    } catch {
      showToast({
        title: "Erro ao excluir produto",
        description: "Verifique sua conexão e tente novamente.",
        variant: "error",
      });
    } finally {
      setDeleting(false);
    }
  }

  function handleDuplicate(product: Material) {
    if (isDemo) {
      const cloned: Material = {
        ...product,
        id: `demo-copy-${Date.now()}`,
        title: `${product.title} (Cópia)`,
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts((prev) => [cloned, ...prev]);
      showToast({
        title: "Produto duplicado como rascunho",
        description: cloned.title,
      });
      return;
    }

    router.push(`/painel/produto?duplicate=${encodeURIComponent(product.id)}`);
  }

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const list = products.filter((p) => {
      if (statusFilter === "active" && !p.isActive) return false;
      if (statusFilter === "inactive" && p.isActive) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (query) {
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchDesc = (p.description ?? "").toLowerCase().includes(query);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "best_selling":
          return (salesByProduct[b.id] ?? 0) - (salesByProduct[a.id] ?? 0);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "title_asc":
          return a.title.localeCompare(b.title, "pt-BR");
        case "recent":
        default: {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        }
      }
    });
  }, [products, search, statusFilter, categoryFilter, sortBy, salesByProduct]);

  const activeCount = products.filter((p) => p.isActive).length;
  const inactiveCount = products.length - activeCount;
  const hasFilters =
    search.trim() !== "" || statusFilter !== "all" || categoryFilter !== "all";

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortBy("recent");
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-texto-principal tracking-tight">
              Produtos
            </h1>
            <p className="text-xs sm:text-sm text-texto-secundario mt-1">
              Gerencie os materiais digitais publicados na sua vitrine.
            </p>
          </div>
        </div>

        <Link
          href="/painel/produto"
          className="inline-flex items-center justify-center gap-1.5 px-5 min-h-10 sm:min-h-11 rounded-full painel-btn-primary text-xs font-bold whitespace-nowrap w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Novo produto</span>
        </Link>
      </div>

      {/* Quick summary strip */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-3xl painel-card-soft p-3.5 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <p className="text-[11px] sm:text-xs text-texto-secundario truncate">Total</p>
            <p className="text-lg sm:text-2xl font-bold text-marinho tabular-nums mt-0.5">
              {products.length}
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-medium text-texto-secundario">
            materiais digitais
          </span>
        </div>

        <div className="rounded-3xl painel-card-navy p-3.5 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <p className="text-[11px] sm:text-xs text-white/75 truncate">Ativos</p>
            <p className="text-lg sm:text-2xl font-bold text-white tabular-nums mt-0.5">
              {activeCount}
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-turquesa-light">
            visíveis na loja
          </span>
        </div>

        <div className="rounded-3xl painel-card-soft p-3.5 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <p className="text-[11px] sm:text-xs text-texto-secundario truncate">Inativos</p>
            <p className="text-lg sm:text-2xl font-bold text-marinho tabular-nums mt-0.5">
              {inactiveCount}
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-medium text-texto-secundario">
            ocultos da vitrine
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="rounded-3xl painel-card p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 min-w-0">
          <Search
            className="w-4 h-4 text-texto-terciario absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar material por título ou assunto..."
            aria-label="Pesquisar produto"
            className="w-full pl-10 pr-4 min-h-10 rounded-full painel-control text-sm placeholder:text-texto-terciario"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5">
          {/* Status segmented filter */}
          <div
            role="group"
            aria-label="Filtrar por status"
            className="grid grid-cols-3 sm:inline-flex items-center gap-1 p-1 rounded-full painel-well w-full sm:w-auto"
          >
            {(
              [
                { value: "all", label: "Todos" },
                { value: "active", label: "Ativos" },
                { value: "inactive", label: "Inativos" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                  statusFilter === opt.value
                    ? "bg-white text-texto-principal shadow-sm"
                    : "text-texto-secundario hover:text-texto-principal"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            {/* Category filter */}
            <select
              aria-label="Filtrar por categoria"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              className="w-full sm:w-auto min-h-10 px-3.5 rounded-full painel-control text-xs font-semibold cursor-pointer"
            >
              <option value="all">Todas categorias</option>
              <option value={MaterialType.STUDENT}>Material de estudo</option>
              <option value={MaterialType.TEACHER}>Plano de aula</option>
            </select>

            {/* Sort */}
            <div className="inline-flex items-center gap-1.5 w-full sm:w-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-texto-terciario hidden sm:block shrink-0" />
              <select
                aria-label="Ordenar produtos"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto min-h-10 px-3.5 rounded-full painel-control text-xs font-semibold cursor-pointer"
              >
                <option value="recent">Mais recentes</option>
                <option value="best_selling">Mais vendidos</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="title_asc">Nome (A–Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product List / Table */}
      {loading ? (
        <div role="status" aria-live="polite" aria-busy="true">
          <span className="sr-only">Carregando catálogo de produtos…</span>

          {/* Mobile Card Skeletons */}
          <div className="md:hidden flex flex-col gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-3xl painel-card p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 rounded-2xl skeleton-shimmer shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="h-4 w-3/4 rounded-full skeleton-shimmer" />
                      <div className="h-4 w-16 rounded-full skeleton-shimmer shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-28 rounded-full skeleton-shimmer" />
                      <div className="h-3.5 w-14 rounded-full skeleton-shimmer" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-marinho/[0.07]">
                  <div className="h-5 w-20 rounded-full skeleton-shimmer" />
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((a) => (
                      <div key={a} className="w-8 h-8 rounded-xl skeleton-shimmer" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Skeleton */}
          <div className="hidden md:block rounded-3xl painel-card overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F5F4F0]/75 border-b border-marinho/[0.07] grid grid-cols-[2.2fr_1fr_0.7fr_0.6fr_0.8fr_1fr] gap-4">
              {[1, 2, 3, 4, 5, 6].map((h) => (
                <div key={h} className="h-3 w-16 rounded-full skeleton-shimmer" />
              ))}
            </div>
            <div className="divide-y divide-marinho/[0.06]">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="px-5 py-3.5 grid grid-cols-[2.2fr_1fr_0.7fr_0.6fr_0.8fr_1fr] items-center gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-14 rounded-2xl skeleton-shimmer shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-4 w-4/5 rounded-full skeleton-shimmer" />
                      <div className="h-3 w-3/5 rounded-full skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="h-6 w-28 rounded-full skeleton-shimmer" />
                  <div className="h-4 w-16 rounded-full skeleton-shimmer ml-auto" />
                  <div className="h-4 w-10 rounded-full skeleton-shimmer ml-auto" />
                  <div className="h-5 w-20 rounded-full skeleton-shimmer" />
                  <div className="flex items-center justify-end gap-1.5">
                    {[1, 2, 3, 4].map((a) => (
                      <div key={a} className="w-8 h-8 rounded-xl skeleton-shimmer" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-3xl painel-card p-8 text-center flex flex-col items-center gap-3"
        >
          <p className="text-sm font-bold text-texto-principal">
            Não foi possível carregar o catálogo.
          </p>
          <button
            type="button"
            onClick={reloadProducts}
            className="px-4 py-2 rounded-full painel-btn-primary text-xs font-bold cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl painel-card p-8 sm:p-10 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#EAEBF2] text-marinho flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-base font-bold text-texto-principal">
            {hasFilters
              ? "Nenhum material encontrado com esses filtros"
              : "Nenhum material cadastrado ainda"}
          </p>
          <p className="text-xs text-texto-secundario max-w-sm leading-relaxed">
            {hasFilters
              ? "Tente ajustar sua busca ou limpar os filtros selecionados."
              : "Cadastre seu primeiro material didático em PDF ou ZIP para disponibilizá-lo na vitrine."}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-1 px-4 py-2 rounded-full bg-[#EAEBF2] text-xs font-bold text-marinho hover:bg-marinho hover:text-white transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          ) : (
            <Link
              href="/painel/produto"
              className="mt-1 px-5 py-2.5 rounded-full painel-btn-primary text-xs font-bold"
            >
              Cadastrar primeiro material
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Mobile Full-Width Cards */}
          <div className="md:hidden flex flex-col gap-2.5">
            {filteredProducts.map((product) => {
              const coverUrl = uploadUrl(product.coverUrl);
              const isTeacher = product.category === MaterialType.TEACHER;
              const salesCount = salesByProduct[product.id];

              return (
                <div
                  key={product.id}
                  className={`rounded-3xl painel-card p-4 flex flex-col gap-3 ${
                    !product.isActive ? "opacity-80" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-16 rounded-2xl bg-linear-to-br from-[#E7F6F4] to-[#FDF0F3] overflow-hidden shrink-0 relative flex items-center justify-center">
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={product.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <BookOpen className="w-4 h-4 text-turquesa-deep/70" aria-hidden="true" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-texto-principal leading-snug line-clamp-2">
                          {product.title}
                        </p>
                        <span className="text-sm font-bold text-turquesa-deep tabular-nums shrink-0">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isTeacher
                              ? "bg-[#FDF0F3] text-rosa-deep"
                              : "bg-[#E7F6F4] text-turquesa-deep"
                          }`}
                        >
                          {getMaterialTypeLabel(product.category)}
                        </span>
                        <span className="text-[11px] text-texto-terciario tabular-nums">
                          {typeof salesCount === "number" ? `${salesCount} vendas` : getMaterialFormat(product)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-marinho/[0.07]">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={!!product.isActive}
                      disabled={togglingId === product.id}
                      onClick={() => handleToggle(product)}
                      aria-label={
                        product.isActive
                          ? `Desativar ${product.title}`
                          : `Ativar ${product.title}`
                      }
                      className="inline-flex items-center gap-2 min-h-9 cursor-pointer disabled:opacity-50"
                    >
                      <div
                        className={`w-9 h-5 rounded-full relative transition-colors ${
                          product.isActive ? "bg-turquesa-deep" : "bg-borda-med"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                            product.isActive ? "left-[18px]" : "left-0.5"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          product.isActive ? "text-turquesa-deep" : "text-texto-terciario"
                        }`}
                      >
                        {product.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </button>

                    <div className="inline-flex items-center gap-1">
                      {!isDemo ? (
                        <Link
                          href={`/painel/produto/${product.id}`}
                          aria-label={`Editar ${product.title}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-turquesa-deep hover:bg-[#E7F6F4] transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPreviewProduct(product)}
                          aria-label={`Editar ${product.title}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-turquesa-deep hover:bg-[#E7F6F4] transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDuplicate(product)}
                        aria-label={`Duplicar ${product.title}`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-marinho hover:bg-off-white transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewProduct(product)}
                        aria-label={`Visualizar ${product.title}`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-marinho hover:bg-off-white transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductToDelete(product)}
                        aria-label={`Excluir ${product.title}`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-terciario hover:text-coral-dark hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-3xl painel-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="border-b border-marinho/[0.07] bg-[#F5F4F0]/75 text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                    <th className="py-3.5 pl-5 pr-3">Material</th>
                    <th className="py-3.5 px-3">Categoria</th>
                    <th className="py-3.5 px-3 text-right">Preço</th>
                    <th className="py-3.5 px-3 text-right">Vendas</th>
                    <th className="py-3.5 px-3">Vitrine</th>
                    <th className="py-3.5 pl-3 pr-5 text-right">Ações</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-marinho/[0.06]">
                {filteredProducts.map((product) => {
                  const coverUrl = uploadUrl(product.coverUrl);
                  const isTeacher = product.category === MaterialType.TEACHER;
                  const salesCount = salesByProduct[product.id];

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#F5F4F0]/55 transition-colors ${
                        !product.isActive ? "opacity-75" : ""
                      }`}
                    >
                      <td className="py-3.5 pl-5 pr-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-14 rounded-2xl bg-linear-to-br from-[#E7F6F4] to-[#FDF0F3] overflow-hidden shrink-0 relative flex items-center justify-center">
                            {coverUrl ? (
                              <Image
                                src={coverUrl}
                                alt={product.title}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            ) : (
                              <BookOpen
                                className="w-4 h-4 text-turquesa-deep/70"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <p className="text-sm font-bold text-texto-principal truncate">
                              {product.title}
                            </p>
                            <p className="text-xs text-texto-terciario truncate mt-0.5">
                              {getMaterialFormat(product)}
                              {product.description ? ` · ${product.description}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isTeacher
                              ? "bg-[#FDF0F3] text-rosa-deep"
                              : "bg-[#E7F6F4] text-turquesa-deep"
                          }`}
                        >
                          {getMaterialTypeLabel(product.category)}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <span className="text-sm font-bold text-texto-principal tabular-nums">
                          {formatCurrency(product.price)}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <span className="text-sm font-semibold text-texto-secundario tabular-nums">
                          {typeof salesCount === "number" ? salesCount : "—"}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={!!product.isActive}
                          disabled={togglingId === product.id}
                          onClick={() => handleToggle(product)}
                          aria-label={
                            product.isActive
                              ? `Desativar ${product.title}`
                              : `Ativar ${product.title}`
                          }
                          className="inline-flex items-center gap-2 min-h-9 cursor-pointer disabled:opacity-50"
                        >
                          <div
                            className={`w-9 h-5 rounded-full relative transition-colors ${
                              product.isActive ? "bg-turquesa-deep" : "bg-borda-med"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                                product.isActive ? "left-[18px]" : "left-0.5"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-xs font-semibold ${
                              product.isActive
                                ? "text-turquesa-deep"
                                : "text-texto-terciario"
                            }`}
                          >
                            {product.isActive ? "Ativo" : "Inativo"}
                          </span>
                        </button>
                      </td>

                      <td className="py-3.5 pl-3 pr-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1">
                          {!isDemo ? (
                            <Link
                              href={`/painel/produto/${product.id}`}
                              title="Editar produto"
                              aria-label={`Editar ${product.title}`}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-turquesa-deep hover:bg-[#E7F6F4] transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPreviewProduct(product)}
                              title="Editar produto"
                              aria-label={`Editar ${product.title}`}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-turquesa-deep hover:bg-[#E7F6F4] transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDuplicate(product)}
                            title="Duplicar produto"
                            aria-label={`Duplicar ${product.title}`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-marinho hover:bg-off-white transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setPreviewProduct(product)}
                            title="Visualizar detalhes"
                            aria-label={`Visualizar ${product.title}`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-secundario hover:text-marinho hover:bg-off-white transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setProductToDelete(product)}
                            title="Excluir produto"
                            aria-label={`Excluir ${product.title}`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-texto-terciario hover:text-coral-dark hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {/* Delete confirmation modal */}
      <ConfirmDialog
        open={!!productToDelete}
        title="Excluir material"
        description={
          productToDelete
            ? `Tem certeza que deseja excluir “${productToDelete.title}”? Esta ação removerá o produto do catálogo administrativo.`
            : ""
        }
        confirmLabel="Excluir produto"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!deleting) setProductToDelete(null);
        }}
      />

      {/* Quick preview modal */}
      {previewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-marinho/35 backdrop-blur-[3px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-product-title"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white shadow-[0_24px_60px_-18px_rgba(30,27,75,0.28)] overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-marinho/[0.06]">
              <h2
                id="preview-product-title"
                className="text-sm font-bold text-texto-principal"
              >
                Pré-visualização do material
              </h2>
              <button
                type="button"
                onClick={() => setPreviewProduct(null)}
                aria-label="Fechar pré-visualização"
                className="p-1.5 rounded-full text-texto-terciario hover:text-texto-principal hover:bg-[#F5F4F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="w-28 h-36 rounded-2xl bg-linear-to-br from-[#E7F6F4] to-[#FDF0F3] overflow-hidden shrink-0 relative flex items-center justify-center mx-auto sm:mx-0">
                {uploadUrl(previewProduct.coverUrl) ? (
                  <Image
                    src={uploadUrl(previewProduct.coverUrl)!}
                    alt={previewProduct.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <BookOpen className="w-8 h-8 text-turquesa-deep/60" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-turquesa-deep">
                  {getMaterialTypeLabel(previewProduct.category)} ·{" "}
                  {getMaterialFormat(previewProduct)}
                </p>
                <h3 className="text-lg font-bold text-texto-principal mt-1">
                  {previewProduct.title}
                </h3>
                <p className="text-xs text-texto-secundario leading-relaxed mt-2">
                  {previewProduct.description || "Sem descrição cadastrada."}
                </p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-marinho/[0.07]">
                  <span className="text-lg font-bold text-turquesa-deep tabular-nums">
                    {formatCurrency(previewProduct.price)}
                  </span>
                  <span className="text-xs font-semibold text-texto-secundario">
                    {previewProduct.isActive ? "Ativo na vitrine" : "Inativo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#F5F4F0]/75 border-t border-marinho/[0.07] flex flex-wrap items-center justify-between gap-3">
              {!isDemo ? (
                <Link
                  href={`/produto/${previewProduct.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-turquesa-deep hover:underline"
                >
                  <span>Abrir página pública</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="text-xs text-texto-terciario">
                  Item demonstrativo de prévia
                </span>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {!isDemo && (
                  <Link
                    href={`/painel/produto/${previewProduct.id}`}
                    className="px-4 py-2 rounded-full painel-btn-primary text-xs font-bold"
                  >
                    Editar material
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewProduct(null)}
                  className="px-4 py-2 rounded-full painel-control text-xs font-bold hover:bg-[#F5F4F0] cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
