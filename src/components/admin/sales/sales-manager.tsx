"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  Receipt,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";
import type { AdminSale, PaymentMethodType, SaleStatus } from "@/types/admin";
import { getAdminToken } from "@/lib/auth/cookies";
import { getAdminSalesData } from "@/lib/api/admin-panel";
import { formatCurrency } from "@/lib/format/currency";
import { formatSaleDate, getInitials } from "@/lib/format/date";
import { downloadCsv } from "@/lib/format/csv";
import {
  getPaymentMethodLabel,
  getSaleStatusLabel,
  SaleStatusIndicator,
} from "@/components/admin/ui/status-badge";
import { SaleDetailDrawer } from "@/components/admin/sales/sale-detail-drawer";
import { useAdminToast } from "@/components/admin/ui/toast";
import { DataError } from "@/components/admin/ui/data-error";

type StatusFilter = "all" | SaleStatus;
type MethodFilter = "all" | PaymentMethodType;

const STATUS_TABS: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "approved", label: "Aprovado" },
  { value: "pending", label: "Pendente" },
  { value: "rejected", label: "Recusado" },
  { value: "cancelled", label: "Cancelado" },
  { value: "refunded", label: "Reembolsado" },
];

export function SalesManager() {
  const { showToast } = useAdminToast();

  const [sales, setSales] = useState<AdminSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [methodFilter, setMethodFilter] = useState<MethodFilter>("all");
  const [selectedSale, setSelectedSale] = useState<AdminSale | null>(null);

  function loadSales() {
    setLoading(true);
    setError(false);
    getAdminSalesData(getAdminToken())
      .then(setSales)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let active = true;
    getAdminSalesData(getAdminToken())
      .then((salesData) => { if (active) setSales(salesData); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredSales = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sales.filter((sale) => {
      if (statusFilter !== "all" && sale.status !== statusFilter) return false;
      if (methodFilter !== "all" && sale.paymentMethod !== methodFilter) return false;
      if (query) {
        const matches =
          sale.customerName.toLowerCase().includes(query) ||
          sale.customerEmail.toLowerCase().includes(query) ||
          sale.productTitle.toLowerCase().includes(query) ||
          sale.externalPaymentId.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [sales, search, statusFilter, methodFilter]);

  const metrics = useMemo(() => {
    const approved = sales.filter((s) => s.status === "approved");
    const pending = sales.filter((s) => s.status === "pending");
    const refunded = sales.filter((s) => s.status === "refunded");
    const approvedTotal = approved.reduce((sum, s) => sum + s.amount, 0);

    return {
      totalCount: sales.length,
      approvedCount: approved.length,
      approvedTotal,
      pendingCount: pending.length,
      refundedCount: refunded.length,
    };
  }, [sales]);

  if (error && !loading) {
    return <div className="flex flex-col gap-4 sm:gap-6"><h1 className="text-xl sm:text-2xl font-bold text-texto-principal">Vendas</h1><DataError onRetry={loadSales} /></div>;
  }

  function handleExportCsv() {
    downloadCsv(
      "vendas-a-ciencia-da-lua.csv",
      ["ID Mercado Pago", "Cliente", "E-mail", "Produto", "Meio", "Valor", "Data", "Status"],
      filteredSales.map((s) => [
        s.externalPaymentId,
        s.customerName,
        s.customerEmail,
        s.productTitle,
        getPaymentMethodLabel(s.paymentMethod),
        formatCurrency(s.amount),
        formatSaleDate(s.createdAt),
        getSaleStatusLabel(s.status),
      ])
    );
    showToast({
      title: "Exportação concluída",
      description: `${filteredSales.length} vendas exportadas em CSV.`,
    });
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-texto-principal tracking-tight">
              Vendas
            </h1>
            <p className="text-xs sm:text-sm text-texto-secundario mt-1">
              Acompanhe os pagamentos processados pelo Mercado Pago e a liberação de materiais.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          disabled={filteredSales.length === 0}
          className="inline-flex items-center justify-center gap-2 px-5 min-h-10 sm:min-h-11 rounded-full painel-control text-xs font-bold hover:bg-[#F5F4F0] cursor-pointer disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
        >
          <Download className="w-4 h-4 text-turquesa-deep" />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* Summary strip - 2x2 on mobile */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Total de pedidos
            </span>
            <span className="w-8 h-8 rounded-full bg-marinho text-white flex items-center justify-center shrink-0">
              <Receipt className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2">
            {metrics.totalCount}
          </p>
        </div>

        <div className="rounded-3xl painel-card-navy p-4 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-white/75">
              Receita aprovada
            </span>
            <span className="w-8 h-8 rounded-full bg-white/15 text-turquesa-light flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-1.5 sm:mt-2 truncate">
            {formatCurrency(metrics.approvedTotal)}
          </p>
          <p className="text-[11px] sm:text-xs text-turquesa-light mt-1 tabular-nums">
            {metrics.approvedCount} confirmados
          </p>
        </div>

        <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Aguardando
            </span>
            <span className="w-8 h-8 rounded-full bg-marinho text-ouro-light flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2">
            {metrics.pendingCount}
          </p>
          <p className="text-[11px] sm:text-xs text-texto-secundario mt-1">
            PIX ou em análise
          </p>
        </div>

        <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Reembolsados
            </span>
            <span className="w-8 h-8 rounded-full bg-marinho text-rosa-light flex items-center justify-center shrink-0">
              <RotateCcw className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2">
            {metrics.refundedCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-3xl painel-card p-3 sm:p-4 flex flex-col gap-2.5 sm:gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search
              className="w-4 h-4 text-texto-terciario absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cliente, e-mail, material ou ID..."
              aria-label="Buscar vendas"
              className="w-full pl-10 pr-4 min-h-10 rounded-full painel-control text-sm placeholder:text-texto-terciario"
            />
          </div>

          <select
            aria-label="Filtrar por meio de pagamento"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as MethodFilter)}
            className="w-full lg:w-auto min-h-10 px-4 rounded-full painel-control text-xs font-semibold cursor-pointer"
          >
            <option value="all">Todos os pagamentos</option>
            <option value="pix">PIX</option>
            <option value="credit_card">Cartão de crédito</option>
            <option value="checkout_pro">Checkout Pro</option>
          </select>
        </div>

        <div
          role="tablist"
          aria-label="Filtrar por status da venda"
          className="flex items-center gap-1 p-1 rounded-full painel-well overflow-x-auto no-scrollbar w-full sm:w-fit"
        >
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-white text-texto-principal shadow-sm"
                    : "text-texto-secundario hover:text-texto-principal"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table / Mobile Cards */}
      {loading ? (
        <div role="status" aria-live="polite" aria-busy="true">
          <span className="sr-only">Carregando histórico de vendas…</span>

          {/* Mobile Card Skeletons */}
          <div className="md:hidden flex flex-col gap-2.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="rounded-3xl painel-card p-4 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-32 rounded-full skeleton-shimmer" />
                      <div className="h-3 w-40 rounded-full skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="h-5 w-20 rounded-full skeleton-shimmer shrink-0" />
                </div>
                <div className="flex items-end justify-between gap-3 pt-2 border-t border-marinho/[0.06]">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-44 rounded-full skeleton-shimmer" />
                    <div className="h-3 w-28 rounded-full skeleton-shimmer" />
                  </div>
                  <div className="h-4 w-16 rounded-full skeleton-shimmer shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Skeleton */}
          <div className="hidden md:block rounded-3xl painel-card overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F5F4F0]/75 border-b border-marinho/[0.07] grid grid-cols-[1.5fr_1.6fr_0.9fr_0.7fr_0.8fr_0.8fr] gap-4">
              {[1, 2, 3, 4, 5, 6].map((h) => (
                <div key={h} className="h-3 w-16 rounded-full skeleton-shimmer" />
              ))}
            </div>
            <div className="divide-y divide-marinho/[0.06]">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="px-5 py-3.5 grid grid-cols-[1.5fr_1.6fr_0.9fr_0.7fr_0.8fr_0.8fr] items-center gap-4"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-28 rounded-full skeleton-shimmer" />
                      <div className="h-3 w-36 rounded-full skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-40 rounded-full skeleton-shimmer" />
                    <div className="h-3 w-24 rounded-full skeleton-shimmer" />
                  </div>
                  <div className="h-3.5 w-20 rounded-full skeleton-shimmer" />
                  <div className="h-4 w-16 rounded-full skeleton-shimmer ml-auto" />
                  <div className="h-3.5 w-20 rounded-full skeleton-shimmer" />
                  <div className="h-6 w-20 rounded-full skeleton-shimmer ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredSales.length === 0 ? (
        <div className="rounded-3xl painel-card p-8 sm:p-10 text-center flex flex-col items-center gap-3">
          <Receipt className="w-8 h-8 text-texto-terciario" />
          <p className="text-base font-bold text-texto-principal">
            Nenhuma venda encontrada
          </p>
          <p className="text-xs text-texto-secundario max-w-sm">
            Não há transações correspondentes aos filtros atuais.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setMethodFilter("all");
            }}
            className="mt-1 px-4 py-2 rounded-full bg-[#EAEBF2] text-xs font-bold text-marinho hover:bg-marinho hover:text-white transition-colors cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-2.5">
            {filteredSales.map((sale) => (
              <button
                key={sale.id}
                type="button"
                onClick={() => setSelectedSale(sale)}
                className="w-full text-left rounded-3xl painel-card p-4 flex flex-col gap-2.5 active:bg-[#F5F4F0]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#EAEBF2] text-marinho text-[11px] font-bold flex items-center justify-center shrink-0">
                      {getInitials(sale.customerName)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-texto-principal truncate">
                        {sale.customerName}
                      </p>
                      <p className="text-[11px] text-texto-terciario truncate">
                        {sale.customerEmail}
                      </p>
                    </div>
                  </div>
                  <SaleStatusIndicator status={sale.status} />
                </div>

                <div className="flex items-end justify-between gap-3 pt-2 border-t border-marinho/[0.06]">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-texto-principal truncate">
                      {sale.productTitle}
                    </p>
                    <p className="text-[11px] text-texto-terciario tabular-nums mt-0.5">
                      {getPaymentMethodLabel(sale.paymentMethod)} · {formatSaleDate(sale.createdAt)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-marinho tabular-nums shrink-0">
                    {formatCurrency(sale.amount)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-3xl painel-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-marinho/[0.07] bg-[#F5F4F0]/75 text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                    <th className="py-3.5 pl-5 pr-3">Cliente</th>
                    <th className="py-3.5 px-3">Produto</th>
                    <th className="py-3.5 px-3">Pagamento</th>
                    <th className="py-3.5 px-3 text-right">Valor</th>
                    <th className="py-3.5 px-3">Data</th>
                    <th className="py-3.5 pl-3 pr-5 text-right">Status</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-marinho/[0.06]">
                {filteredSales.map((sale) => (
                  <tr
                    key={sale.id}
                    onClick={() => setSelectedSale(sale)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedSale(sale);
                      }
                    }}
                    className="hover:bg-[#F5F4F0]/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#E7F6F4] text-turquesa-deep text-[11px] font-bold flex items-center justify-center shrink-0">
                          {getInitials(sale.customerName)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-texto-principal truncate max-w-[160px]">
                            {sale.customerName}
                          </p>
                          <p className="text-[11px] text-texto-terciario truncate max-w-[160px]">
                            {sale.customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="text-xs font-medium text-texto-principal line-clamp-1 max-w-[220px]">
                        {sale.productTitle}
                      </p>
                      <p className="text-[11px] font-mono text-texto-terciario">
                        {sale.externalPaymentId}
                      </p>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="text-xs text-texto-secundario">
                        {getPaymentMethodLabel(sale.paymentMethod)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <span className="text-xs font-bold text-texto-principal tabular-nums">
                        {formatCurrency(sale.amount)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="text-xs text-texto-terciario tabular-nums">
                        {formatSaleDate(sale.createdAt)}
                      </span>
                    </td>

                    <td className="py-3.5 pl-3 pr-5 text-right">
                      <SaleStatusIndicator status={sale.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      <SaleDetailDrawer sale={selectedSale} onClose={() => setSelectedSale(null)} />
    </div>
  );
}
