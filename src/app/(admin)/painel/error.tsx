'use client';

import { ErrorState } from "@/components/layout/error-state";

export default function PainelError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState
      title="Erro no painel"
      message="Ocorreu um erro ao carregar o painel. Tente novamente."
      onReset={reset}
    />
  );
}
