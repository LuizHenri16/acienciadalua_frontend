'use client';

import { createPixPayment, PixPaymentResponse } from '@/api/payment';
import { Material } from '@/types/material';
import { CheckCircle, Copy, Loader2, QrCode, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

interface PixPaymentProps {
    product: Material;
    onBack: () => void;
}

export function PixPayment({ product, onBack }: PixPaymentProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pixData, setPixData] = useState<PixPaymentResponse | null>(null);
    const [copied, setCopied] = useState(false);

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
            });

            setPixData(result);
        } catch (err: any) {
            setError(err.message || 'Erro ao gerar PIX. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = useCallback(async () => {
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
    }, [pixData?.qr_code]);

    if (pixData) {
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

                <div className="flex justify-center">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-borda">
                        <img
                            src={`data:image/png;base64,${pixData.qr_code_base64}`}
                            alt="QR Code PIX"
                            className="w-56 h-56"
                        />
                    </div>
                </div>

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
                            onClick={handleCopy}
                            className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-turquesa-dark text-white text-xs font-medium hover:opacity-90 transition-all active:scale-95"
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
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <p className="text-xs text-amber-700 leading-relaxed">
                        <strong>Atenção:</strong> O pagamento será confirmado automaticamente após o PIX ser processado. Enquanto isso, você pode fechar esta janela.
                    </p>
                </div>

                <Link
                    href={`/pagamento/sucesso?email=${encodeURIComponent(email)}`}
                    className="w-full squircle-border bg-turquesa-dark text-white font-bold py-4 text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
                >
                    Já paguei
                    <ArrowRight size={16} />
                </Link>
            </div>
        );
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-borda bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
            </div>

            <div>
                <label htmlFor="pix-name" className="block text-xs font-medium text-texto-secundario mb-1.5">
                    Nome completo
                </label>
                <input
                    id="pix-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como você se chama"
                    className="w-full px-4 py-3 rounded-xl border border-borda bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
            </div>

            <div>
                <label htmlFor="pix-cpf" className="block text-xs font-medium text-texto-secundario mb-1.5">
                    CPF
                </label>
                <input
                    id="pix-cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-4 py-3 rounded-xl border border-borda bg-gray-50 text-sm text-texto-principal placeholder:text-texto-terciario/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
            </div>

            {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    <span className="text-base leading-none mt-0.5">!</span>
                    <span>{error}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
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
