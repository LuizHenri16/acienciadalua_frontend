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

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [methodFilter, setMethodFilter] = useState<MethodFilter>("all");
  const [selectedSale, setSelectedSale] = useState<AdminSale | null>(null);

  useEffect(() => {
    let active = true;
    getAdminSalesData(getAdminToken())
      .then((res) => {
        if (!active) return;
        setSales(res.data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
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
          className="inline-flex items-center justify-center gap-2 px-4 min-h-10 sm:min-h-11 rounded-xl bg-white border border-borda text-xs font-bold text-texto-principal hover:bg-off-white transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
        >
          <Download className="w-4 h-4 text-turquesa-deep" />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* Summary strip - 2x2 on mobile */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Total de pedidos
            </span>
            <Receipt className="w-4 h-4 text-texto-terciario shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-texto-principal tabular-nums mt-1.5 sm:mt-2">
            {metrics.totalCount}
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-white border border-turquesa-dark/30 p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Receita aprovada
            </span>
            <CheckCircle2 className="w-4 h-4 text-turquesa-deep shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-turquesa-deep tabular-nums mt-1.5 sm:mt-2 truncate">
            {formatCurrency(metrics.approvedTotal)}
          </p>
          <p className="text-[11px] sm:text-xs text-texto-terciario mt-1 tabular-nums">
            {metrics.approvedCount} confirmados
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Aguardando
            </span>
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-texto-principal tabular-nums mt-1.5 sm:mt-2">
            {metrics.pendingCount}
          </p>
          <p className="text-[11px] sm:text-xs text-texto-terciario mt-1">
            PIX ou em análise
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Reembolsados
            </span>
            <RotateCcw className="w-4 h-4 text-[#5B4B9A] shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-texto-principal tabular-nums mt-1.5 sm:mt-2">
            {metrics.refundedCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3 sm:p-4 flex flex-col gap-2.5 sm:gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search
              className="w-4 h-4 text-texto-terciario absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cliente, e-mail, material ou ID..."
              aria-label="Buscar vendas"
              className="w-full pl-10 pr-4 min-h-10 rounded-xl bg-off-white/70 border border-borda text-sm text-texto-principal placeholder:text-texto-terciario focus:bg-white focus:border-turquesa-dark transition-colors"
            />
          </div>

          <select
            aria-label="Filtrar por meio de pagamento"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as MethodFilter)}
            className="w-full lg:w-auto min-h-10 px-3 rounded-xl bg-off-white/70 border border-borda text-xs font-semibold text-texto-principal focus:bg-white focus:border-turquesa-dark cursor-pointer"
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
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-[#E7F6F4] text-turquesa-deep"
                    : "text-texto-secundario hover:bg-off-white hover:text-texto-principal"
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
        <div className="rounded-2xl bg-white border border-borda p-4 flex flex-col gap-3 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-off-white" />
          ))}
        </div>
      ) : filteredSales.length === 0 ? (
        <div className="rounded-2xl bg-white border border-dashed border-borda-med p-8 sm:p-10 text-center flex flex-col items-center gap-3">
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
            className="mt-1 px-4 py-2 rounded-xl border border-borda-med text-xs font-bold text-texto-principal hover:bg-off-white cursor-pointer"
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
                className="w-full text-left rounded-xl bg-white border border-borda p-3.5 flex flex-col gap-2.5 active:bg-off-white/60 transition-colors cursor-pointer shadow-[0_1px_2px_rgba(28,28,46,0.03)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#E7F6F4] text-turquesa-deep text-[11px] font-bold flex items-center justify-center shrink-0">
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

                <div className="flex items-end justify-between gap-3 pt-2 border-t border-borda">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-texto-principal truncate">
                      {sale.productTitle}
                    </p>
                    <p className="text-[11px] text-texto-terciario tabular-nums mt-0.5">
                      {getPaymentMethodLabel(sale.paymentMethod)} · {formatSaleDate(sale.createdAt)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-texto-principal tabular-nums shrink-0">
                    {formatCurrency(sale.amount)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl bg-white border border-borda overflow-hidden shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-borda bg-off-white/50 text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                    <th className="py-3.5 pl-5 pr-3">Cliente</th>
                    <th className="py-3.5 px-3">Produto</th>
                    <th className="py-3.5 px-3">Pagamento</th>
                    <th className="py-3.5 px-3 text-right">Valor</th>
                    <th className="py-3.5 px-3">Data</th>
                    <th className="py-3.5 pl-3 pr-5 text-right">Status</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-borda">
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
                    className="hover:bg-off-white/50 transition-colors cursor-pointer"
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
