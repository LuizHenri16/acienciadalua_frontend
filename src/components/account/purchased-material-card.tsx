'use client';

import { useState } from "react";
import { Material, MaterialType } from "@/types/material";
import { getMaterialTypeLabel, getMaterialFormat } from "@/lib/format/material";
import { ArrowDownToLine, BookOpen, MonitorPlay } from "lucide-react";
import Image from "next/image";
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

    const accentColor = isTeacher ? "bg-rosa-rose" : "bg-turquesa-dark";
    const badgeBg = isTeacher ? "bg-rosa-rose/10 text-rosa-deep" : "bg-turquesa-dark/10 text-turquesa-deep";
    const thumbBg = isTeacher ? "bg-rosa-rose/15" : "bg-turquesa-dark/15";

    const formattedDate = material.purchasedAt
        ? new Date(material.purchasedAt).toLocaleDateString("pt-BR")
        : "—";

    const coverUrl = uploadUrl(material.coverUrl);

    const fileUrl = uploadUrl(material.fileUrl);

    return (
        <div className="group flex items-stretch bg-white border border-borda-med rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-turquesa-dark/20">
            <div className={`w-1.5 shrink-0 ${accentColor}`} />

            <div className="flex items-center gap-4 flex-1 p-3 sm:p-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 squircle-border overflow-hidden relative flex items-center justify-center ${thumbBg}`}>
                    {coverUrl ? (
                        <Image src={coverUrl} alt={material.title} fill className="object-cover" sizes="(max-width: 640px) 48px, 56px" />
                    ) : (
                        isTeacher ? (
                            <MonitorPlay className="w-6 h-6 text-rosa-rose" />
                        ) : (
                            <BookOpen className="w-6 h-6 text-turquesa-dark" />
                        )
                    )}
                </div>

                <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <span className="text-sm font-bold text-texto-principal line-clamp-2 group-hover:text-turquesa-deep transition-colors">
                        {material.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className={`text-legenda font-semibold uppercase tracking-wider px-1.5 py-0 rounded-md ${badgeBg}`}>
                            {getMaterialTypeLabel(material.category)}
                        </span>
                        <span className="text-xs text-texto-terciario">
                            {formattedDate}
                        </span>
                    </div>
                </div>

                {fileUrl && (
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center gap-1.5 squircle-border bg-turquesa-deep hover:bg-turquesa-deep/90 text-white text-xs shadow-sm font-semibold px-3 py-2.5 cursor-pointer transition-all active:scale-95 shrink-0 disabled:opacity-60 disabled:cursor-wait"
                    >
                        <ArrowDownToLine size={14} />
                        {downloading ? "Baixando..." : getMaterialFormat(material)}
                    </button>
                )}
                {downloadError && (
                    <span className="text-legenda text-coral-dark font-medium text-right shrink-0">
                        Erro ao baixar. Tente novamente.
                    </span>
                )}
            </div>
        </div>
    );
}
