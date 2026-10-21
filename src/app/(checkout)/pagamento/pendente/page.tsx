import { PaymentStatusCard } from "@/components/checkout/payment-status-card";
import { Clock } from "lucide-react";

export default function PagamentoPendente() {
    return (
            <PaymentStatusCard
                icon={<Clock size={42} className="text-ouro-light" strokeWidth={2} />}
                iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
                title="Pagamento em análise"
                message="Seu pagamento está sendo processado. Assim que confirmado, seu material ficará disponível automaticamente em sua conta."
                primaryHref="/minha-conta"
                primaryLabel="Acessar minha conta"
            />
    );
}
