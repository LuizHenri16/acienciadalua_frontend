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
            <main className="flex-1 flex flex-col lg:flex-row animate-in fade-in duration-700 mb-10 py-6 ">
                <div className="relative lg:w-1/2 xl:w-[35%] h-82 sm:h-96 lg:h-140 bg-marinho rounded-r-4xl shrink-0 overflow-hidden">
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
                <div className="flex-1 flex flex-col justify-center px-8 lg:px-14 xl:px-20 overflow-y-auto">
                    <div className="max-w-xl w-full mx-auto lg:mx-0 space-y-10">
                        <div className="space-y-4 border-b border-borda py-5">
                            <p className={`inline-block px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest squircle-border ${isTeacher ? "bg-rosa-rose text-white" : "bg-turquesa-light text-petroleo"}`}>
                                {label}
                            </p>
                            <h1 className="text-3xl xl:text-4xl font-bold text-texto-principal leading-tight">
                                {product.title}
                            </h1>
                        </div>
                        <div className="space-y-4">
                            <p className="text-5xl font-bold mt-1 text-turquesa-dark">
                                {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </p>
                            <button onClick={() => setShowPaymentForm(true)}
                                    className="w-full squircle-border flex items-center justify-center gap-3 bg-turquesa-dark hover:opacity-90 text-white font-semibold py-4 text-md transition-all shadow-md cursor-pointer active:scale-[0.98]">
                                <CreditCard size={26} strokeWidth={2.5} />
                                Comprar agora
                            </button>

                            <div className="flex items-center justify-center gap-8 p-4 mt-10 border-t border-borda text-xs md:text-md ">
                                <div className="flex items-center gap-1.5 text-texto-terciario">
                                    <Shield size={18} className="opacity-60" />
                                    Pagamento seguro
                                </div>
                                <div className="flex items-center gap-1.5 text-texto-terciario text-xs md:text-md">
                                    <Zap size={18} className="opacity-60" />
                                    Acesso imediato
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 py-6 px-4 border border-borda squircle-border">
                            <h2 className="text-base font-bold text-texto-principal">
                                Sobre este material
                            </h2>
                            <p className="text-texto-secundario text-sm leading-relaxed">
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
