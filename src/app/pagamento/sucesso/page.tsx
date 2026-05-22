import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PagamentoSucesso() {
    return (
        <main className="min-h-screen flex items-center justify-center font-sora bg-[#fafafa] px-6">
            <div className="flex flex-col items-center text-center gap-6 max-w-sm w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-turquesa-light flex items-center justify-center">
                    <CheckCircle size={36} className="text-turquesa-dark" strokeWidth={2} />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-[#171717]">Pagamento confirmado!</h1>
                    <p className="text-texto-terciario text-sm leading-relaxed">
                        Seu material já está disponível na sua conta. Acesse abaixo para visualizar e baixar.
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
