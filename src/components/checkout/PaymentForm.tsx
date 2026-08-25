'use client';

import { processPayment, ProcessPaymentPayload } from '@/api/payment';
import { Material } from '@/types/material';
import { CreditCard, Loader2, QrCode, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PixPayment } from './PixPayment';

interface PaymentFormProps {
    product: Material;
    onClose: () => void;
}

type PaymentMethod = 'pix' | 'card';

const MP_SDK_URL = 'https://sdk.mercadopago.com/js/v2';

export function PaymentForm({ product, onClose }: PaymentFormProps) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const cardFormRef = useRef<MercadoPagoCardForm | null>(null);

    const [method, setMethod] = useState<PaymentMethod>('pix');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [formMounted, setFormMounted] = useState(false);

    const loadSdk = useCallback(() => {
        if (window.MercadoPago) {
            setSdkLoaded(true);
            return;
        }

        const existing = document.querySelector(`script[src="${MP_SDK_URL}"]`);
        if (existing) {
            existing.addEventListener('load', () => setSdkLoaded(true));
            return;
        }

        const script = document.createElement('script');
        script.src = MP_SDK_URL;
        script.async = true;
        script.onload = () => setSdkLoaded(true);
        script.onerror = () => setError('Erro ao carregar sistema de pagamento. Recarregue a página.');
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        loadSdk();
    }, [loadSdk]);

    useEffect(() => {
        if (!sdkLoaded || formMounted || method !== 'card') return;

        const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
        if (!publicKey) {
            setError('Chave pública do Mercado Pago não configurada.');
            return;
        }

        try {
            const mp = new window.MercadoPago(publicKey, { locale: 'pt_BR' });

            cardFormRef.current = mp.cardForm({
                amount: String(Number(product.price).toFixed(2)),
                iframe: true,
                form: {
                    id: 'form-checkout',
                    cardNumber: {
                        id: 'form-checkout__cardNumber',
                        placeholder: 'Número do cartão',
                    },
                    expirationDate: {
                        id: 'form-checkout__expirationDate',
                        placeholder: 'MM/YY',
                    },
                    securityCode: {
                        id: 'form-checkout__securityCode',
                        placeholder: 'CVC',
                    },
                    cardholderName: {
                        id: 'form-checkout__cardholderName',
                        placeholder: 'Nome no cartão',
                    },
                    identificationType: {
                        id: 'form-checkout__identificationType',
                    },
                    identificationNumber: {
                        id: 'form-checkout__identificationNumber',
                        placeholder: 'CPF',
                    },
                    installments: {
                        id: 'form-checkout__installments',
                    },
                },
                callbacks: {
                    onFormMounted: (error?: any) => {
                        if (error) {
                            console.warn('Erro ao montar formulário:', error);
                            setError('Erro ao carregar formulário de pagamento.');
                            return;
                        }
                        setFormMounted(true);
                    },
                    onSubmit: (event: Event) => {
                        event.preventDefault();
                        handleSubmitCardPayment();
                    },
                },
            });
        } catch (err) {
            console.error('Erro ao inicializar MP:', err);
            setError('Erro ao inicializar sistema de pagamento.');
        }
    }, [sdkLoaded, formMounted, method, product.price]);

    const formatCpf = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        return digits
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleSubmitCardPayment = async () => {
        if (!cardFormRef.current) return;

        setError('');
        setLoading(true);

        try {
            const cardData = cardFormRef.current.getCardFormData();

            const cleanCpf = cpf.replace(/\D/g, '');

            const payload: ProcessPaymentPayload = {
                token: cardData.token,
                payment_method_id: cardData.payment_method_id,
                installments: cardData.installments,
                issuer_id: cardData.issuer_id,
                productId: product.id,
                payer: {
                    email,
                    ...(name && { name }),
                    ...(cleanCpf.length === 11 && {
                        identification: {
                            type: 'CPF',
                            number: cleanCpf,
                        },
                    }),
                },
            };

            const result = await processPayment(payload);

            if (result.status === 'approved') {
                router.push('/pagamento/sucesso');
            } else if (result.status === 'pending') {
                router.push('/pagamento/pendente');
            } else {
                setError('Pagamento não aprovado. Verifique os dados e tente novamente.');
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Erro no pagamento:', err);
            setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
            setLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmitCardPayment();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
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

                    <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                        <button
                            type="button"
                            onClick={() => { setMethod('pix'); setError(''); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                method === 'pix'
                                    ? 'bg-white text-emerald-700 shadow-sm'
                                    : 'text-texto-terciario hover:text-texto-secundario'
                            }`}
                        >
                            <QrCode size={16} />
                            PIX
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMethod('card'); setError(''); setFormMounted(false); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                method === 'card'
                                    ? 'bg-white text-turquesa-dark shadow-sm'
                                    : 'text-texto-terciario hover:text-texto-secundario'
                            }`}
                        >
                            <CreditCard size={16} />
                            Cartão
                        </button>
                    </div>

                    {method === 'pix' ? (
                        <PixPayment
                            product={product}
                            onBack={() => setMethod('card')}
                        />
                    ) : (
                        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="payer-email" className="block text-xs font-medium text-texto-secundario mb-1.5">
                                    E-mail *
                                </label>
                                <input
                                    id="payer-email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-borda bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario/50 focus:outline-none focus:ring-2 focus:ring-turquesa-dark/30 focus:border-turquesa-dark transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="payer-name" className="block text-xs font-medium text-texto-secundario mb-1.5">
                                    Nome completo
                                </label>
                                <input
                                    id="payer-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Como aparece no cartão"
                                    className="w-full px-4 py-3 rounded-xl border border-borda bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario/50 focus:outline-none focus:ring-2 focus:ring-turquesa-dark/30 focus:border-turquesa-dark transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="payer-cpf" className="block text-xs font-medium text-texto-secundario mb-1.5">
                                    CPF
                                </label>
                                <input
                                    id="payer-cpf"
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                                    placeholder="000.000.000-00"
                                    maxLength={14}
                                    className="w-full px-4 py-3 rounded-xl border border-borda bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario/50 focus:outline-none focus:ring-2 focus:ring-turquesa-dark/30 focus:border-turquesa-dark transition-all"
                                />
                            </div>

                            <div className="border-t border-borda pt-4">
                                <label className="block text-xs font-medium text-texto-secundario mb-2">
                                    Dados do cartão
                                </label>

                                {!sdkLoaded && (
                                    <div className="flex items-center gap-2 py-8 text-sm text-texto-terciario">
                                        <Loader2 size={16} className="animate-spin" />
                                        Carregando formulário...
                                    </div>
                                )}

                                <div id="form-checkout" className="space-y-3">
                                    <div id="form-checkout__cardNumber" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <div id="form-checkout__expirationDate" />
                                        <div id="form-checkout__securityCode" />
                                    </div>
                                    <div id="form-checkout__cardholderName" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <div id="form-checkout__identificationType" />
                                        <div id="form-checkout__identificationNumber" />
                                    </div>
                                    <div id="form-checkout__installments" />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                                    <span className="text-base leading-none mt-0.5">!</span>
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !formMounted}
                                className="w-full flex items-center justify-center gap-2 bg-turquesa-dark hover:opacity-90 text-white font-bold py-4 text-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={18} />
                                        Pagar {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <p className="text-[11px] text-texto-terciario text-center mt-4 leading-relaxed">
                        Pagamento processado com segurança pelo Mercado Pago.
                        <br />
                        Seus dados são criptografados e nunca tocam nosso servidor.
                    </p>
                </div>
            </div>
        </div>
    );
}
