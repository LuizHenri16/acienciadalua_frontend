"use client";

import { RotateCcw } from "lucide-react";

export function DataError({
  message = "Não foi possível carregar os dados. Verifique sua conexão e tente novamente.",
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div role="alert" className="rounded-3xl painel-card p-6 flex flex-col items-start gap-3">
      <p className="text-sm font-semibold text-texto-principal">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 min-h-10 rounded-full painel-btn-primary text-xs font-bold cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Tentar novamente
      </button>
    </div>
  );
}
