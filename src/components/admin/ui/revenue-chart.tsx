"use client";

import { useId, useMemo, useState } from "react";
import type { RevenueSeriesPoint } from "@/types/admin";
import { formatCurrency } from "@/lib/format/currency";

interface RevenueChartProps {
  data: RevenueSeriesPoint[];
  metric?: "revenue" | "salesCount";
  height?: number;
  variant?: "light" | "dark";
}

function buildSmoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return path;
}

export function RevenueChart({
  data,
  metric = "revenue",
  height = 230,
  variant = "light",
}: RevenueChartProps) {
  const gradientId = useId();
  const strokeGradientId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isDark = variant === "dark";

  const width = 680;
  const padTop = 18;
  const padRight = 14;
  const padBottom = 30;
  const padLeft = 52;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  const { maxVal, yTicks, points, linePath, areaPath, xTickIndices } =
    useMemo(() => {
      const values = data.map((d) =>
        metric === "revenue" ? d.revenue : d.salesCount
      );
      const rawMax = Math.max(...values, 1);
      const step =
        metric === "revenue"
          ? Math.max(10, Math.ceil(rawMax / 4 / 10) * 10)
          : Math.max(1, Math.ceil(rawMax / 4));
      const computedMax = step * 4;

      const ticks = [0, step, step * 2, step * 3, computedMax];

      const pts = data.map((item, idx) => {
        const val = metric === "revenue" ? item.revenue : item.salesCount;
        const x =
          data.length === 1
            ? padLeft + plotWidth / 2
            : padLeft + (idx / (data.length - 1)) * plotWidth;
        const clampedVal = Math.max(0, Math.min(val, computedMax));
        const y = padTop + plotHeight - (clampedVal / computedMax) * plotHeight;
        return { x, y, val, item };
      });

      const line = buildSmoothPath(pts);
      const bottomY = padTop + plotHeight;
      const area =
        pts.length > 0
          ? `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${bottomY.toFixed(2)} L ${pts[0].x.toFixed(2)} ${bottomY.toFixed(2)} Z`
          : "";

      const maxXTicks = 8;
      const xStep = Math.max(1, Math.ceil(data.length / maxXTicks));
      const indices: number[] = [];
      for (let i = 0; i < data.length; i += xStep) {
        indices.push(i);
      }

      return {
        maxVal: computedMax,
        yTicks: ticks,
        points: pts,
        linePath: line,
        areaPath: area,
        xTickIndices: indices,
      };
    }, [data, metric, plotHeight, plotWidth]);

  if (data.length === 0) {
    return (
      <div
        className={`h-[220px] flex items-center justify-center text-sm ${
          isDark ? "text-white/65" : "text-texto-terciario"
        }`}
      >
        Sem registros para o período selecionado.
      </div>
    );
  }

  const activePoint =
    activeIndex !== null && points[activeIndex] ? points[activeIndex] : null;

  return (
    <div
      className="relative w-full select-none"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label={
          metric === "revenue"
            ? "Gráfico de evolução do faturamento"
            : "Gráfico de evolução de vendas"
        }
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? "#F5A623" : "#2C9E95"}
              stopOpacity={isDark ? "0.34" : "0.22"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#6DD5CA" : "#2C9E95"}
              stopOpacity="0.01"
            />
          </linearGradient>
          <linearGradient id={strokeGradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={isDark ? "#FAD07A" : "#1F7A73"} />
            <stop offset="55%" stopColor={isDark ? "#F5A623" : "#1F7A73"} />
            <stop offset="100%" stopColor={isDark ? "#6DD5CA" : "#2C9E95"} />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines & Y labels */}
        {yTicks.map((tick) => {
          const y = padTop + plotHeight - (tick / maxVal) * plotHeight;
          const label =
            metric === "revenue"
              ? `R$ ${Math.round(tick).toLocaleString("pt-BR")}`
              : `${tick}`;
          return (
            <g key={tick}>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(43, 45, 91, 0.08)"}
                strokeWidth="1"
              />
              <text
                x={padLeft - 10}
                y={y + 4}
                textAnchor="end"
                className={`${
                  isDark ? "fill-white/60" : "fill-[#6868A0]"
                } text-[11px] tabular-nums`}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Curve stroke */}
        <path
          d={linePath}
          fill="none"
          stroke={`url(#${strokeGradientId})`}
          strokeWidth={isDark ? "2.75" : "2.25"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X axis labels */}
        {xTickIndices.map((idx) => {
          const pt = points[idx];
          if (!pt) return null;
          return (
            <text
              key={pt.item.date + idx}
              x={pt.x}
              y={height - 6}
              textAnchor="middle"
              className={`${
                isDark ? "fill-white/60" : "fill-[#6868A0]"
              } text-[11px] tabular-nums`}
            >
              {pt.item.label}
            </text>
          );
        })}

        {/* Hover vertical hairline & dot */}
        {activePoint && (
          <g>
            <line
              x1={activePoint.x}
              y1={padTop}
              x2={activePoint.x}
              y2={padTop + plotHeight}
              stroke={isDark ? "#FAD07A" : "#1F7A73"}
              strokeOpacity={isDark ? "0.45" : "0.28"}
              strokeDasharray="3 3"
              strokeWidth="1.25"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="5.5"
              fill={isDark ? "#1e1b4b" : "#FFFFFF"}
              stroke={isDark ? "#F5A623" : "#1F7A73"}
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Invisible hit targets for crisp hover & keyboard access */}
        {points.map((pt, idx) => {
          const sliceWidth = plotWidth / Math.max(1, points.length);
          return (
            <rect
              key={pt.item.date + "-hit"}
              x={pt.x - sliceWidth / 2}
              y={padTop}
              width={sliceWidth}
              height={plotHeight}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              tabIndex={0}
              aria-label={`${pt.item.label}: ${
                metric === "revenue"
                  ? formatCurrency(pt.item.revenue)
                  : `${pt.item.salesCount} vendas`
              }`}
            />
          );
        })}
      </svg>

      {activePoint && (
        <div
          className={`pointer-events-none absolute top-1 z-10 rounded-2xl px-3.5 py-2 text-xs shadow-xl whitespace-nowrap ${
            isDark
              ? "bg-white text-marinho"
              : "bg-texto-principal text-white"
          }`}
          style={{
            left: `min(calc(100% - 160px), max(8px, ${(activePoint.x / width) * 100}% - 70px))`,
          }}
        >
          <p
            className={`text-[11px] tabular-nums ${
              isDark ? "text-texto-secundario" : "text-white/70"
            }`}
          >
            {activePoint.item.label}
          </p>
          <p className="font-bold tabular-nums mt-0.5">
            {formatCurrency(activePoint.item.revenue)}
          </p>
          <p
            className={`text-[11px] font-semibold tabular-nums ${
              isDark ? "text-turquesa-deep" : "text-turquesa-light"
            }`}
          >
            {activePoint.item.salesCount}{" "}
            {activePoint.item.salesCount === 1 ? "venda" : "vendas"}
          </p>
        </div>
      )}
    </div>
  );
}
