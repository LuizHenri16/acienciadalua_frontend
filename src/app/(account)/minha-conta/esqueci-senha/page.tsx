'use client';

import { useState } from "react";
import { BackVitrine } from "@/components/ui/back-vitrine";
import { ForgotPasswordForm } from "@/components/account/forgot-password-form";
import { AuthShell } from "@/components/layout/auth-shell";

export default function EsqueciSenha() {
    const [sent, setSent] = useState(false);

    return (
        <AuthShell
            subtitle={sent ? undefined : "Recupere o acesso à sua conta"}
            logoMargin={sent ? "mb-8" : "mb-2"}
            footer={
                <div className="mt-6">
                    <BackVitrine />
                </div>
            }
        >
            <ForgotPasswordForm onSentChange={setSent} />
        </AuthShell>
    );
}
