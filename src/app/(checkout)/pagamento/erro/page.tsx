import { PaymentStatusCard } from "@/components/checkout/payment-status-card";
import { XCircle } from "lucide-react";

export default function PagamentoErro() {
    return (
            <PaymentStatusCard
                icon={<XCircle size={42} className="text-coral" strokeWidth={2} />}
                iconWrapperClassName="w-16 h-16 rounded-full bg-coral/10 border-coral/30 border backdrop-blur-md flex items-center justify-center"
                title="Pagamento não realizado"
                message="Houve um problema ao processar seu pagamento. Nenhum valor foi cobrado. Tente novamente ou entre em contato conosco."
                primaryHref="/"
                primaryLabel="Tentar novamente"
            />
    );
}
