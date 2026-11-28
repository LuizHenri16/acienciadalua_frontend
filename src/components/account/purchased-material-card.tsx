'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, BookOpen, ExternalLink, Loader2, MonitorPlay } from "lucide-react";
import { Material, MaterialType } from "@/types/material";
import { getMaterialTypeLabel, getMaterialFormat } from "@/lib/format/material";
import { downloadPurchase } from "@/lib/api/customers";
import { uploadUrl } from "@/lib/api/client";
import { getCustomerToken } from "@/lib/auth/cookies";

interface PurchasedMaterialCardProps {
  material: Material;
}

export function PurchasedMaterialCard({ material }: PurchasedMaterialCardProps) {
  const isTeacher = material.category === MaterialType.TEACHER;
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const blob = await downloadPurchase(material.id, getCustomerToken());
      const ext = material.fileUrl?.split(".").pop() ?? "";
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = ext ? `${material.title}.${ext}` : material.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  }

  const format = getMaterialFormat(material);
  const badgeBg = isTeacher ? "bg-rosa-deep" : "bg-turquesa-deep";
  const fallbackBg = isTeacher
    ? "bg-linear-to-br from-[#FDEFF2] via-off-white to-[#FEF6E6]"
    : "bg-linear-to-br from-[#E7F6F4] via-off-white to-[#EAF3FA]";

  const formattedDate = material.purchasedAt
    ? new Date(material.purchasedAt).toLocaleDateString("pt-BR")
    : "—";

  const coverUrl = uploadUrl(material.coverUrl);
  const fileUrl = uploadUrl(material.fileUrl);
  const hasPublicPage = !material.id.startsWith("demo-");

  return (
    <article className="group bg-white border border-borda squircle-border overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full">
      <div className={`relative aspect-[4/3] overflow-hidden ${coverUrl ? "bg-off-white" : fallbackBg}`}>
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={material.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div
              className={`w-14 h-14 squircle-border-sm flex items-center justify-center ${
                isTeacher
                  ? "bg-rosa-rose/15 text-rosa-deep"
                  : "bg-turquesa-dark/15 text-turquesa-deep"
              }`}
            >
              {isTeacher ? (
                <MonitorPlay className="w-7 h-7" aria-hidden="true" />
              ) : (
                <BookOpen className="w-7 h-7" aria-hidden="true" />
              )}
            </div>
            <span className="text-xs font-semibold text-texto-secundario max-w-[18ch] line-clamp-1">
              {getMaterialTypeLabel(material.category)}
            </span>
          </div>
        )}

        <span
          className={`absolute top-3 left-3 z-10 text-white text-legenda font-black uppercase tracking-widest px-2.5 py-1 squircle-border-sm backdrop-blur-sm ${badgeBg}`}
        >
          {format}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 p-5 flex-1">
        <div className="flex items-center gap-1.5 text-xs text-texto-terciario">
          <span className={`font-semibold ${isTeacher ? "text-rosa-deep" : "text-turquesa-deep"}`}>
            {getMaterialTypeLabel(material.category)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{formattedDate}</span>
        </div>

        <h3 className="text-[1rem] font-bold text-texto-principal leading-snug line-clamp-2 group-hover:text-turquesa-deep transition-colors">
          {material.title}
        </h3>

        {material.description && (
          <p className="text-xs text-texto-terciario leading-relaxed line-clamp-2">
            {material.description}
          </p>
        )}

        <div className="mt-auto pt-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {fileUrl && (
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-turquesa-deep hover:bg-turquesa-deep/90 text-white py-3.5 px-4 squircle-border font-bold text-sm transition-all duration-300 cursor-pointer active:scale-[0.97] disabled:opacity-60 disabled:cursor-wait whitespace-nowrap"
              >
                {downloading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                    <span>Baixando...</span>
                  </>
                ) : (
                  <>
                    <ArrowDownToLine size={15} aria-hidden="true" />
                    <span>Baixar {format}</span>
                  </>
                )}
              </button>
            )}

            {hasPublicPage && (
              <Link
                href={`/produto/${material.id}`}
                aria-label={`Ver página de ${material.title}`}
                title="Ver detalhes na vitrine"
                className="inline-flex items-center justify-center w-12 h-12 squircle-border border border-borda bg-off-white/70 text-texto-secundario hover:text-turquesa-deep hover:border-turquesa-dark/40 transition-colors shrink-0"
              >
                <ExternalLink size={16} aria-hidden="true" />
              </Link>
            )}
          </div>

          {downloadError && (
            <p role="alert" className="text-legenda text-coral-dark font-medium text-center">
              Não foi possível baixar agora. Tente novamente.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
