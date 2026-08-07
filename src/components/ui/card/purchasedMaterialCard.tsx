import { Material, MaterialType, getMaterialTypeLabel, getMaterialFormat } from "@/types/material";
import { ArrowDownToLine, BookOpen, MonitorPlay } from "lucide-react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PurchasedMaterialCardProps {
    material: Material;
}

export function PurchasedMaterialCard({ material }: PurchasedMaterialCardProps) {
    const isTeacher = material.category === MaterialType.TEACHER;

    const accentColor = isTeacher ? "bg-rosa-rose" : "bg-turquesa-dark";
    const badgeBg = isTeacher ? "bg-rosa-rose/10 text-rosa-rose" : "bg-turquesa-dark/10 text-turquesa-dark";
    const thumbBg = isTeacher ? "bg-rosa-rose/15" : "bg-turquesa-dark/15";

    const formattedDate = material.purchasedAt
        ? new Date(material.purchasedAt).toLocaleDateString("pt-BR")
        : "—";

    const coverUrl = material.coverUrl
        ? `${API_URL}/uploads/${material.coverUrl}`
        : null;

    const fileUrl = material.fileUrl
        ? `${API_URL}/uploads/${material.fileUrl}`
        : null;

    return (
        <div className="group flex items-stretch bg-white border border-borda-med rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-turquesa-dark/20">
            <div className={`w-1.5 shrink-0 ${accentColor}`} />

            <div className="flex items-center gap-4 flex-1 p-4">
                <div className={`w-14 h-14 shrink-0 squircle-border overflow-hidden relative flex items-center justify-center ${thumbBg}`}>
                    {coverUrl ? (
                        <Image src={coverUrl} alt={material.title} fill className="object-cover" sizes="56px" />
                    ) : (
                        isTeacher ? (
                            <MonitorPlay className="w-6 h-6 text-rosa-rose" />
                        ) : (
                            <BookOpen className="w-6 h-6 text-turquesa-dark" />
                        )
                    )}
                </div>

                <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <span className="text-sm font-bold text-texto-principal truncate group-hover:text-turquesa-dark transition-colors">
                        {material.title}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`text-[0.6rem] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${badgeBg}`}>
                            {getMaterialTypeLabel(material.category)}
                        </span>
                        <span className="text-xs text-texto-terciario">
                            {formattedDate}
                        </span>
                    </div>
                </div>

                {fileUrl && (
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex items-center gap-1.5 squircle-border bg-turquesa-dark hover:bg-turquesa-dark/90 text-white text-xs shadow-sm font-semibold px-3 py-2.5 cursor-pointer transition-all active:scale-95 shrink-0"
                    >
                        <ArrowDownToLine size={14} />
                        {getMaterialFormat(material)}
                    </a>
                )}
            </div>
        </div>
    );
}
