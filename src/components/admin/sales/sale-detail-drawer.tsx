"use client";

import { useEffect } from "react";
import { X, CheckCircle2, Clock, CreditCard, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { AdminSale } from "@/types/admin";
import { formatCurrency } from "@/lib/format/currency";
import { formatFullDateTime, getInitials } from "@/lib/format/date";
import { getMaterialTypeLabel } from "@/lib/format/material";
import {
  getPaymentMethodLabel,
  SaleStatusIndicator,
} from "@/components/admin/ui/status-badge";

interface SaleDetailDrawerProps {
  sale: AdminSale | null;
  onClose: () => void;
}

export function SaleDetailDrawer({ sale, onClose }: SaleDetailDrawerProps) {
  useEffect(() => {
    if (!sale) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sale, onClose]);

  if (!sale) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-marinho/35 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sale-detail-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white border-l border-marinho/[0.08] shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-marinho/[0.07] sticky top-0 bg-white z-10">
            <div>
              <p className="text-xs font-medium text-texto-terciario">
                Detalhes da venda
              </p>
              <h2
                id="sale-detail-title"
                className="text-base font-bold text-texto-principal tabular-nums mt-0.5"
              >
                {sale.externalPaymentId}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes da venda"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-texto-terciario hover:text-texto-principal hover:bg-[#F5F4F0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 sm:p-6 flex flex-col gap-5 sm:gap-6">
            {/* Value & status */}
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-marinho/[0.07]">
              <div>
                <p className="text-xs text-texto-secundario">Valor total</p>
                <p className="text-2xl font-bold text-texto-principal tabular-nums mt-1">
                  {formatCurrency(sale.amount)}
                </p>
              </div>
              <SaleStatusIndicator status={sale.status} />
            </div>

            {/* Customer */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-texto-terciario">
                Cliente
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E7F6F4] text-turquesa-deep font-bold text-xs flex items-center justify-center shrink-0">
                  {getInitials(sale.customerName)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-texto-principal truncate">
                    {sale.customerName}
                  </p>
                  <p className="text-xs text-texto-secundario truncate">
                    {sale.customerEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-1.5 pt-4 border-t border-marinho/[0.07]">
              <p className="text-xs font-semibold text-texto-terciario">
                Material adquirido
              </p>
              <p className="text-sm font-bold text-texto-principal">
                {sale.productTitle}
              </p>
              <p className="text-xs text-texto-secundario">
                {getMaterialTypeLabel(sale.productCategory)}
              </p>
            </div>

            {/* Payment details */}
            <div className="flex flex-col gap-3 pt-4 border-t border-marinho/[0.07]">
              <p className="text-xs font-semibold text-texto-terciario">
                Pagamento e liberação
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-texto-secundario flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-texto-terciario" />
                  Meio de pagamento
                </span>
                <span className="font-semibold text-texto-principal">
                  {getPaymentMethodLabel(sale.paymentMethod)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-texto-secundario flex items-center gap-2">
                  <Clock className="w-4 h-4 text-texto-terciario" />
                  Data do pedido
                </span>
                <span className="font-medium text-texto-principal tabular-nums text-xs">
                  {formatFullDateTime(sale.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-texto-secundario flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-texto-terciario" />
                  Acesso ao material
                </span>
                {sale.accessGranted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Liberado na conta
                  </span>
                ) : (
                  <span className="text-xs font-medium text-texto-terciario">
                    Não liberado
                  </span>
                )}
              </div>

              {sale.statusDetail && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-texto-secundario">Detalhe Mercado Pago</span>
                  <span className="font-mono text-xs text-texto-secundario">
                    {sale.statusDetail}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-marinho/[0.07] bg-[#F5F4F0]/75 flex items-center justify-between gap-3">
          <Link
            href={`/painel/produto/${sale.productId}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-turquesa-deep hover:underline"
          >
            <span>Abrir produto no painel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full painel-control text-xs font-bold hover:bg-[#F5F4F0] cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
