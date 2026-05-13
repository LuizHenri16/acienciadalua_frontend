import { Material } from "@/types/material";
import { ShoppingCart } from "lucide-react";

interface ProductDetailsProps {
    product: Material;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <main className="animate-in fade-in duration-700 slide-in-from-bottom-2">
            <div className="w-full h-64 md:h-96 bg-[#8a44d6] flex items-center justify-center">
                <span className="text-white/20 text-6xl font-black">#{product.id}</span>
            </div>

            <div className="p-7 flex flex-col gap-8">
                <div>
                    <h1 className="text-[1.75rem] font-bold text-[#171717] leading-tight mb-1">
                        {product.name}
                    </h1>
                    <p className={`p-0.5 text-[0.6rem] md:text-xs font-normal text-center uppercase squircle-border ${product.type === "Plano de aula" ? "bg-ouro-light text-[#7A5200] w-24 md:w-30" : "bg-turquesa-light text-petroleo w-34 md:w-38"} `}>
                        {product.type}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Valor</span>
                            <span className="text-4xl font-bold text-marinho">
                                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                        </div>

                        <button className="flex-[1.2] squircle-border flex items-center justify-center gap-2 bg-marinho hover:bg-[#5aa386] text-white font-bold py-4 transition-all shadow-lg shadow-[#68B999]/20 cursor-pointer text-xs  md:text-md lg:text-lg active:scale-95">
                            <ShoppingCart size={20} strokeWidth={2.5} />
                            Comprar agora
                        </button>
                    </div>

                    <p className="text-texto-terciario text-[11px] font-medium text-center sm:text-left leading-tight">
                        Pagamento via mercado pago · Acesso imediato após confirmação
                    </p>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                <div className="flex flex-col gap-4">
                    <h2 className="text-texto-terciario text-sm tracking-wider uppercase">
                        SOBRE ESTE MATERIAL
                    </h2>
                    <p className="text-texto-principal text-md leading-relaxed tracking-wider opacity-80">
                        {product.description}
                    </p>
                </div>
            </div>
        </main>
    )
}
