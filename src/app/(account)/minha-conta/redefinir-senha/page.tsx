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
            <Suspense fallback={<div className="text-white">Carregando...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </AuthShell>
    );
}
