'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackVitrine } from "@/components/ui/back-vitrine";
import { resetPassword } from "@/lib/api/customers";
import { setCustomerToken } from "@/lib/auth/cookies";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    async function handleSubmit() {
        if (!token) return setError("Token de redefinição inválido.");
        if (password.length < 8) return setError("A senha deve ter no mínimo 8 caracteres.");
        if (password !== confirmPassword) return setError("As senhas não conferem.");

        setLoading(true);
        setError("");

        try {
            const result = await resetPassword(token, password);
            setCustomerToken(result.access_token);
            setDone(true);
        } catch {
            setError("Token inválido ou expirado. Solicite uma nova redefinição.");
        } finally {
            setLoading(false);
        }
    }

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (loading) return;
        handleSubmit();
    }

    if (done) {
        router.push("/minha-conta");
        return null;
    }

    if (!token) {
        return (
            <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 text-center">
                <p className="text-coral-light text-sm">Link inválido. Solicite uma nova redefinição de senha.</p>
                <div className="mt-6">
                    <BackVitrine />
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} noValidate className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col gap-2">
            <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-1">Nova senha</h2>
            <p className="text-turquesa-light text-xs md:text-sm text-center mb-4 opacity-70 leading-relaxed">
                Escolha uma nova senha para sua conta.
            </p>
            <div className="flex flex-col w-full gap-2">
                <Input
                    id="password"
                    name="password"
                    placeholder="Nova senha"
                    ariaLabel="Nova senha"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    ariaDescribedBy={error ? "reset-password-error" : undefined}
                />
                <Input
                    id="password-confirm"
                    name="password-confirm"
                    placeholder="Confirme a nova senha"
                    ariaLabel="Confirme a nova senha"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    ariaDescribedBy={error ? "reset-password-error" : undefined}
                />
                {error && (
                    <p id="reset-password-error" role="alert" className="w-full px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-light text-sm text-center font-medium">
                        {error}
                    </p>
                )}
                <div className="mt-1 w-full">
                    <Button
                        type="submit"
                        loadingName="Redefinindo..."
                        variant="primary"
                        size="lg"
                        name="Redefinir senha"
                        loading={loading}
                    />
                </div>
            </div>
        </form>
    );
}
