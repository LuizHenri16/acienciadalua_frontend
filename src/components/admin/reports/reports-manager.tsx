"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  TrendingUp,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { MaterialType } from "@/types/material";
import type { AdminDashboardPayload, DashboardPeriod } from "@/types/admin";
import { getAdminToken } from "@/lib/auth/cookies";
import { getAdminDashboardData } from "@/lib/api/admin-panel";
import { formatCurrency } from "@/lib/format/currency";
import { getMaterialTypeLabel } from "@/lib/format/material";
import { downloadCsv, downloadJson } from "@/lib/format/csv";
import { RevenueChart } from "@/components/admin/ui/revenue-chart";
import { useAdminToast } from "@/components/admin/ui/toast";

const PERIOD_OPTIONS: Array<{ value: DashboardPeriod; label: string }> = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "90d", label: "90 dias" },
  { value: "1y", label: "Ano" },
];

type CategoryFilter = "all" | MaterialType.STUDENT | MaterialType.TEACHER;

export function ReportsManager() {
  const { showToast } = useAdminToast();
  const [period, setPeriod] = useState<DashboardPeriod>("30d");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [chartMetric, setChartMetric] = useState<"revenue" | "salesCount">("revenue");
  const [data, setData] = useState<AdminDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getAdminDashboardData(getAdminToken(), period)
      .then((res) => {
        if (active) setData(res);
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
    setPeriod(nextPeriod);
  }

  const filteredTopProducts = useMemo(() => {
    if (!data) return [];
    if (categoryFilter === "all") return data.topProducts;
    return data.topProducts.filter((p) => p.category === categoryFilter);
  }, [data, categoryFilter]);

  const categoryBreakdown = useMemo(() => {
    if (!data) return { student: { count: 0, revenue: 0 }, teacher: { count: 0, revenue: 0 } };
    return data.topProducts.reduce(
      (acc, item) => {
        if (item.category === MaterialType.TEACHER) {
          acc.teacher.count += item.salesCount;
          acc.teacher.revenue += item.revenue;
        } else {
          acc.student.count += item.salesCount;
          acc.student.revenue += item.revenue;
        }
        return acc;
      },
      {
        student: { count: 0, revenue: 0 },
        teacher: { count: 0, revenue: 0 },
      }
    );
  }, [data]);

  function handleExportCsv() {
    if (!data) return;
    downloadCsv(
      `relatorio-a-ciencia-da-lua-${period}.csv`,
      ["Data", "Faturamento", "Quantidade de vendas", "Novos clientes"],
      data.revenueSeries.map((pt) => [
        pt.label,
        formatCurrency(pt.revenue),
        pt.salesCount,
        pt.newCustomers,
      ])
    );
    showToast({
      title: "Relatório CSV exportado",
      description: "Os dados do período foram baixados com sucesso.",
    });
  }

  function handleExportJson() {
    if (!data) return;
    downloadJson(`relatorio-a-ciencia-da-lua-${period}.json`, {
      periodo: period,
      resumo: data.periodSummary,
      serieTemporal: data.revenueSeries,
      maisVendidos: filteredTopProducts,
    });
    showToast({
      title: "Relatório JSON exportado",
      description: "Arquivo estruturado pronto para análise externa.",
    });
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-texto-principal tracking-tight">
              Relatórios
            </h1>
            <p className="text-xs sm:text-sm text-texto-secundario mt-1">
              Analise faturamento, evolução de vendas, novos clientes e materiais com melhor desempenho.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={!data}
            className="inline-flex items-center justify-center gap-2 px-5 min-h-10 rounded-full painel-btn-primary text-xs font-bold cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            disabled={!data}
            className="inline-flex items-center justify-center gap-2 px-5 min-h-10 rounded-full painel-control text-xs font-bold hover:bg-[#F5F4F0] cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-turquesa-deep" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* Period & Category Bar */}
      <div className="rounded-3xl painel-card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div
          role="tablist"
          aria-label="Período do relatório"
          className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 rounded-full painel-well w-full sm:w-auto"
        >
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={period === opt.value}
              onClick={() => handlePeriodChange(opt.value)}
              className={`px-2.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                period === opt.value
                  ? "bg-white text-marinho shadow-sm"
                  : "text-texto-secundario hover:text-texto-principal"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <select
          aria-label="Filtrar ranking por categoria"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
          className="w-full sm:w-auto min-h-10 px-4 rounded-full painel-control text-xs font-semibold cursor-pointer"
        >
          <option value="all">Todas as categorias</option>
          <option value={MaterialType.STUDENT}>Material de estudo</option>
          <option value={MaterialType.TEACHER}>Plano de aula</option>
        </select>
      </div>

      {loading || !data ? (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="flex flex-col gap-4 sm:gap-5"
        >
          <span className="sr-only">Carregando dados dos relatórios…</span>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`rounded-3xl p-4 sm:p-5 flex flex-col gap-3 ${
                  i === 1 ? "painel-card-accent" : "painel-card-soft"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="h-3.5 w-20 rounded-full skeleton-shimmer" />
                  <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
                </div>
                <div className="h-7 w-28 rounded-xl skeleton-shimmer" />
                <div className="h-3 w-24 rounded-full skeleton-shimmer" />
              </div>
            ))}
          </div>

          <div className="rounded-3xl painel-card-navy p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-4 w-44 rounded-full skeleton-shimmer-dark" />
                <div className="h-3.5 w-60 rounded-full skeleton-shimmer-dark" />
              </div>
              <div className="h-9 w-full sm:w-56 rounded-full skeleton-shimmer-dark" />
            </div>
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-3 pt-2">
              {[38, 60, 48, 76, 58, 90, 70, 84].map((pct, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-2xl skeleton-shimmer-dark"
                  style={{ height: `${pct}%` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 sm:gap-5">
            <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col gap-4">
              <div className="h-4 w-44 rounded-full skeleton-shimmer" />
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center justify-between gap-3 py-1.5">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-4 w-6 rounded-full skeleton-shimmer shrink-0" />
                    <div className="h-4 w-3/5 rounded-full skeleton-shimmer" />
                  </div>
                  <div className="h-4 w-20 rounded-full skeleton-shimmer shrink-0" />
                </div>
              ))}
            </div>

            <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col gap-4">
              <div className="space-y-1.5">
                <div className="h-4 w-40 rounded-full skeleton-shimmer" />
                <div className="h-3 w-52 rounded-full skeleton-shimmer" />
              </div>
              <div className="h-20 rounded-2xl skeleton-shimmer" />
              <div className="h-20 rounded-2xl skeleton-shimmer" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="rounded-3xl painel-card-accent p-4 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Faturamento
                </span>
                <span className="w-8 h-8 rounded-full bg-turquesa-deep text-white flex items-center justify-center shrink-0">
                  <Wallet className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2 truncate">
                {formatCurrency(data.periodSummary.totalRevenue)}
              </p>
              <p className="text-[11px] sm:text-xs text-turquesa-deep font-semibold mt-1 tabular-nums truncate">
                ↑ {data.periodSummary.revenueDeltaPct.toFixed(1).replace(".", ",")}%{" "}
                <span className="hidden sm:inline text-texto-terciario font-normal">
                  {data.periodSummary.comparisonLabel}
                </span>
              </p>
            </div>

            <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Vendas
                </span>
                <span className="w-8 h-8 rounded-full bg-marinho text-white flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2">
                {data.periodSummary.totalSalesCount}
              </p>
              <p className="text-[11px] sm:text-xs text-texto-secundario mt-1 tabular-nums">
                Aprovação: {data.periodSummary.approvalRate}%
              </p>
            </div>

            <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Novos clientes
                </span>
                <span className="w-8 h-8 rounded-full bg-marinho text-white flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2">
                {data.periodSummary.newCustomersCount}
              </p>
              <p className="text-[11px] sm:text-xs text-texto-secundario mt-1">
                No período
              </p>
            </div>

            <div className="rounded-3xl painel-card-soft p-4 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Ticket médio
                </span>
                <span className="w-8 h-8 rounded-full bg-marinho text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-marinho tabular-nums mt-1.5 sm:mt-2 truncate">
                {formatCurrency(data.periodSummary.averageTicket)}
              </p>
              <p className="text-[11px] sm:text-xs text-turquesa-deep font-semibold mt-1 tabular-nums">
                ↑ {data.periodSummary.averageTicketDeltaPct.toFixed(1).replace(".", ",")}%
              </p>
            </div>
          </div>

          {/* Evolution Chart */}
          <div className="relative overflow-hidden rounded-3xl painel-card-navy p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-turquesa/10 blur-2xl"
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {chartMetric === "revenue"
                    ? "Faturamento por período"
                    : "Evolução das vendas"}
                </h2>
                <p className="text-xs text-white/65 mt-0.5">
                  Toque ou passe o cursor pelos pontos para ver os valores exatos.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.09] w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setChartMetric("revenue")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer text-center whitespace-nowrap ${
                    chartMetric === "revenue"
                      ? "bg-white text-marinho shadow-sm"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  Faturamento (R$)
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric("salesCount")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer text-center whitespace-nowrap ${
                    chartMetric === "salesCount"
                      ? "bg-white text-marinho shadow-sm"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  Qtd. de vendas
                </button>
              </div>
            </div>

            <div className="relative">
              <RevenueChart
                data={data.revenueSeries}
                metric={chartMetric}
                height={240}
                variant="dark"
              />
            </div>
          </div>

          {/* Bottom Split: Top Selling Table + Category Distribution */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 sm:gap-5">
            <div className="rounded-3xl painel-card p-5 sm:p-6">
              <h2 className="text-sm sm:text-base font-bold text-texto-principal mb-3.5 sm:mb-4">
                Produtos mais vendidos
              </h2>

              {/* Mobile ranking list */}
              <div className="md:hidden divide-y divide-marinho/[0.06] border-t border-marinho/[0.07] -mx-4 px-4">
                {filteredTopProducts.map((item, index) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="text-xs font-bold text-texto-terciario tabular-nums mt-0.5 shrink-0">
                        0{index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-texto-principal truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-texto-terciario mt-0.5">
                          {getMaterialTypeLabel(item.category)} · {item.salesCount} vendas
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-turquesa-deep tabular-nums shrink-0">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left border-collapse min-w-[520px]">
                  <thead>
                    <tr className="border-y border-marinho/[0.07] text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                      <th className="py-3 pr-3">Material</th>
                      <th className="py-3 px-3">Categoria</th>
                      <th className="py-3 px-3 text-right">Vendas</th>
                      <th className="py-3 pl-3 text-right">Faturamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-marinho/[0.06]">
                    {filteredTopProducts.map((item, index) => (
                      <tr key={item.id}>
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-bold text-texto-terciario tabular-nums w-5">
                              0{index + 1}
                            </span>
                            <span className="text-xs font-bold text-texto-principal">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-xs text-texto-secundario">
                            {getMaterialTypeLabel(item.category)}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right tabular-nums text-xs font-bold text-texto-principal">
                          {item.salesCount}
                        </td>
                        <td className="py-3.5 pl-3 text-right tabular-nums text-xs font-bold text-turquesa-deep">
                          {formatCurrency(item.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Comparison */}
            <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                  Desempenho por público
                </h2>
                <p className="text-xs text-texto-terciario mt-0.5">
                  Distribuição entre materiais para estudantes e planos de aula.
                </p>

                <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4">
                  <div className="rounded-2xl bg-[#EEF8F6] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-turquesa-deep">
                        Material de estudo (Alunos)
                      </span>
                      <span className="text-xs font-bold text-marinho tabular-nums">
                        {categoryBreakdown.student.count} vendas
                      </span>
                    </div>
                    <p className="text-lg font-bold text-marinho tabular-nums mt-1.5">
                      {formatCurrency(categoryBreakdown.student.revenue)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#FDF0F3] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rosa-deep">
                        Plano de aula (Professores)
                      </span>
                      <span className="text-xs font-bold text-marinho tabular-nums">
                        {categoryBreakdown.teacher.count} vendas
                      </span>
                    </div>
                    <p className="text-lg font-bold text-marinho tabular-nums mt-1.5">
                      {formatCurrency(categoryBreakdown.teacher.revenue)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-texto-terciario leading-relaxed border-t border-marinho/[0.07] pt-4">
                Todos os produtos são materiais digitais entregues automaticamente na área “Minha Conta” após confirmação do Mercado Pago.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
