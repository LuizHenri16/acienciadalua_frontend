import { Clock } from "lucide-react";
import Link from "next/link";

export default function PagamentoPendente() {
    return (
        <main className="min-h-screen flex items-center justify-center font-sora bg-[#fafafa] px-6">
            <div className="flex flex-col items-center text-center gap-6 max-w-sm w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-ouro-light flex items-center justify-center">
                    <Clock size={36} className="text-[#7A5200]" strokeWidth={2} />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-[#171717]">Pagamento em análise</h1>
                    <p className="text-texto-terciario text-sm leading-relaxed">
                        Seu pagamento está sendo processado. Assim que confirmado, seu material ficará disponível automaticamente em sua conta.
                    </p>
                </div>

                <Link
                    href="/minha-conta"
                    className="w-full squircle-border bg-marinho text-white font-bold py-4 text-sm flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95"
                >
                    Acessar minha conta
                </Link>

                <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    Voltar à vitrine
                </Link>
            </div>
        </main>
    );
}
