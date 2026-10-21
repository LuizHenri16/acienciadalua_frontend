'use client';

import { ErrorState } from "@/components/layout/error-state";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <ErrorState
      title="Algo deu errado"
      message="Ocorreu um erro inesperado. Tente novamente."
      onReset={reset}
      showIllustration
      showBackVitrine
    />
  );
}
