"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  X,
  Mail,
  Calendar,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import type { AdminCustomer } from "@/types/admin";
import { getAdminToken } from "@/lib/auth/cookies";
import { getAdminCustomersData } from "@/lib/api/admin-panel";
import { formatCurrency } from "@/lib/format/currency";
import { formatFullDateTime, formatShortDate, getInitials } from "@/lib/format/date";
import { getMaterialTypeLabel } from "@/lib/format/material";
import {
  getPaymentMethodLabel,
  SaleStatusIndicator,
} from "@/components/admin/ui/status-badge";

type CustomerSort = "recent" | "spent_desc" | "purchases_desc" | "name_asc";

export function CustomersManager() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<CustomerSort>("recent");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  useEffect(() => {
    let active = true;
    getAdminCustomersData(getAdminToken())
      .then((res) => {
        if (!active) return;
        setCustomers(res.data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedCustomer) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedCustomer(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCustomer]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = customers.filter((c) => {
      if (!query) return true;
      return (
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
      );
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "spent_desc":
          return b.totalSpent - a.totalSpent;
        case "purchases_desc":
          return b.purchasesCount - a.purchasesCount;
        case "name_asc":
          return a.name.localeCompare(b.name, "pt-BR");
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [customers, search, sortBy]);

  const summary = useMemo(() => {
    const buyers = customers.filter((c) => c.totalSpent > 0);
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const recurring = customers.filter((c) => c.purchasesCount > 1).length;

    return {
      total: customers.length,
      buyersCount: buyers.length,
      recurring,
      totalRevenue,
    };
  }, [customers]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-texto-principal tracking-tight">
            Clientes
          </h1>
          <p className="text-xs sm:text-sm text-texto-secundario mt-1">
            Consulte contas cadastradas e o histórico individual de materiais adquiridos.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
            Clientes listados
          </p>
          <p className="text-xl sm:text-2xl font-bold text-marinho tabular-nums mt-1 sm:mt-1.5">
            {summary.total}
          </p>
        </div>

        <div className="rounded-3xl painel-card-navy p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs font-medium text-white/75">
            Compradores ativos
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-1 sm:mt-1.5">
            {summary.buyersCount}
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-3xl painel-card p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
            Total gasto acumulado
          </p>
          <p className="text-xl sm:text-2xl font-bold text-marinho tabular-nums mt-1 sm:mt-1.5">
            {formatCurrency(summary.totalRevenue)}
          </p>
        </div>
      </div>

      {/* Search & Sort Toolbar */}
      <div className="rounded-3xl painel-card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 min-w-0">
          <Search
            className="w-4 h-4 text-texto-terciario absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar cliente por nome ou e-mail..."
            aria-label="Pesquisar clientes"
            className="w-full pl-10 pr-4 min-h-10 rounded-full painel-control text-sm placeholder:text-texto-terciario"
          />
        </div>

        <div className="inline-flex items-center gap-2 w-full sm:w-auto shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-texto-terciario hidden sm:block" />
          <select
            aria-label="Ordenar clientes"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as CustomerSort)}
            className="w-full sm:w-auto min-h-10 px-4 rounded-full painel-control text-xs font-semibold cursor-pointer"
          >
            <option value="recent">Cadastro mais recente</option>
            <option value="spent_desc">Maior total gasto</option>
            <option value="purchases_desc">Mais compras</option>
            <option value="name_asc">Nome (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Customers Table / Mobile Cards */}
      {loading ? (
        <div role="status" aria-live="polite" aria-busy="true">
          <span className="sr-only">Carregando lista de clientes…</span>

          {/* Mobile Card Skeletons */}
          <div className="md:hidden flex flex-col gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-3xl painel-card p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-full skeleton-shimmer shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-32 rounded-full skeleton-shimmer" />
                      <div className="h-3 w-44 rounded-full skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="h-4 w-16 rounded-full skeleton-shimmer shrink-0" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-marinho/[0.07]">
                  <div className="h-3 w-36 rounded-full skeleton-shimmer" />
                  <div className="h-3.5 w-20 rounded-full skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Skeleton */}
          <div className="hidden md:block rounded-3xl painel-card overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F5F4F0]/75 border-b border-marinho/[0.07] grid grid-cols-[1.5fr_1.6fr_0.9fr_0.6fr_0.8fr_0.9fr] gap-4">
              {[1, 2, 3, 4, 5, 6].map((h) => (
                <div key={h} className="h-3 w-16 rounded-full skeleton-shimmer" />
              ))}
            </div>
            <div className="divide-y divide-marinho/[0.06]">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="px-5 py-3.5 grid grid-cols-[1.5fr_1.6fr_0.9fr_0.6fr_0.8fr_0.9fr] items-center gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
                    <div className="h-3.5 w-32 rounded-full skeleton-shimmer" />
                  </div>
                  <div className="h-3.5 w-44 rounded-full skeleton-shimmer" />
                  <div className="h-3.5 w-20 rounded-full skeleton-shimmer" />
                  <div className="h-4 w-8 rounded-full skeleton-shimmer ml-auto" />
                  <div className="h-4 w-16 rounded-full skeleton-shimmer ml-auto" />
                  <div className="h-8 w-24 rounded-full skeleton-shimmer ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="rounded-3xl painel-card p-8 sm:p-10 text-center flex flex-col items-center gap-3">
          <Users className="w-8 h-8 text-texto-terciario" />
          <p className="text-base font-bold text-texto-principal">
            Nenhum cliente encontrado
          </p>
          <p className="text-xs text-texto-secundario max-w-sm">
            Nenhum cadastro corresponde à pesquisa informada.
          </p>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-1 px-4 py-2 rounded-full bg-[#EAEBF2] text-xs font-bold text-marinho hover:bg-marinho hover:text-white transition-colors cursor-pointer"
            >
              Limpar pesquisa
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile Full-Width Cards */}
          <div className="md:hidden flex flex-col gap-2.5">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                type="button"
                onClick={() => setSelectedCustomer(customer)}
                className="w-full text-left rounded-3xl painel-card p-4 flex flex-col gap-2.5 active:bg-[#F5F4F0]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#EDF1F8] text-marinho text-xs font-bold flex items-center justify-center shrink-0">
                      {getInitials(customer.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-texto-principal truncate">
                        {customer.name}
                      </p>
                      <p className="text-xs text-texto-secundario truncate">
                        {customer.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-turquesa-deep tabular-nums shrink-0">
                    {formatCurrency(customer.totalSpent)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-marinho/[0.07] text-[11px] text-texto-terciario">
                  <span className="tabular-nums">
                    Desde {formatShortDate(customer.createdAt)} ·{" "}
                    <strong className="text-texto-principal font-semibold">
                      {customer.purchasesCount}{" "}
                      {customer.purchasesCount === 1 ? "compra" : "compras"}
                    </strong>
                  </span>
                  <span className="font-semibold text-turquesa-deep">
                    Ver histórico →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-3xl painel-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[740px]">
                <thead>
                  <tr className="border-b border-marinho/[0.07] bg-[#F5F4F0]/75 text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                    <th className="py-3.5 pl-5 pr-3">Nome</th>
                    <th className="py-3.5 px-3">E-mail</th>
                    <th className="py-3.5 px-3">Data de cadastro</th>
                    <th className="py-3.5 px-3 text-right">Compras</th>
                    <th className="py-3.5 px-3 text-right">Total gasto</th>
                    <th className="py-3.5 pl-3 pr-5 text-right">Histórico</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-marinho/[0.06]">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCustomer(customer);
                      }
                    }}
                    className="hover:bg-[#F5F4F0]/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#EDF1F8] text-marinho text-[11px] font-bold flex items-center justify-center shrink-0">
                          {getInitials(customer.name)}
                        </div>
                        <span className="text-xs font-bold text-texto-principal truncate max-w-[180px]">
                          {customer.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-xs text-texto-secundario">
                        {customer.email}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="text-xs text-texto-terciario tabular-nums">
                        {formatShortDate(customer.createdAt)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <span className="text-xs font-semibold text-texto-principal tabular-nums">
                        {customer.purchasesCount}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <span className="text-xs font-bold text-turquesa-deep tabular-nums">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </td>

                    <td className="py-3.5 pl-3 pr-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(customer);
                        }}
                        className="px-3.5 py-1.5 rounded-full painel-control text-xs font-semibold hover:bg-[#E7F6F4] hover:text-turquesa-deep hover:border-turquesa-deep/30 transition-colors cursor-pointer"
                      >
                        Ver histórico
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {/* Individual Purchase History Drawer */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-marinho/35 backdrop-blur-[3px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customer-drawer-title"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-lg h-full bg-white border-l border-marinho/[0.08] shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-marinho/[0.07] sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#E7F6F4] text-turquesa-deep font-bold text-sm flex items-center justify-center shrink-0">
                    {getInitials(selectedCustomer.name)}
                  </div>
                  <div className="min-w-0">
                    <h2
                      id="customer-drawer-title"
                      className="text-base font-bold text-texto-principal truncate"
                    >
                      {selectedCustomer.name}
                    </h2>
                    <p className="text-xs text-texto-secundario flex items-center gap-1 truncate">
                      <Mail className="w-3 h-3 shrink-0" />
                      <span className="truncate">{selectedCustomer.email}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  aria-label="Fechar histórico do cliente"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-texto-terciario hover:text-texto-principal hover:bg-[#F5F4F0] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 sm:p-6 flex flex-col gap-5 sm:gap-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-xl painel-well p-2.5 sm:p-3.5">
                    <p className="text-[11px] text-texto-terciario">Cadastro</p>
                    <p className="text-[11px] sm:text-xs font-bold text-texto-principal tabular-nums mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-texto-terciario shrink-0" />
                      <span className="truncate">{formatShortDate(selectedCustomer.createdAt)}</span>
                    </p>
                  </div>
                  <div className="rounded-xl painel-well p-2.5 sm:p-3.5">
                    <p className="text-[11px] text-texto-terciario">Pedidos</p>
                    <p className="text-sm sm:text-base font-bold text-texto-principal tabular-nums mt-0.5">
                      {selectedCustomer.purchasesCount}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#E7F6F4] border border-[#CFEAE5] p-2.5 sm:p-3.5">
                    <p className="text-[11px] text-turquesa-deep">Total gasto</p>
                    <p className="text-sm sm:text-base font-bold text-turquesa-deep tabular-nums mt-0.5 truncate">
                      {formatCurrency(selectedCustomer.totalSpent)}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-texto-principal uppercase tracking-wider mb-3">
                    Histórico de compras
                  </h3>

                  {selectedCustomer.purchases.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-marinho/[0.15] p-6 text-center text-xs text-texto-terciario">
                      Este cliente ainda não realizou compras.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {selectedCustomer.purchases.map((purchase) => (
                        <div
                          key={purchase.saleId}
                          className="rounded-2xl border border-marinho/[0.08] p-4 flex flex-col gap-2.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-texto-principal">
                                {purchase.productTitle}
                              </p>
                              <p className="text-xs text-texto-terciario mt-0.5">
                                {getMaterialTypeLabel(purchase.productCategory)} ·{" "}
                                {getPaymentMethodLabel(purchase.paymentMethod)}
                              </p>
                            </div>
                            <span className="text-sm font-bold text-texto-principal tabular-nums shrink-0">
                              {formatCurrency(purchase.amount)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-marinho/[0.07]">
                            <span className="text-[11px] text-texto-terciario tabular-nums flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" />
                              {formatFullDateTime(purchase.purchasedAt)}
                            </span>
                            <SaleStatusIndicator status={purchase.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-marinho/[0.07] bg-[#F5F4F0]/75 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-full painel-control text-xs font-bold hover:bg-[#F5F4F0] cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
