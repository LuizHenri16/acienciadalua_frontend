import { Material } from "@/types/material";
import { ArrowDownToLine } from "lucide-react";

interface PurchasedMaterialCardProps {
    material: Material;
    purchasedAt?: string;
    onDownload?: () => void;
}

export function PurchasedMaterialCard({
    material,
    purchasedAt,
    onDownload,
}: PurchasedMaterialCardProps) {
    const formattedDate = purchasedAt
        ? new Date(purchasedAt).toLocaleDateString("pt-BR")
        : "00/00/0000";

    return (
        <div className="flex items-center justify-between gap-3 bg-white border border-borda-med rounded-2xl p-3 shadow-sm">
            <div className="w-11 h-11 shrink-0 squircle-border bg-[#7c4dbe]" />

            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold text-texto-principal truncate">
                    {material.title}
                </span>
                <span className="text-xs text-texto-terciario">
                    Comprado em: {formattedDate}
                </span>
            </div>

            <button
                onClick={onDownload}
                className="flex items-center gap-1.5 squircle-border bg-turquesa-dark hover:opacity-90 text-white text-xs shadow-sm font-semibold px-3 py-2 cursor-pointer"
            >
                <ArrowDownToLine size={14} />
                PDF
            </button>
        </div>
    );
}
