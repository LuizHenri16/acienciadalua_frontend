import { MaterialDetails } from "@/types/material";
import { ArrowDownToLine } from "lucide-react";

interface PurchasedMaterialCardProps {
    material: MaterialDetails;
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
        <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-2xl px-3 py-2 shadow-sm">
            <div className="w-11 h-11 shrink-0 squircle-border bg-[#7c4dbe]" />

            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold text-[#171717] truncate">
                    {material.name}
                </span>
                <span className="text-xs text-[#9e9e9e]">
                    Comprado em: {formattedDate}
                </span>
            </div>

            <button
                onClick={onDownload}
                className="flex items-center gap-1.5 shrink-0 squircle-border bg-[#68B999] hover:bg-[#3D6B5C] transition-colors text-white text-xs shadow-sm font-semibold px-3 py-2 cursor-pointer"
            >
                <ArrowDownToLine size={14} />
                PDF
            </button>
        </div>
    );
}
