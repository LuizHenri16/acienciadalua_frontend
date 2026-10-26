import type { Metadata } from "next";
import { PaymentConfirmation } from "@/components/checkout/payment-confirmation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Confirmação de pagamento",
  robots: { index: false, follow: false },
};

export default async function PagamentoSucesso({
  searchParams,
}: {
  searchParams: Promise<{ payment_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawPaymentId = params.payment_id;
  const paymentId = Array.isArray(rawPaymentId) ? rawPaymentId[0] : rawPaymentId;

  return <PaymentConfirmation paymentId={paymentId} />;
}
