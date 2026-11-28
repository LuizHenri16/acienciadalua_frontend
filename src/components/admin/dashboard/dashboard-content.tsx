"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Wallet,
  Eye,
  Users,
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

function getTimeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
}

function getAdminDisplayNameFromToken(token: string): string {
  if (!token) return "Profa. Lua";
  try {
    const parts = token.split(".");
    if (parts.length < 2) return "Profa. Lua";
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      Array.from(atob(padded), (ch) => `%${ch.charCodeAt(0).toString(16).padStart(2, "0")}`).join("")
    );
    const payload = JSON.parse(json) as Record<string, unknown>;

    const rawName =
      (typeof payload.username === "string" && payload.username.trim()) ||
      (typeof payload.name === "string" && payload.name.trim()) ||
      (typeof payload.preferred_username === "string" && payload.preferred_username.trim()) ||
      (typeof payload.given_name === "string" && payload.given_name.trim());

    if (rawName) return rawName;

    const emailOrSub =
      (typeof payload.email === "string" && payload.email.trim()) ||
      (typeof payload.sub === "string" && payload.sub.includes("@") ? payload.sub.trim() : "");

    if (emailOrSub) {
      const localPart = emailOrSub.split("@")[0]?.trim();
      if (localPart) return localPart;
    }
  } catch {
    // Fallback gracefully when token is opaque or cannot be parsed
  }
  return "Profa. Lua";
}

export function AdminDashboard() {
  const [period, setPeriod] = useState<DashboardPeriod>("30d");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [data, setData] = useState<AdminDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSale, setSelectedSale] = useState<AdminSale | null>(null);
  const [greeting, setGreeting] = useState<string>("");
  const [adminUsername, setAdminUsername] = useState<string>("Profa. Lua");

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
    const syncGreetingAndUser = () => {
      setGreeting(getTimeGreeting());
      setAdminUsername(getAdminDisplayNameFromToken(getAdminToken()));
    };
    const initialTimer = window.setTimeout(syncGreetingAndUser, 0);
    const interval = window.setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
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
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex flex-col gap-4 sm:gap-6"
      >
        <span className="sr-only">Carregando visão geral do painel…</span>

        {/* Header skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
          <div className="space-y-2">
            <div className="h-7 sm:h-8 w-56 sm:w-64 rounded-full skeleton-shimmer" />
            <div className="h-4 w-48 sm:w-60 rounded-full skeleton-shimmer" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <div className="h-10 flex-1 sm:flex-initial sm:w-36 rounded-full skeleton-shimmer" />
            <div className="h-10 w-10 rounded-full skeleton-shimmer shrink-0" />
            <div className="h-10 w-32 sm:w-36 rounded-full skeleton-shimmer shrink-0" />
          </div>
        </div>

        {/* 4 KPI cards skeleton */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between gap-4 ${
                i === 2 ? "painel-card-accent" : "painel-card-soft"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 h-9 rounded-full skeleton-shimmer shrink-0" />
                <div className="h-5 w-14 rounded-full skeleton-shimmer" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-24 rounded-full skeleton-shimmer" />
                <div className="h-7 w-28 rounded-xl skeleton-shimmer" />
                <div className="h-3 w-32 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Dark Marinho Chart + Top Products */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-4 sm:gap-5 items-stretch">
          <div className="rounded-3xl painel-card-navy p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="h-4 w-44 rounded-full skeleton-shimmer-dark" />
                <div className="h-7 w-36 rounded-xl skeleton-shimmer-dark" />
              </div>
              <div className="h-9 w-full sm:w-56 rounded-full skeleton-shimmer-dark" />
            </div>

            <div className="h-44 flex items-end justify-between gap-2 sm:gap-3 pt-4">
              {[42, 66, 54, 80, 62, 92, 74, 86].map((pct, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-2xl skeleton-shimmer-dark"
                  style={{ height: `${pct}%` }}
                />
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-4">
              {[1, 2, 3].map((m) => (
                <div key={m} className="space-y-1.5">
                  <div className="h-3 w-16 rounded-full skeleton-shimmer-dark" />
                  <div className="h-5 w-20 rounded-lg skeleton-shimmer-dark" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="h-4 w-32 rounded-full skeleton-shimmer" />
                <div className="h-3.5 w-20 rounded-full skeleton-shimmer" />
              </div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full skeleton-shimmer shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="h-3.5 w-3/5 rounded-full skeleton-shimmer" />
                        <div className="h-3.5 w-8 rounded-full skeleton-shimmer" />
                      </div>
                      <div className="h-1.5 w-full rounded-full skeleton-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-10 w-full rounded-full skeleton-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        role="alert"
        className="rounded-3xl painel-card p-8 text-center flex flex-col items-center gap-3"
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
          className="mt-1 px-5 py-2.5 rounded-full painel-btn-primary text-sm font-bold cursor-pointer"
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
              {greeting || "Olá"}, {adminUsername}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-texto-secundario mt-1">
              Acompanhe o desempenho da sua plataforma.
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {/* Notifications popover */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((v) => !v);
              }}
              aria-expanded={notificationsOpen}
              aria-label="Notificações recentes"
              className="relative flex items-center justify-center w-10 h-10 rounded-full painel-control cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] rounded-3xl bg-white shadow-[0_22px_48px_-14px_rgba(30,27,75,0.22)] p-4 z-20">
                <div className="flex items-center justify-between pb-2.5 border-b border-marinho/[0.06]">
                  <p className="text-xs font-bold text-texto-principal">
                    Atualizações recentes
                  </p>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] font-semibold text-marinho hover:underline cursor-pointer"
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
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 min-h-10 rounded-full painel-btn-primary text-xs font-bold whitespace-nowrap shrink-0"
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
        <div className="rounded-3xl painel-card-soft p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1.5">
            <div className="w-9 h-9 rounded-full bg-marinho flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full bg-white/85 text-turquesa-deep text-[11px] sm:text-xs font-bold tabular-nums">
              <TrendingUp className="w-3 h-3 shrink-0" />
              {data.kpis.monthlySalesDeltaPct.toFixed(1).replace(".", ",")}%
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Vendas do mês
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-marinho tabular-nums leading-tight mt-0.5 sm:mt-1">
              {data.kpis.monthlySalesCount}
            </p>
            <p className="text-[11px] sm:text-xs text-texto-secundario mt-1 leading-snug">
              <span className="hidden sm:inline">vendas aprovadas · </span>
              {data.kpis.previousMonthlySalesCount} no mês anterior
            </p>
          </div>
        </div>

        {/* 2. Faturamento */}
        <div className="relative overflow-hidden rounded-3xl painel-card-accent p-4 sm:p-5 flex flex-col justify-between">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-turquesa-light/30"
          />
          <div className="relative flex items-center justify-between gap-1.5">
            <div className="w-9 h-9 rounded-full bg-turquesa-deep flex items-center justify-center text-white shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full bg-[#E7F6F4] text-turquesa-deep text-[11px] sm:text-xs font-bold tabular-nums">
              <TrendingUp className="w-3 h-3 shrink-0" />
              {data.kpis.monthlyRevenueDeltaPct.toFixed(1).replace(".", ",")}%
            </span>
          </div>
          <div className="relative mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Faturamento
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-marinho tabular-nums leading-tight mt-0.5 sm:mt-1 truncate">
              {revenueSplit.whole}
              <span className="text-sm sm:text-lg font-bold">,{revenueSplit.decimals}</span>
            </p>
            <p className="text-[11px] sm:text-xs text-texto-terciario mt-1 tabular-nums leading-snug truncate">
              <span className="hidden sm:inline">vendas aprovadas · </span>vs. {formatCurrency(data.kpis.previousMonthlyRevenue)}
            </p>
          </div>
        </div>

        {/* 3. Produtos ativos */}
        <div className="rounded-3xl painel-card-soft p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1.5">
            <div className="w-9 h-9 rounded-full bg-marinho flex items-center justify-center text-white shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs text-texto-secundario font-semibold tabular-nums truncate">
              de {data.kpis.totalProductsCount} <span className="hidden sm:inline">cadastrados</span>
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Produtos ativos
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-marinho tabular-nums leading-tight mt-0.5 sm:mt-1">
              {data.kpis.activeProductsCount}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-white/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rosa-deep transition-all duration-300"
                  style={{ width: `${activeRatio}%` }}
                />
              </div>
              <span className="text-[11px] sm:text-xs text-texto-secundario shrink-0">
                na vitrine
              </span>
            </div>
          </div>
        </div>

        {/* 4. Clientes cadastrados */}
        <div className="rounded-3xl painel-card-soft p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1.5">
            <div className="w-9 h-9 rounded-full bg-marinho flex items-center justify-center text-white shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/85 text-marinho text-[11px] sm:text-xs font-bold tabular-nums whitespace-nowrap">
              +{data.kpis.newCustomersMonthCount} <span className="hidden sm:inline ml-1">no mês</span>
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs font-medium text-texto-secundario">
              Clientes cadastrados
            </p>
            <p className="text-xl sm:text-[28px] font-bold text-marinho tabular-nums leading-tight mt-0.5 sm:mt-1">
              {data.kpis.totalCustomersCount}
            </p>
            <p className="text-[11px] sm:text-xs text-texto-secundario mt-1 leading-snug">
              contas registradas
            </p>
          </div>
        </div>
      </section>

      {/* Performance Row: Revenue Chart (Marinho Navy) + Top Products */}
      <section
        aria-label="Gráficos e desempenho"
        className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-4 sm:gap-5 items-stretch"
      >
        {/* Revenue Chart Card */}
        <div className="relative overflow-hidden rounded-3xl painel-card-navy p-5 sm:p-6 flex flex-col justify-between">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-turquesa/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-ouro/10 blur-2xl"
          />
          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Evolução do faturamento
                </h2>
                <div className="flex flex-wrap items-baseline gap-2 mt-1">
                  <span className="text-lg sm:text-2xl font-bold text-white tabular-nums">
                    {periodRevenueSplit.whole},{periodRevenueSplit.decimals}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-ouro/20 text-xs font-bold text-ouro-light tabular-nums">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {data.periodSummary.revenueDeltaPct.toFixed(1).replace(".", ",")}%
                  </span>
                  <span className="text-xs text-white/65">
                    {data.periodSummary.comparisonLabel}
                  </span>
                </div>
              </div>

              {/* Period filter - full width 4-column grid on mobile */}
              <div
                role="tablist"
                aria-label="Período de faturamento"
                className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.09] w-full sm:w-auto"
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
                      className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                        selected
                          ? "bg-white text-marinho shadow-sm"
                          : "text-white/75 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 sm:mt-5">
              <RevenueChart
                data={data.revenueSeries}
                metric="revenue"
                height={225}
                variant="dark"
              />
            </div>
          </div>

          {/* Sub-metrics footer */}
          <div className="relative mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4">
            <div>
              <p className="text-[11px] sm:text-xs text-white/65">Ticket médio</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="text-xs sm:text-base font-bold text-white tabular-nums">
                  {formatCurrency(data.periodSummary.averageTicket)}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-turquesa-light tabular-nums">
                  ↑ {data.periodSummary.averageTicketDeltaPct.toFixed(1).replace(".", ",")}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] sm:text-xs text-white/65 truncate">Taxa aprovação</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="text-xs sm:text-base font-bold text-white tabular-nums">
                  {data.periodSummary.approvalRate}%
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-turquesa-light tabular-nums">
                  ↑ {data.periodSummary.approvalRateDeltaPp} p.p.
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] sm:text-xs text-white/65">Reembolsos</p>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="text-xs sm:text-base font-bold text-white tabular-nums">
                  {data.periodSummary.refundsCount}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold text-ouro-light tabular-nums">
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
        <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col justify-between">
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
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs sm:text-[13px] font-semibold text-texto-principal truncate">
                          {item.title}
                        </p>
                        <span className="text-xs font-bold text-marinho tabular-nums shrink-0">
                          {item.salesCount}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#EAEBF2] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-marinho transition-all duration-300"
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
            className="mt-5 sm:mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#EAEBF2] text-marinho text-xs font-bold hover:bg-marinho hover:text-white transition-colors"
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
        <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col justify-between">
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
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-marinho text-white text-xs font-bold hover:bg-[#2B276B] transition-colors whitespace-nowrap w-full sm:w-auto"
              >
                <span>Ver todas as vendas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Card List (Full width, zero horizontal scroll) */}
            <div className="md:hidden divide-y divide-marinho/[0.06] -mx-3.5 px-3.5">
              {data.recentSales.map((sale) => (
                <button
                  key={sale.id}
                  type="button"
                  onClick={() => setSelectedSale(sale)}
                  className="w-full text-left py-3 flex flex-col gap-2 active:bg-off-white/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#EAEBF2] text-marinho text-[11px] font-bold flex items-center justify-center shrink-0">
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
                  <tr className="border-b border-marinho/[0.06] text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                    <th className="py-3 pr-3">Cliente</th>
                    <th className="py-3 px-3">Produto</th>
                    <th className="py-3 px-3 text-right">Valor</th>
                    <th className="py-3 px-3">Data</th>
                    <th className="py-3 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-marinho/[0.05]">
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
                      className="group hover:bg-[#F5F4F0]/65 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#EAEBF2] text-marinho text-[11px] font-bold flex items-center justify-center shrink-0">
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

        </div>

        {/* Recent Activity Panel */}
        <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col justify-between">
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${meta.bg} ${meta.text}`}
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
          <div className="mt-5 sm:mt-6 rounded-2xl bg-[#EAEBF2] p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-marinho flex items-center justify-center text-white shrink-0">
              <PlugZap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-marinho">
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
