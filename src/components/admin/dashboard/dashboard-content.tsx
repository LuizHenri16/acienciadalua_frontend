"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Wallet,
  Eye,
  Users,
  Calendar,
  Bell,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  Clock,
  PencilLine,
  RotateCcw,
  PlugZap,
  Atom,
  Scale,
  Dices,
  Presentation,
  GitFork,
  ChevronDown,
} from "lucide-react";
import type {
  ActivityType,
  AdminDashboardPayload,
  AdminSale,
  DashboardPeriod,
  TopProductItem,
} from "@/types/admin";
import { getAdminToken } from "@/lib/auth/cookies";
import { getAdminDashboardData } from "@/lib/api/admin-panel";
import { formatCurrency } from "@/lib/format/currency";
import { formatSaleDate, getInitials } from "@/lib/format/date";
import { RevenueChart } from "@/components/admin/ui/revenue-chart";
import { SaleStatusIndicator } from "@/components/admin/ui/status-badge";
import { SaleDetailDrawer } from "@/components/admin/sales/sale-detail-drawer";

const PERIOD_OPTIONS: Array<{ value: DashboardPeriod; label: string; subtitle: string }> = [
  { value: "7d", label: "7 dias", subtitle: "últimos 7 dias" },
  { value: "30d", label: "30 dias", subtitle: "últimos 30 dias" },
  { value: "90d", label: "90 dias", subtitle: "últimos 90 dias" },
  { value: "1y", label: "Ano", subtitle: "últimos 12 meses" },
];

const REFERENCE_MONTHS = [
  "Junho de 2026",
  "Maio de 2026",
  "Abril de 2026",
];

function formatSplitCurrency(value: number) {
  const formatted = formatCurrency(value);
  const [whole, decimals] = formatted.split(",");
  return { whole, decimals };
}

function getTopProductStyle(tone: TopProductItem["tone"]) {
  switch (tone) {
    case "lilac":
      return {
        bg: "bg-[#F1EEFA]",
        text: "text-[#5B4B9A]",
        Icon: Scale,
      };
    case "amber":
      return {
        bg: "bg-[#FEF6E6]",
        text: "text-ouro-ink",
        Icon: Dices,
      };
    case "navy":
      return {
        bg: "bg-[#EDF1F8]",
        text: "text-marinho",
        Icon: Presentation,
      };
    case "rose":
      return {
        bg: "bg-[#FDEFF2]",
        text: "text-rosa-deep",
        Icon: GitFork,
      };
    case "teal":
    default:
      return {
        bg: "bg-[#E6F5F3]",
        text: "text-turquesa-deep",
        Icon: Atom,
      };
  }
}

function getActivityMeta(type: ActivityType) {
  switch (type) {
    case "sale_approved":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        Icon: CheckCircle2,
      };
    case "customer_registered":
      return {
        bg: "bg-[#EDF1F8]",
        text: "text-marinho-light",
        Icon: UserPlus,
      };
    case "payment_pending":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        Icon: Clock,
      };
    case "product_updated":
      return {
        bg: "bg-[#E6F5F3]",
        text: "text-turquesa-deep",
        Icon: PencilLine,
      };
    case "sale_refunded":
    default:
      return {
        bg: "bg-[#F3F0FA]",
        text: "text-[#5B4B9A]",
        Icon: RotateCcw,
      };
  }
}

export function AdminDashboard() {
  const [period, setPeriod] = useState<DashboardPeriod>("30d");
  const [selectedMonth, setSelectedMonth] = useState(REFERENCE_MONTHS[0]);
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [data, setData] = useState<AdminDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSale, setSelectedSale] = useState<AdminSale | null>(null);

  const fetchDashboard = useCallback((targetPeriod: DashboardPeriod) => {
    return getAdminDashboardData(getAdminToken(), targetPeriod)
      .then((payload) => {
        setData(payload);
        setError(false);
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
    getAdminDashboardData(getAdminToken(), period)
      .then((payload) => {
        if (!active) return;
        setData(payload);
        setError(false);
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
  }, [period]);

  function handlePeriodChange(nextPeriod: DashboardPeriod) {
    setLoading(true);
    setError(false);
    setPeriod(nextPeriod);
  }

  function handleRetry() {
    setLoading(true);
    setError(false);
    fetchDashboard(period);
  }

  const activePeriodMeta =
    PERIOD_OPTIONS.find((item) => item.value === period) ?? PERIOD_OPTIONS[1];

  if (loading && !data) {
    return (
      <div role="status" aria-live="polite" aria-busy="true" className="flex flex-col gap-6 animate-pulse">
        <span className="sr-only">Carregando visão geral do painel…</span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-5 w-44 rounded-lg bg-borda" />
            <div className="h-8 w-64 rounded-lg bg-borda" />
            <div className="h-4 w-56 rounded-lg bg-borda" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-36 rounded-xl bg-borda" />
            <div className="h-10 w-36 rounded-xl bg-borda" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 rounded-2xl bg-white border border-borda" />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-5">
          <div className="h-80 rounded-2xl bg-white border border-borda" />
          <div className="h-80 rounded-2xl bg-white border border-borda" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        role="alert"
        className="rounded-2xl bg-white border border-coral/30 p-8 text-center flex flex-col items-center gap-3"
      >
        <p className="text-base font-bold text-texto-principal">
          Não foi possível carregar os indicadores do painel.
        </p>
        <p className="text-sm text-texto-secundario max-w-md">
          Verifique a conexão com a API e tente atualizar novamente.
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="mt-1 px-5 py-2.5 rounded-xl bg-turquesa-deep text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const revenueSplit = formatSplitCurrency(data.kpis.monthlyRevenue);
  const periodRevenueSplit = formatSplitCurrency(data.periodSummary.totalRevenue);
  const maxTopSales = Math.max(...data.topProducts.map((p) => p.salesCount), 1);
  const activeRatio =
    data.kpis.totalProductsCount > 0
      ? Math.round((data.kpis.activeProductsCount / data.kpis.totalProductsCount) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div>
            <h1 className="text-xl sm:text-[28px] font-bold text-texto-principal tracking-tight leading-tight">
              Olá, seja bem-vinda! 👋
            </h1>
            <p className="text-xs sm:text-sm text-texto-secundario mt-1">
              Acompanhe o desempenho da sua plataforma.
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {/* Month selector */}
          <div className="relative flex-1 sm:flex-initial">
            <button
              type="button"
              onClick={() => {
                setMonthMenuOpen((v) => !v);
                setNotificationsOpen(false);
              }}
              aria-expanded={monthMenuOpen}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2 px-3 sm:px-3.5 min-h-10 rounded-xl bg-white border border-borda text-xs font-semibold text-texto-principal hover:bg-off-white/60 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="inline-flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-texto-terciario shrink-0" />
                <span className="truncate">{selectedMonth}</span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-texto-terciario shrink-0" />
            </button>

            {monthMenuOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-1.5 w-44 rounded-xl bg-white border border-borda shadow-lg py-1.5 z-20">
                {REFERENCE_MONTHS.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(month);
                      setMonthMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                      month === selectedMonth
                        ? "bg-[#E7F6F4] text-turquesa-deep font-bold"
                        : "text-texto-secundario hover:bg-off-white"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications popover */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((v) => !v);
                setMonthMenuOpen(false);
                setUnreadNotifications(false);
              }}
              aria-expanded={notificationsOpen}
              aria-label="Notificações recentes"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-borda text-texto-principal hover:bg-off-white/60 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications && (
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-turquesa-dark ring-2 ring-white"
                />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-80 max-w-[calc(100vw-24px)] rounded-2xl bg-white border border-borda shadow-xl p-4 z-20">
                <div className="flex items-center justify-between pb-2.5 border-b border-borda">
                  <p className="text-xs font-bold text-texto-principal">
                    Atualizações recentes
                  </p>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] font-semibold text-turquesa-deep hover:underline cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
                <div className="mt-2.5 flex flex-col gap-2.5 max-h-64 overflow-y-auto">
                  {data.recentActivity.slice(0, 4).map((act) => (
                    <div key={act.id} className="text-xs">
                      <p className="font-semibold text-texto-principal">
                        {act.title}
                      </p>
                      <p className="text-texto-secundario mt-0.5 leading-snug">
                        {act.description}
                      </p>
                      <p className="text-[11px] text-texto-terciario mt-0.5">
                        {act.relativeTime}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            href="/painel/produto"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 min-h-10 rounded-xl bg-turquesa-deep text-white text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Novo produto</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards - 2x2 on mobile for maximum screen density */}
      <section
        aria-label="Indicadores principais"
        className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4"
      >
        {/* 1. Vendas do mês */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div className="flex items-center justify-between gap-1.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E7F6F4] flex items-center justify-center text-turquesa-deep shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-semibold tabular-nums">
              <TrendingUp className="w-3 h-3 shrink-0" />
              {data.kpis.monthlySalesDeltaPct.toFixed(1).replace(".", ",")}%
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Vendas do mês
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-texto-principal tabular-nums leading-tight mt-0.5 sm:mt-1">
              {data.kpis.monthlySalesCount}
            </p>
            <p className="text-[11px] sm:text-xs text-texto-terciario mt-1 leading-snug">
              <span className="hidden sm:inline">vendas aprovadas · </span>
              {data.kpis.previousMonthlySalesCount} no mês anterior
            </p>
          </div>
        </div>

        {/* 2. Faturamento */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-turquesa-dark/35 p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_1px_3px_rgba(31,122,115,0.06)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-turquesa-light/30"
          />
          <div className="relative flex items-center justify-between gap-1.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-turquesa-deep flex items-center justify-center text-white shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-semibold tabular-nums">
              <TrendingUp className="w-3 h-3 shrink-0" />
              {data.kpis.monthlyRevenueDeltaPct.toFixed(1).replace(".", ",")}%
            </span>
          </div>
          <div className="relative mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Faturamento
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-turquesa-deep tabular-nums leading-tight mt-0.5 sm:mt-1 truncate">
              {revenueSplit.whole}
              <span className="text-sm sm:text-lg font-bold">,{revenueSplit.decimals}</span>
            </p>
            <p className="text-[11px] sm:text-xs text-texto-terciario mt-1 tabular-nums leading-snug truncate">
              <span className="hidden sm:inline">vendas aprovadas · </span>vs. {formatCurrency(data.kpis.previousMonthlyRevenue)}
            </p>
          </div>
        </div>

        {/* 3. Produtos ativos */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div className="flex items-center justify-between gap-1.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F1EEFA] flex items-center justify-center text-[#5B4B9A] shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs text-texto-terciario font-medium tabular-nums truncate">
              de {data.kpis.totalProductsCount} <span className="hidden sm:inline">cadastrados</span>
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Produtos ativos
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-texto-principal tabular-nums leading-tight mt-0.5 sm:mt-1">
              {data.kpis.activeProductsCount}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-off-white overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#6868A0] transition-all duration-300"
                  style={{ width: `${activeRatio}%` }}
                />
              </div>
              <span className="text-[11px] sm:text-xs text-texto-terciario shrink-0">
                na vitrine
              </span>
            </div>
          </div>
        </div>

        {/* 4. Clientes cadastrados */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div className="flex items-center justify-between gap-1.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EDF1F8] flex items-center justify-center text-marinho shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-lg bg-[#E7F6F4] text-turquesa-deep text-[11px] sm:text-xs font-semibold tabular-nums whitespace-nowrap">
              +{data.kpis.newCustomersMonthCount} <span className="hidden sm:inline ml-1">no mês</span>
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Clientes cadastrados
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-texto-principal tabular-nums leading-tight mt-0.5 sm:mt-1">
              {data.kpis.totalCustomersCount}
            </p>
            <p className="text-[11px] sm:text-xs text-texto-terciario mt-1 leading-snug">
              contas registradas
            </p>
          </div>
        </div>
      </section>

      {/* Performance Row: Revenue Chart + Top Products */}
      <section
        aria-label="Gráficos e desempenho"
        className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-4 sm:gap-5 items-stretch"
      >
        {/* Revenue Chart Card */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                  Evolução do faturamento
                </h2>
                <div className="flex flex-wrap items-baseline gap-2 mt-1">
                  <span className="text-lg sm:text-xl font-bold text-texto-principal tabular-nums">
                    {periodRevenueSplit.whole},{periodRevenueSplit.decimals}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-turquesa-deep tabular-nums">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {data.periodSummary.revenueDeltaPct.toFixed(1).replace(".", ",")}%
                  </span>
                  <span className="text-xs text-texto-terciario">
                    {data.periodSummary.comparisonLabel}
                  </span>
                </div>
              </div>

              {/* Period filter - full width 4-column grid on mobile */}
              <div
                role="tablist"
                aria-label="Período de faturamento"
                className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-off-white border border-borda w-full sm:w-auto"
              >
                {PERIOD_OPTIONS.map((opt) => {
                  const selected = opt.value === period;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => handlePeriodChange(opt.value)}
                      className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                        selected
                          ? "bg-white text-texto-principal shadow-sm"
                          : "text-texto-secundario hover:text-texto-principal"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 sm:mt-5">
              <RevenueChart data={data.revenueSeries} metric="revenue" height={225} />
            </div>
          </div>

          {/* Sub-metrics footer */}
          <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-borda grid grid-cols-3 gap-2 sm:gap-4">
            <div>
              <p className="text-[11px] sm:text-xs text-texto-terciario">Ticket médio</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="text-xs sm:text-base font-bold text-texto-principal tabular-nums">
                  {formatCurrency(data.periodSummary.averageTicket)}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-turquesa-deep tabular-nums">
                  ↑ {data.periodSummary.averageTicketDeltaPct.toFixed(1).replace(".", ",")}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] sm:text-xs text-texto-terciario truncate">Taxa aprovação</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="text-xs sm:text-base font-bold text-texto-principal tabular-nums">
                  {data.periodSummary.approvalRate}%
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-turquesa-deep tabular-nums">
                  ↑ {data.periodSummary.approvalRateDeltaPp} p.p.
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] sm:text-xs text-texto-terciario">Reembolsos</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="text-xs sm:text-base font-bold text-texto-principal tabular-nums">
                  {data.periodSummary.refundsCount}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold text-turquesa-deep tabular-nums">
                  {data.periodSummary.refundsDelta <= 0 ? (
                    <>
                      <TrendingDown className="w-3 h-3" />
                      {Math.abs(data.periodSummary.refundsDelta)}
                    </>
                  ) : (
                    <>+{data.periodSummary.refundsDelta}</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                Mais vendidos
              </h2>
              <span className="text-xs text-texto-terciario">
                {activePeriodMeta.subtitle}
              </span>
            </div>

            <div className="mt-4 sm:mt-5 flex flex-col gap-3.5 sm:gap-4">
              {data.topProducts.map((item) => {
                const style = getTopProductStyle(item.tone);
                const Icon = style.Icon;
                const widthPct = Math.max(8, Math.round((item.salesCount / maxTopSales) * 100));

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs sm:text-[13px] font-semibold text-texto-principal truncate">
                          {item.title}
                        </p>
                        <span className="text-xs font-bold text-texto-principal tabular-nums shrink-0">
                          {item.salesCount}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-off-white overflow-hidden">
                        <div
                          className="h-full rounded-full bg-turquesa-deep transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/painel/produtos"
            className="mt-5 sm:mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-borda text-xs font-bold text-texto-principal hover:bg-off-white transition-colors"
          >
            <span>Ver todos os produtos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Bottom Row: Recent Sales + Activity Feed */}
      <section
        aria-label="Vendas e atividades recentes"
        className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-4 sm:gap-5 items-stretch"
      >
        {/* Recent Sales */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 sm:pb-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                  Vendas recentes
                </h2>
                <p className="text-xs text-texto-terciario mt-0.5">
                  Atualizadas automaticamente pelo Mercado Pago
                </p>
              </div>
              <Link
                href="/painel/vendas"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E7F6F4] text-turquesa-deep text-xs font-bold hover:bg-turquesa-light/60 transition-colors whitespace-nowrap w-full sm:w-auto"
              >
                <span>Ver todas as vendas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Card List (Full width, zero horizontal scroll) */}
            <div className="md:hidden divide-y divide-borda border-t border-borda -mx-3.5 px-3.5">
              {data.recentSales.map((sale) => (
                <button
                  key={sale.id}
                  type="button"
                  onClick={() => setSelectedSale(sale)}
                  className="w-full text-left py-3 flex flex-col gap-2 active:bg-off-white/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#E7F6F4] text-turquesa-deep text-[11px] font-bold flex items-center justify-center shrink-0">
                        {getInitials(sale.customerName)}
                      </div>
                      <span className="text-xs font-bold text-texto-principal truncate">
                        {sale.customerName}
                      </span>
                    </div>
                    <SaleStatusIndicator status={sale.status} />
                  </div>
                  <div className="flex items-center justify-between gap-3 pl-[42px]">
                    <div className="min-w-0">
                      <p className="text-xs text-texto-secundario truncate">
                        {sale.productTitle}
                      </p>
                      <p className="text-[11px] text-texto-terciario tabular-nums mt-0.5">
                        {formatSaleDate(sale.createdAt)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-texto-principal tabular-nums shrink-0">
                      {formatCurrency(sale.amount)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-y border-borda text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                    <th className="py-3 pr-3">Cliente</th>
                    <th className="py-3 px-3">Produto</th>
                    <th className="py-3 px-3 text-right">Valor</th>
                    <th className="py-3 px-3">Data</th>
                    <th className="py-3 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borda">
                  {data.recentSales.map((sale) => (
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
                      className="group hover:bg-off-white/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#E7F6F4] text-turquesa-deep text-[11px] font-bold flex items-center justify-center shrink-0">
                            {getInitials(sale.customerName)}
                          </div>
                          <span className="text-xs font-bold text-texto-principal truncate max-w-[140px]">
                            {sale.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-xs text-texto-secundario line-clamp-1 max-w-[190px]">
                          {sale.productTitle}
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
                      <td className="py-3.5 pl-3 text-right">
                        <SaleStatusIndicator status={sale.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {data.isDemo && (
            <p className="mt-3 sm:mt-4 pt-3 border-t border-borda text-[11px] text-texto-terciario">
              Valores demonstrativos para a prévia visual — conecte os endpoints administrativos do backend Go para exibir transações reais.
            </p>
          )}
        </div>

        {/* Recent Activity Panel */}
        <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6 flex flex-col justify-between shadow-[0_1px_2px_rgba(28,28,46,0.03)]">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4">
              <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                Atividade recente
              </h2>
              <span className="text-xs font-semibold text-turquesa-deep">
                Sincronizado
              </span>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4 mt-1">
              {data.recentActivity.map((act) => {
                const meta = getActivityMeta(act.type);
                const Icon = meta.Icon;

                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${meta.bg} ${meta.text}`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-texto-principal leading-relaxed">
                        <span className="font-bold">{act.title}</span> —{" "}
                        <span className="text-texto-secundario">{act.description}</span>
                      </p>
                      <p className="text-[11px] text-texto-terciario mt-0.5">
                        {act.relativeTime}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mercado Pago Webhook Connection Summary */}
          <div className="mt-5 sm:mt-6 rounded-xl bg-[#EEF8F6] border border-[#CFEAE5] p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#CFEAE5] flex items-center justify-center text-turquesa-deep shrink-0">
              <PlugZap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-texto-principal">
                Mercado Pago conectado
              </p>
              <p className="text-[11px] text-texto-secundario truncate">
                Webhooks ativos · último evento {data.webhookStatus.lastEventRelative}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SaleDetailDrawer sale={selectedSale} onClose={() => setSelectedSale(null)} />
    </div>
  );
}
