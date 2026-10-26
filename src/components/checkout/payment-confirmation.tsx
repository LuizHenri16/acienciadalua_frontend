"use client";

import { usePaymentStatus } from "@/hooks/use-payment-status";
import { PaymentStatusCard } from "./payment-status-card";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  KeyRound,
  Loader2,
  RefreshCw,
  SearchX,
  XCircle,
} from "lucide-react";

interface PaymentConfirmationProps {
  paymentId?: string;
}

/**
 * Revalidates a payment before showing success. Any missing/invalid token or
 * backend error is rendered as a safe failure, never as "Pagamento confirmado".
 */
export function PaymentConfirmation({ paymentId }: PaymentConfirmationProps) {
  const { view, checking, refresh } = usePaymentStatus({
    paymentId: paymentId ?? null,
  });

  const refreshIcon = checking ? (
    <Loader2 size={18} className="animate-spin" />
  ) : (
    <RefreshCw size={18} />
  );
  const refreshLabel = checking ? "Verificando..." : "Verificar novamente";

  if (!paymentId) {
    return (
      <PaymentStatusCard
        icon={<SearchX size={42} className="text-ouro-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
        title="Não foi possível confirmar"
        message="Não encontramos os dados desta compra. Abra esta página na mesma aba em que o PIX foi gerado ou acesse sua conta para verificar o acesso."
        primaryHref="/minha-conta/signin"
        primaryLabel="Acessar minha conta"
        primaryIcon={<KeyRound size={18} />}
        secondaryHref="/"
      />
    );
  }

  if (view.state === "checking") {
    return (
      <PaymentStatusCard
        icon={<Loader2 size={42} className="text-turquesa-light animate-spin" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-turquesa-light/10 border-turquesa-light/20 border flex items-center justify-center"
        title="Verificando pagamento"
        message="Aguarde enquanto confirmamos o pagamento diretamente com o Mercado Pago."
        primaryOnClick={refresh}
        primaryLabel="Verificando..."
        primaryIcon={<Loader2 size={18} className="animate-spin" />}
        primaryDisabled
        primaryBusy
        secondaryHref={null}
        live="polite"
      />
    );
  }

  if (view.state === "unauthorized") {
    return (
      <PaymentStatusCard
        icon={<AlertTriangle size={42} className="text-ouro-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
        title="Não foi possível confirmar"
        message="A confirmação só pode ser consultada na mesma aba em que o PIX foi gerado. Se você já pagou, acesse sua conta para verificar o acesso."
        primaryHref="/minha-conta/signin"
        primaryLabel="Acessar minha conta"
        primaryIcon={<KeyRound size={18} />}
        secondaryHref="/"
      />
    );
  }

  if (view.state === "not_found") {
    return (
      <PaymentStatusCard
        icon={<SearchX size={42} className="text-coral" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-coral/10 border-coral/30 border flex items-center justify-center"
        title="Pagamento não encontrado"
        message="Não localizamos este pagamento no Mercado Pago. Verifique se o QR Code foi gerado corretamente ou tente novamente."
        primaryHref="/"
        primaryLabel="Voltar à vitrine"
        secondaryHref="/minha-conta/signin"
        secondaryLabel="Já tenho conta"
      />
    );
  }

  if (view.state === "unavailable") {
    return (
      <PaymentStatusCard
        icon={<AlertTriangle size={42} className="text-ouro-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
        title="Não foi possível verificar agora"
        message={view.message}
        primaryOnClick={refresh}
        primaryLabel={refreshLabel}
        primaryIcon={refreshIcon}
        primaryDisabled={checking}
        primaryBusy={checking}
        secondaryHref="/minha-conta/signin"
        secondaryLabel="Acessar minha conta"
        live="polite"
      />
    );
  }

  const status = view.status;

  if (status.status === "approved" && status.accessGranted) {
    return (
      <PaymentStatusCard
        icon={<CheckCircle size={42} className="text-turquesa-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-turquesa-light/10 border-turquesa-light/20 border flex items-center justify-center"
        title="Pagamento confirmado!"
        message="Seu material já está disponível. Crie sua senha ou entre na sua conta para acessar."
        primaryHref="/minha-conta/signin"
        primaryLabel="Criar senha e acessar"
        primaryIcon={<KeyRound size={18} />}
        live="polite"
      />
    );
  }

  if (status.status === "approved") {
    // Fail closed: never show success without a registered purchase.
    return (
      <PaymentStatusCard
        icon={<AlertTriangle size={42} className="text-ouro-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
        title="Pagamento identificado"
        message="O pagamento foi aprovado, mas o acesso ainda não foi liberado. Tente verificar novamente em alguns instantes."
        primaryOnClick={refresh}
        primaryLabel={refreshLabel}
        primaryIcon={refreshIcon}
        primaryDisabled={checking}
        primaryBusy={checking}
        secondaryHref="/minha-conta/signin"
        secondaryLabel="Acessar minha conta"
        live="polite"
      />
    );
  }

  if (status.status === "pending") {
    return (
      <PaymentStatusCard
        icon={<Clock size={42} className="text-ouro-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
        title="Aguardando pagamento"
        message="Ainda não recebemos a confirmação do Mercado Pago. Se você já pagou, aguarde alguns segundos e verifique novamente."
        primaryOnClick={refresh}
        primaryLabel={refreshLabel}
        primaryIcon={refreshIcon}
        primaryDisabled={checking}
        primaryBusy={checking}
        secondaryHref="/"
        live="polite"
      />
    );
  }

  if (status.status === "rejected") {
    return (
      <PaymentStatusCard
        icon={<XCircle size={42} className="text-coral" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-coral/10 border-coral/30 border flex items-center justify-center"
        title="Pagamento não realizado"
        message="O pagamento não foi aprovado e nenhum acesso foi liberado. Gere um novo PIX para tentar novamente."
        primaryHref="/"
        primaryLabel="Tentar novamente"
        secondaryHref="/minha-conta/signin"
        secondaryLabel="Já tenho conta"
        live="polite"
      />
    );
  }

  if (status.status === "expired") {
    return (
      <PaymentStatusCard
        icon={<Clock size={42} className="text-ouro-light" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-ouro-light/10 border-ouro-light/20 border flex items-center justify-center"
        title="QR Code expirado"
        message="O prazo para pagar este PIX terminou. Gere um novo QR Code para concluir a compra."
        primaryHref="/"
        primaryLabel="Gerar novo PIX"
        secondaryHref="/minha-conta/signin"
        secondaryLabel="Já tenho conta"
        live="polite"
      />
    );
  }

  if (status.status === "refunded") {
    return (
      <PaymentStatusCard
        icon={<AlertTriangle size={42} className="text-coral" strokeWidth={2} />}
        iconWrapperClassName="w-16 h-16 rounded-full bg-coral/10 border-coral/30 border flex items-center justify-center"
        title="Pagamento estornado"
        message="Este pagamento foi estornado ou contestado. Se precisar de ajuda, entre em contato com o suporte."
        primaryHref="/"
        primaryLabel="Voltar à vitrine"
        secondaryHref="/minha-conta/signin"
        secondaryLabel="Acessar minha conta"
        live="assertive"
      />
    );
  }

  return (
    <PaymentStatusCard
      icon={<AlertTriangle size={42} className="text-coral" strokeWidth={2} />}
      iconWrapperClassName="w-16 h-16 rounded-full bg-coral/10 border-coral/30 border flex items-center justify-center"
      title="Não foi possível confirmar"
      message="O status deste pagamento não pôde ser determinado. Nenhum acesso foi liberado."
      primaryOnClick={refresh}
      primaryLabel={refreshLabel}
      primaryIcon={refreshIcon}
      primaryDisabled={checking}
      primaryBusy={checking}
      secondaryHref="/minha-conta/signin"
      secondaryLabel="Acessar minha conta"
      live="assertive"
    />
  );
}
