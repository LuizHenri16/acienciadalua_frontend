"use client";

import { useEffect } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = true,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-texto-principal/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      onClick={() => {
        if (!loading) onCancel();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white border border-borda shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                destructive
                  ? "bg-red-50 text-coral-dark"
                  : "bg-turquesa-light/60 text-turquesa-deep"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2
              id="confirm-dialog-title"
              className="text-base font-bold text-texto-principal"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Fechar confirmação"
            className="p-1.5 rounded-lg text-texto-terciario hover:text-texto-principal hover:bg-off-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p
          id="confirm-dialog-description"
          className="mt-3 text-sm text-texto-secundario leading-relaxed"
        >
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 min-h-11 rounded-xl border border-borda-med text-sm font-semibold text-texto-secundario hover:bg-off-white transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2.5 min-h-11 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-60 whitespace-nowrap ${
              destructive ? "bg-coral-dark" : "bg-turquesa-deep"
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
