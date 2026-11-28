import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, BookOpen, MonitorPlay } from "lucide-react";
import { Material, MaterialType } from "@/types/material";
import { getMaterialFormat, getMaterialTypeLabel } from "@/lib/format/material";
import { uploadUrl } from "@/lib/api/client";
import { formatCurrency } from "@/lib/format/currency";

interface CardProps {
  material: Material;
  fullWidthMobile?: boolean;
}

export function ProductCard({ material, fullWidthMobile = false }: CardProps) {
  const isTeacher = material.category === MaterialType.TEACHER;
  const isFree = material.price <= 0;
  const format = getMaterialFormat(material);

  const coverUrl = uploadUrl(material.coverUrl);

  const badgeBg = isTeacher ? "bg-rosa-deep" : "bg-turquesa-deep";
  const fallbackBg = isTeacher
    ? "bg-linear-to-br from-[#FDEFF2] via-off-white to-[#FEF6E6]"
    : "bg-linear-to-br from-[#E7F6F4] via-off-white to-[#EAF3FA]";

  return (
    <div
      className={`group bg-white ${
        fullWidthMobile ? "border-y sm:border max-sm:rounded-none!" : "border"
      } border-borda squircle-border overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${coverUrl ? "bg-off-white" : fallbackBg}`}>
        <Link
          href={`/produto/${material.id}`}
          aria-label={material.title}
          className="absolute inset-0 block"
          tabIndex={-1}
        >
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
        </Link>
        <span
          className={`absolute top-3 left-3 z-10 text-white text-legenda font-black uppercase tracking-widest px-2.5 py-1 squircle-border-sm backdrop-blur-sm transition-colors ${badgeBg}`}
        >
          {format}
        </span>
        {isFree && (
          <span className="absolute top-3 right-3 z-10 bg-ouro text-marinho text-legenda font-black uppercase tracking-widest px-2.5 py-1 squircle-border-sm">
            Gratuito
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 p-5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-extrabold text-turquesa-deep tracking-tight tabular-nums">
            {formatCurrency(material.price)}
          </span>
          <span className={`text-xs font-semibold ${isTeacher ? "text-rosa-deep" : "text-turquesa-deep"}`}>
            {getMaterialTypeLabel(material.category)}
          </span>
        </div>

        <h3 className="text-[1rem] font-bold text-texto-principal leading-snug line-clamp-2 group-hover:text-turquesa-deep transition-colors">
          {material.title}
        </h3>

        {material.description && (
          <p className="text-xs text-texto-terciario leading-relaxed line-clamp-2">
            {material.description}
          </p>
        )}

        <Link
          href={`/produto/${material.id}`}
          className="bg-turquesa-deep text-white mt-auto flex items-center justify-center gap-2 hover:gap-3 w-full py-3.5 squircle-border font-bold text-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
        >
          Ver Detalhes
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
