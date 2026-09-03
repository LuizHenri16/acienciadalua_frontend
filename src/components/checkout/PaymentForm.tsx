'use client';

import { Material } from '@/types/material';
import { X } from 'lucide-react';
import { PixPayment } from './PixPayment';

interface PaymentFormProps {
    product: Material;
    onClose: () => void;
}

export function PaymentForm({ product, onClose }: PaymentFormProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                <button onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <X size={18} className="text-gray-600" />
                </button>

                <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-5">
                        <div>
                            <h2 className="text-lg font-bold text-texto-principal">Finalizar compra</h2>
                            <p className="text-xs text-texto-terciario">
                                {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                        </div>
                    </div>

                    <PixPayment product={product} onBack={onClose} />

                    <p className="text-[11px] text-texto-terciario text-center mt-4 leading-relaxed">
                        Pagamento processado com segurança pelo Mercado Pago.
                    </p>
                </div>
            </div>
        </div>
    );
}
