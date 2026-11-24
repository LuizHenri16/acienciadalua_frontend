import {
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
  RotateCcw,
} from "lucide-react";
import type { PaymentMethodType, SaleStatus } from "@/types/admin";

const SALE_STATUS_CONFIG: Record<
  SaleStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    dot: string;
    Icon: typeof CheckCircle2;
  }
> = {
  approved: {
    label: "Aprovado",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200/80",
    dot: "bg-emerald-500",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pendente",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200/80",
    dot: "bg-amber-500",
    Icon: Clock,
  },
  rejected: {
    label: "Recusado",
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200/80",
    dot: "bg-red-500",
    Icon: XCircle,
  },
  cancelled: {
    label: "Cancelado",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
    Icon: Ban,
  },
  refunded: {
    label: "Reembolsado",
    bg: "bg-[#F3F0FA]",
    text: "text-[#5B4B9A]",
    border: "border-[#DED7F4]",
    dot: "bg-[#7C69C4]",
    Icon: RotateCcw,
  },
};

export function SaleStatusIndicator({ status }: { status: SaleStatus }) {
  const cfg = SALE_STATUS_CONFIG[status] ?? SALE_STATUS_CONFIG.pending;
  const Icon = cfg.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{cfg.label}</span>
    </span>
  );
}

export function getSaleStatusLabel(status: SaleStatus): string {
  return SALE_STATUS_CONFIG[status]?.label ?? status;
}

export function getPaymentMethodLabel(method: PaymentMethodType): string {
  switch (method) {
    case "pix":
      return "PIX";
    case "credit_card":
      return "Cartão de crédito";
    case "checkout_pro":
      return "Checkout Pro";
    default:
      return method;
  }
}
