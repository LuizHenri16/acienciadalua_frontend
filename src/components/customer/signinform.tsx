'use client';

import { useState } from "react";
import { Input } from "../ui/form/input";
import { Button } from "../ui/button/button";
import { customerRequestMagicLink } from "@/api/customer";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    async function handleLogin() {
        if (!email.trim()) return setError("Informe seu email.");
        setLoading(true);
        setError("");

        try {
            await customerRequestMagicLink(email);
            setSent(true);
        } catch {
            setError("Erro ao enviar o link. Verifique o email e tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 w-full text-center">
                <div className="w-12 h-12 rounded-full bg-turquesa/20 border border-turquesa/30 flex items-center justify-center mx-auto">
                    <span className="text-2xl">📬</span>
                </div>
                <p className="text-white font-semibold">Link enviado!</p>
                <p className="text-turquesa-light text-sm opacity-80 leading-relaxed">
                    Acesse o link que enviamos para{" "}
                    <strong className="text-white opacity-90">{email}</strong>{" "}
                    para entrar na sua conta.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <Input
                placeholder="Digite seu e-mail ex: email@gmail.com"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                type="email"
            />
            {error && (
                <p className="w-full px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-light text-sm text-center font-medium">
                    {error}
                </p>
            )}
            <div className="mt-1 w-full">
                <Button loadingName="Enviando..." variant="primary" name="Enviar link de acesso" onClick={handleLogin} loading={loading} />
            </div>
        </div>
    );
}
