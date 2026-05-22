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
            <div className="flex flex-col items-center justify-center mt-3 gap-4 md:max-w-[60%] lg:max-w-[30%] mx-auto w-full">
                <div className="w-12 h-12 rounded-full bg-turquesa-light flex items-center justify-center mx-auto">
                    <span className="text-2xl">📬</span>
                </div>
                <p className="text-texto-principal font-semibold">Link enviado!</p>
                <p className="text-texto-secundario text-sm">
                    Acesse o link que enviamos para <strong>{email}</strong> para entrar na sua conta.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center mt-3 md:max-w-[60%] lg:max-w-[40%] mx-auto w-full">
            <Input
                placeholder="Digite seu email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            {error && (
                <p className="w-full p-2 border border-red-300 squircle-border bg-red-50 text-red-800 text-sm text-center font-medium mt-2">
                    {error}
                </p>
            )}
            <div className="mt-2 w-full">
                <Button loadingName="Enviando..." variant="primary" name="Enviar link de acesso" onClick={handleLogin} loading={loading} />
            </div>
        </div>
    );
}
