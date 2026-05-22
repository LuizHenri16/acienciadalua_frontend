import { Material } from "@/types/material";
import { ArrowDownToLine } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PurchasedMaterialCardProps {
    material: Material;
}

export function PurchasedMaterialCard({ material }: PurchasedMaterialCardProps) {
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
        <div className="flex items-center justify-between gap-3 bg-white border border-borda-med rounded-2xl p-3 shadow-sm">
            <div className="w-11 h-11 shrink-0 squircle-border bg-[#7c4dbe] overflow-hidden">
                {coverUrl && (
                    <img src={coverUrl} alt={material.title} className="w-full h-full object-cover" />
                )}
            </div>

            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold text-texto-principal truncate">
                    {material.title}
                </span>
                <span className="text-xs text-texto-terciario">
                    Comprado em: {formattedDate}
                </span>
            </div>

            {fileUrl && (
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-1.5 squircle-border bg-turquesa-dark hover:opacity-90 text-white text-xs shadow-sm font-semibold px-3 py-2 cursor-pointer"
                >
                    <ArrowDownToLine size={14} />
                    PDF
                </a>
            )}
        </div>
    );
}
