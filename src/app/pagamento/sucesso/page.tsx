import { BackgroundLights } from "@/components/ui/decor/BackgroundLights";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PagamentoSucesso() {
    return (
        <main className="min-h-screen flex items-center justify-center font-sora bg-marinho px-6">
            <BackgroundLights />
            <div className="flex flex-col items-center text-center gap-6 max-w-sm w-full squircle-border px-6 py-8 bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-turquesa-light/10 border-turquesa-light/20 border flex items-center justify-center">
                    <CheckCircle size={42} className="text-turquesa-light" strokeWidth={2} />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-white">Pagamento confirmado!</h1>
                    <p className="text-texto-terciario text-sm leading-relaxed">
                        Seu material já está disponível na sua conta. Acesse abaixo para visualizar e baixar.
                    </p>
                </div>

                <Link href="/minha-conta" className="w-full squircle-border bg-turquesa-dark text-white font-bold py-4 text-sm flex items-center justify-center hover:opacity-90 transition-all active:scale-95">
                    Acessar minha conta
                </Link>

                <Link href="/" className="text-xs md:text-sm lg:text-md text-texto-terciario hover:text-white/60 transition-colors">
                    Voltar à vitrine
                </Link>
            </div>
        </main>
    );
}
