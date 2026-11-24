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
            className="inline-flex items-center justify-center gap-2 px-4 min-h-10 rounded-xl bg-turquesa-deep text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            disabled={!data}
            className="inline-flex items-center justify-center gap-2 px-4 min-h-10 rounded-xl bg-white border border-borda text-xs font-bold text-texto-principal hover:bg-off-white transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-turquesa-deep" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* Period & Category Bar */}
      <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div
          role="tablist"
          aria-label="Período do relatório"
          className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-off-white border border-borda w-full sm:w-auto"
        >
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={period === opt.value}
              onClick={() => handlePeriodChange(opt.value)}
              className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                period === opt.value
                  ? "bg-white text-texto-principal shadow-sm"
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
          className="w-full sm:w-auto min-h-10 px-3 rounded-xl bg-off-white/70 border border-borda text-xs font-semibold text-texto-principal focus:bg-white focus:border-turquesa-dark cursor-pointer"
        >
          <option value="all">Todas as categorias</option>
          <option value={MaterialType.STUDENT}>Material de estudo</option>
          <option value={MaterialType.TEACHER}>Plano de aula</option>
        </select>
      </div>

      {loading || !data ? (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-white border border-borda" />
            ))}
          </div>
          <div className="h-80 rounded-2xl bg-white border border-borda" />
        </div>
      ) : (
        <>
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="rounded-xl sm:rounded-2xl bg-white border border-turquesa-dark/30 p-3.5 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Faturamento
                </span>
                <Wallet className="w-4 h-4 text-turquesa-deep shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-turquesa-deep tabular-nums mt-1.5 sm:mt-2 truncate">
                {formatCurrency(data.periodSummary.totalRevenue)}
              </p>
              <p className="text-[11px] sm:text-xs text-turquesa-deep font-semibold mt-1 tabular-nums truncate">
                ↑ {data.periodSummary.revenueDeltaPct.toFixed(1).replace(".", ",")}%{" "}
                <span className="hidden sm:inline text-texto-terciario font-normal">
                  {data.periodSummary.comparisonLabel}
                </span>
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Vendas
                </span>
                <ShoppingBag className="w-4 h-4 text-texto-terciario shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-texto-principal tabular-nums mt-1.5 sm:mt-2">
                {data.periodSummary.totalSalesCount}
              </p>
              <p className="text-[11px] sm:text-xs text-texto-terciario mt-1 tabular-nums">
                Aprovação: {data.periodSummary.approvalRate}%
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Novos clientes
                </span>
                <Users className="w-4 h-4 text-marinho shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-texto-principal tabular-nums mt-1.5 sm:mt-2">
                {data.periodSummary.newCustomersCount}
              </p>
              <p className="text-[11px] sm:text-xs text-texto-terciario mt-1">
                No período
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-medium text-texto-secundario">
                  Ticket médio
                </span>
                <TrendingUp className="w-4 h-4 text-turquesa-deep shrink-0" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-texto-principal tabular-nums mt-1.5 sm:mt-2 truncate">
                {formatCurrency(data.periodSummary.averageTicket)}
              </p>
              <p className="text-[11px] sm:text-xs text-turquesa-deep font-semibold mt-1 tabular-nums">
                ↑ {data.periodSummary.averageTicketDeltaPct.toFixed(1).replace(".", ",")}%
              </p>
            </div>
          </div>

          {/* Evolution Chart */}
          <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                  {chartMetric === "revenue"
                    ? "Faturamento por período"
                    : "Evolução das vendas"}
                </h2>
                <p className="text-xs text-texto-terciario mt-0.5">
                  Toque ou passe o cursor pelos pontos para ver os valores exatos.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-off-white border border-borda w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setChartMetric("revenue")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center whitespace-nowrap ${
                    chartMetric === "revenue"
                      ? "bg-white text-texto-principal shadow-sm"
                      : "text-texto-secundario hover:text-texto-principal"
                  }`}
                >
                  Faturamento (R$)
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric("salesCount")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center whitespace-nowrap ${
                    chartMetric === "salesCount"
                      ? "bg-white text-texto-principal shadow-sm"
                      : "text-texto-secundario hover:text-texto-principal"
                  }`}
                >
                  Qtd. de vendas
                </button>
              </div>
            </div>

            <RevenueChart
              data={data.revenueSeries}
              metric={chartMetric}
              height={240}
            />
          </div>

          {/* Bottom Split: Top Selling Table + Category Distribution */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 sm:gap-5">
            <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6">
              <h2 className="text-sm sm:text-base font-bold text-texto-principal mb-3.5 sm:mb-4">
                Produtos mais vendidos
              </h2>

              {/* Mobile ranking list */}
              <div className="md:hidden divide-y divide-borda border-t border-borda -mx-3.5 px-3.5">
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
                    <tr className="border-y border-borda text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
                      <th className="py-3 pr-3">Material</th>
                      <th className="py-3 px-3">Categoria</th>
                      <th className="py-3 px-3 text-right">Vendas</th>
                      <th className="py-3 pl-3 text-right">Faturamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borda">
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
            <div className="rounded-xl sm:rounded-2xl bg-white border border-borda p-3.5 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-texto-principal">
                  Desempenho por público
                </h2>
                <p className="text-xs text-texto-terciario mt-0.5">
                  Distribuição entre materiais para estudantes e planos de aula.
                </p>

                <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4">
                  <div className="rounded-xl bg-[#EEF8F6] border border-[#CFEAE5] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-turquesa-deep">
                        Material de estudo (Alunos)
                      </span>
                      <span className="text-xs font-bold text-texto-principal tabular-nums">
                        {categoryBreakdown.student.count} vendas
                      </span>
                    </div>
                    <p className="text-lg font-bold text-texto-principal tabular-nums mt-1.5">
                      {formatCurrency(categoryBreakdown.student.revenue)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F3F0FA] border border-[#E4DDF5] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5B4B9A]">
                        Plano de aula (Professores)
                      </span>
                      <span className="text-xs font-bold text-texto-principal tabular-nums">
                        {categoryBreakdown.teacher.count} vendas
                      </span>
                    </div>
                    <p className="text-lg font-bold text-texto-principal tabular-nums mt-1.5">
                      {formatCurrency(categoryBreakdown.teacher.revenue)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-texto-terciario leading-relaxed border-t border-borda pt-4">
                Todos os produtos são materiais digitais entregues automaticamente na área “Minha Conta” após confirmação do Mercado Pago.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
