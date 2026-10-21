import { PaymentStatusCard } from "@/components/checkout/payment-status-card";
import { CheckCircle, KeyRound } from "lucide-react";

export default async function PagamentoSucesso({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
    const params = await searchParams;
    return (
            <PaymentStatusCard
                icon={<CheckCircle size={42} className="text-turquesa-light" strokeWidth={2} />}
                iconWrapperClassName="w-16 h-16 rounded-full bg-turquesa-light/10 border-turquesa-light/20 border flex items-center justify-center"
                title="Pagamento confirmado!"
                message="Seu material já está disponível. Crie sua senha para acessar sua conta."
                primaryHref={params.email ? `/minha-conta/signin?email=${encodeURIComponent(params.email)}` : "/minha-conta/signin"}
                primaryLabel="Criar senha e acessar"
                primaryIcon={<KeyRound size={18} />}
            />
    );
}
