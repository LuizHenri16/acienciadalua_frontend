'use client';

import { createPixPayment } from '@/lib/api/payments';
import { clearPaymentSession, savePaymentSession } from '@/lib/payment/session';
import { usePaymentStatus } from '@/hooks/use-payment-status';
import type { PixPaymentResponse } from '@/types/payment';
import { Material } from '@/types/material';
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle,
    Clock,
    Copy,
    Loader2,
    QrCode,
    RefreshCw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

interface PixPaymentProps {
    product: Material;
}

function newIdempotencyKey(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return `checkout-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function PixPayment({ product }: PixPaymentProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pixData, setPixData] = useState<PixPaymentResponse | null>(null);
    const [copied, setCopied] = useState(false);
    const idempotencyKeyRef = useRef<string | null>(null);

    function goToSuccess() {
        if (!pixData?.payment_id) return;
        router.push(`/pagamento/sucesso?payment_id=${encodeURIComponent(pixData.payment_id)}`);
    }

    const { view: statusView, checking, refresh } = usePaymentStatus({
        paymentId: pixData?.payment_id ?? null,
        token: pixData?.status_token ?? null,
        onApproved: goToSuccess,
    });

    const formatCpf = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        return digits
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!idempotencyKeyRef.current) {
            idempotencyKeyRef.current = newIdempotencyKey();
        }

        try {
            const result = await createPixPayment({
                productId: product.id,
                payer: {
                    email,
                    ...(name && { name }),
                    ...(cpf.replace(/\D/g, '').length === 11 && {
                        cpf: cpf.replace(/\D/g, ''),
                    }),
                },
                idempotencyKey: idempotencyKeyRef.current,
            });

            if (result.payment_id && result.status_token) {
                savePaymentSession(result.payment_id, {
                    token: result.status_token,
                    email,
                    productId: product.id,
                });
            }

            setPixData(result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro ao gerar PIX. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    async function handleCopy() {
        if (!pixData?.qr_code) return;

        try {
            await navigator.clipboard.writeText(pixData.qr_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = pixData.qr_code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    function resetPayment() {
        if (pixData?.payment_id) {
            clearPaymentSession(pixData.payment_id);
        }
        idempotencyKeyRef.current = null;
        setPixData(null);
        setCopied(false);
        setError('');
    }

    if (pixData) {
        const expiresAt = pixData.expires_at ? new Date(pixData.expires_at) : null;
        const validUntil =
            expiresAt && !Number.isNaN(expiresAt.getTime())
                ? expiresAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                : null;

        const terminal =
            statusView.state === 'result' &&
            ['rejected', 'expired', 'refunded'].includes(statusView.status.status);

        return (
            <div className="space-y-5">
                <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                        <QrCode size={28} className="text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-texto-principal">
                        Escaneie o QR Code
                    </h3>
                    <p className="text-sm text-texto-terciario">
                        Abra o app do seu banco e escaneie o código abaixo
                    </p>
                </div>

                {pixData.qr_code_base64 ? (
                    <div className="flex justify-center">
                        <div className="bg-white p-2 sm:p-3 rounded-2xl shadow-sm border border-borda w-full max-w-56">
                            {/* eslint-disable-next-line @next/next/no-img-element -- data URI base64 */}
                            <img
                                src={`data:image/png;base64,${pixData.qr_code_base64}`}
                                alt="QR Code PIX"
                                className="w-full h-auto aspect-square"
                            />
                        </div>
                    </div>
                ) : null}

                {pixData.qr_code ? (
                    <div className="space-y-2">
                        <p className="text-xs text-texto-terciario text-center">
                            Ou copie o código PIX abaixo
                        </p>
                        <div className="relative">
                            <div className="bg-gray-50 border border-borda rounded-xl p-3 max-h-20 overflow-y-auto">
                                <code className="text-xs text-texto-secundario break-all leading-relaxed select-all">
                                    {pixData.qr_code}
                                </code>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-turquesa-deep text-white text-xs font-medium hover:opacity-90 transition-all active:scale-95 after:absolute after:-inset-2 after:content-['']"
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle size={13} />
                                        Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={13} />
                                        Copiar
                                    </>
                                )}
                            </button>
                            <span className="sr-only" aria-live="polite">
                                {copied ? 'Copiado!' : ''}
                            </span>
                        </div>
                    </div>
                ) : null}

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <p className="text-xs text-amber-700 leading-relaxed">
                        <strong>Atenção:</strong> a confirmação é feita automaticamente após o
                        PIX ser processado.{' '}
                        {validUntil ? `Este QR Code é válido até ${validUntil}.` : ''}
                    </p>
                </div>

                {renderStatusNotice()}

                <button
                    type="button"
                    onClick={terminal ? resetPayment : refresh}
                    disabled={checking || (statusView.state === 'result' && statusView.status.status === 'approved')}
                    aria-busy={checking}
                    className="w-full squircle-border bg-turquesa-deep text-white font-bold py-4 text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    {checking ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Verificando...
                        </>
                    ) : terminal ? (
                        <>
                            <RefreshCw size={16} />
                            Gerar novo PIX
                        </>
                    ) : (
                        <>
                            Já paguei, verificar agora
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>

                {!terminal ? (
                    <button
                        type="button"
                        onClick={resetPayment}
                        className="w-full inline-flex items-center justify-center min-h-11 text-xs text-texto-terciario hover:text-texto-secundario transition-colors"
                    >
                        Gerar novo PIX
                    </button>
                ) : null}
            </div>
        );
    }

    function renderStatusNotice() {
        if (statusView.state === 'checking') {
            return (
                <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-2 rounded-xl border border-borda bg-gray-50 px-4 py-3 text-xs text-texto-secundario"
                >
                    <Loader2 size={16} className="mt-0.5 shrink-0 animate-spin" />
                    <span>Verificando o pagamento com o Mercado Pago...</span>
                </div>
            );
        }

        if (statusView.state === 'result') {
            const status = statusView.status;

            if (status.status === 'approved' && status.accessGranted) {
                return (
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700"
                    >
                        <CheckCircle size={16} className="mt-0.5 shrink-0" />
                        <span>Pagamento confirmado! Redirecionando para a sua confirmação...</span>
                    </div>
                );
            }

            if (status.status === 'pending') {
                return (
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700"
                    >
                        <Clock size={16} className="mt-0.5 shrink-0" />
                        <span>
                            Ainda não identificamos o pagamento. Se você já pagou, aguarde
                            alguns segundos e verifique novamente.
                        </span>
                    </div>
                );
            }

            if (status.status === 'approved') {
                return (
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700"
                    >
                        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                        <span>
                            O pagamento foi aprovado, mas o acesso ainda não foi liberado.
                            Tente novamente em alguns instantes.
                        </span>
                    </div>
                );
            }

            if (status.status === 'rejected') {
                return (
                    <div
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                    >
                        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                        <span>
                            O pagamento não foi aprovado. Nenhum acesso foi liberado; gere um
                            novo PIX para tentar novamente.
                        </span>
                    </div>
                );
            }

            if (status.status === 'expired') {
                return (
                    <div
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                    >
                        <Clock size={16} className="mt-0.5 shrink-0" />
                        <span>Este QR Code expirou. Gere um novo PIX para concluir a compra.</span>
                    </div>
                );
            }

            if (status.status === 'refunded') {
                return (
                    <div
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                    >
                        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                        <span>
                            Este pagamento foi estornado ou contestado. Se precisar de ajuda,
                            fale com o suporte.
                        </span>
                    </div>
                );
            }

            return (
                <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                >
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>Não foi possível confirmar o pagamento. Nenhum acesso foi liberado.</span>
                </div>
            );
        }

        if (statusView.state === 'unauthorized') {
            return (
                <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                >
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>
                        Não foi possível validar este pagamento nesta sessão. Gere um novo PIX ou
                        acesse sua conta se já pagou.
                    </span>
                </div>
            );
        }

        if (statusView.state === 'not_found') {
            return (
                <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                >
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>Pagamento não encontrado no Mercado Pago. Gere um novo PIX.</span>
                </div>
            );
        }

        if (statusView.state === 'unavailable') {
            return (
                <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700"
                >
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>{statusView.message}</span>
                </div>
            );
        }

        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-1 mb-2">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                    <QrCode size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-texto-principal">Pagar com PIX</h3>
                <p className="text-sm text-texto-terciario">
                    Após preencher, um QR Code será gerado
                </p>
            </div>

            <div>
                <label htmlFor="pix-email" className="block text-xs font-medium text-texto-secundario mb-1.5">
                    E-mail *
                </label>
                <input
                    id="pix-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "pix-form-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl border border-borda-forte bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario focus:border-emerald-500 transition-all"
                />
            </div>

            <div>
                <label htmlFor="pix-name" className="block text-xs font-medium text-texto-secundario mb-1.5">
                    Nome completo
                </label>
                <input
                    id="pix-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como você se chama"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "pix-form-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl border border-borda-forte bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario focus:border-emerald-500 transition-all"
                />
            </div>

            <div>
                <label htmlFor="pix-cpf" className="block text-xs font-medium text-texto-secundario mb-1.5">
                    CPF
                </label>
                <input
                    id="pix-cpf"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={cpf}
                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "pix-form-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl border border-borda-forte bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario focus:border-emerald-500 transition-all"
                />
            </div>

            {error && (
                <div id="pix-form-error" role="alert" className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    <span className="text-base leading-none mt-0.5">!</span>
                    <span>{error}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full flex items-center justify-center cursor-pointer gap-2 bg-turquesa-deep hover:opacity-90 text-white font-bold py-4 text-sm squircle-border transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Gerando QR Code...
                    </>
                ) : (
                    <>
                        <QrCode size={18} />
                        Gerar QR Code PIX
                    </>
                )}
            </button>
        </form>
    );
}
