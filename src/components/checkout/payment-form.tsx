'use client';

import { Material } from '@/types/material';
import { X } from 'lucide-react';
import { PixPayment } from '@/components/checkout/pix-payment';
import { useEffect, useId, useRef } from 'react';

interface PaymentFormProps {
    product: Material;
    onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

export function PaymentForm({ product, onClose }: PaymentFormProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        dialog?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            if (opener?.isConnected) opener.focus();
        };
    }, []);

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Escape') {
            e.stopPropagation();
            onClose();
            return;
        }

        if (e.key !== 'Tab' || !dialogRef.current) return;

        const focusable = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusable.length === 0) {
            e.preventDefault();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey && (active === first || active === dialogRef.current)) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                className="relative flex flex-col w-full max-w-lg max-h-[calc(100dvh-2rem)] bg-white rounded-2xl shadow-2xl focus:outline-none"
            >
                <button type="button" onClick={onClose} aria-label="Fechar"
                    className="absolute top-4 right-4 z-10 -m-[5px] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <X size={18} className="text-gray-600" />
                </button>

                <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl">
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div>
                                <h2 id={titleId} className="text-lg font-bold text-texto-principal">Finalizar compra</h2>
                                <p className="text-xs text-texto-terciario">
                                    {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>

                        <PixPayment product={product} />

                        <p className="text-legenda text-texto-terciario text-center mt-4 leading-relaxed">
                            Pagamento processado com segurança pelo Mercado Pago.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
