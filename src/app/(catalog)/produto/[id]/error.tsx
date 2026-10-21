'use client';

import { ErrorState } from "@/components/layout/error-state";

export default function ProdutoError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState
      title="Erro ao carregar produto"
      message="Não foi possível carregar as informações. Tente novamente."
      onReset={reset}
      showBackVitrine
    />
  );
}
