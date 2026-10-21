'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/api/customers";
import { Mail } from "lucide-react";

interface ForgotPasswordFormProps {
    onSentChange?: (sent: boolean) => void;
}

export function ForgotPasswordForm({ onSentChange }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    async function handleSubmit() {
        if (!email.trim()) return setError("Informe seu email.");
        setLoading(true);
        setError("");

        try {
            await forgotPassword(email);
            setSent(true);
            onSentChange?.(true);
        } catch {
            setError("Erro ao enviar o email. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (loading) return;
        handleSubmit();
    }

    if (sent) {
        return (
            <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-turquesa/20 border border-turquesa/30 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-turquesa-light" />
                </div>
                <p className="text-white font-semibold">Email enviado!</p>
                <p className="text-turquesa-light text-sm opacity-80 leading-relaxed">
                    Se o email estiver cadastrado, você receberá um link para redefinir sua senha.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} noValidate className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col gap-2">
            <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-1">Redefinir senha</h2>
            <p className="text-turquesa-light text-xs md:text-sm text-center mb-4 opacity-70 leading-relaxed">
                Informe seu email e enviaremos um link de redefinição.
            </p>
            <div className="flex flex-col w-full gap-2">
                <Input
                    id="email"
                    name="email"
                    placeholder="Seu e-mail"
                    ariaLabel="E-mail"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    error={error || undefined}
                />
                <div className="mt-1 w-full">
                    <Button
                        type="submit"
                        loadingName="Enviando..."
                        variant="primary"
                        size="lg"
                        name="Enviar link de redefinição"
                        loading={loading}
                    />
                </div>
            </div>
        </form>
    );
}
