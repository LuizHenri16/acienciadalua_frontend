import { Suspense } from "react";
import { BackVitrine } from "@/components/ui/back-vitrine";
import { ResetPasswordForm } from "@/components/account/reset-password-form";
import { AuthShell } from "@/components/layout/auth-shell";

export default function RedefinirSenha() {
    return (
        <AuthShell
            logoMargin="mb-8"
            footer={
                <div className="mt-6">
                    <BackVitrine />
                </div>
            }
        >
            <Suspense
                fallback={
                    <div role="status" aria-live="polite" className="w-full space-y-4 py-2">
                        <span className="sr-only">Carregando formulário…</span>
                        <div className="h-5 w-40 rounded-full skeleton-shimmer-dark mx-auto" />
                        <div className="h-11 w-full rounded-xl skeleton-shimmer-dark" />
                        <div className="h-11 w-full rounded-xl skeleton-shimmer-dark" />
                        <div className="h-11 w-full rounded-full skeleton-shimmer-dark mt-2" />
                    </div>
                }
            >
                <ResetPasswordForm />
            </Suspense>
        </AuthShell>
    );
}
