'use client';

import { Material, MaterialType, getMaterialTypeLabel } from "@/types/material";
import { CreditCard, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import Image from "next/image";

interface ProductDetailsProps {
    product: Material;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ProductDetails({ product }: ProductDetailsProps) {
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const isTeacher = product.category === MaterialType.TEACHER;
    const label = getMaterialTypeLabel(product.category);
    const coverUrl = product.coverUrl
        ? `${API_URL}/uploads/${product.coverUrl}`
        : null;

    return (
        <>
            <main className="flex-1 flex flex-col lg:flex-row animate-in fade-in duration-700">
                <div className="relative lg:w-1/2 xl:w-[35%] h-82 sm:h-96 lg:h-[650px] bg-marinho rounded-r-[2rem] shrink-0 overflow-hidden hover:scale-[1.01] hover:shadow-lg transition-transform">
                    {coverUrl ? (
                        <Image
                            src={coverUrl}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white/10 text-8xl font-black">#{product.id}</span>
                        </div>
                    )}
                    <div className="hidden lg:block absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white/5 to-transparent pointer-events-none" />
                </div>
                <div className="flex-1 flex flex-col justify-center px-8 py-10 lg:px-14 xl:px-20 overflow-y-auto">
                    <div className="max-w-xl w-full mx-auto lg:mx-0 space-y-10">
                        <div className="space-y-4">
                            <p className={`inline-block px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest squircle-border ${isTeacher ? "bg-rosa-rose text-white" : "bg-turquesa-light text-petroleo"}`}>
                                {label}
                            </p>
                            <h1 className="text-3xl xl:text-4xl font-bold text-texto-principal leading-tight">
                                {product.title}
                            </h1>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs text-texto-terciario uppercase tracking-widest">Preço</span>
                                <p className="text-5xl font-bold mt-1 text-turquesa-dark">
                                    {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowPaymentForm(true)}
                                className="w-full squircle-border flex items-center justify-center gap-3 bg-turquesa-dark hover:opacity-90 text-white font-bold py-5 text-base transition-all shadow-md cursor-pointer active:scale-[0.98]"
                            >
                                <CreditCard size={22} strokeWidth={2.5} />
                                Comprar agora
                            </button>

                            <div className="flex items-center justify-center gap-6 pt-1">
                                <div className="flex items-center gap-1.5 text-texto-terciario text-[12px]">
                                    <Shield size={13} className="opacity-60" />
                                    <span>Pagamento seguro</span>
                                </div>
                                <div className="h-3 w-px bg-borda" />
                                <div className="flex items-center gap-1.5 text-texto-terciario text-[12px]">
                                    <Zap size={13} className="opacity-60" />
                                    <span>Acesso imediato</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-borda w-full" />
                        <div className="space-y-3">
                            <h2 className="text-base font-bold text-texto-principal">
                                Sobre este material
                            </h2>
                            <p className="text-texto-secundario text-[0.95rem] leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                    </div>
                </div>
            </main>

            {showPaymentForm && (
                <PaymentForm
                    product={product}
                    onClose={() => setShowPaymentForm(false)}
                />
            )}
        </>
    );
}
