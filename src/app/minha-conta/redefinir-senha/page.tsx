'use client';

import { useState, Suspense } from "react";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/button/button";
import { customerResetPassword } from "@/api/customer";
import { BackgroundLights } from "@/components/ui/decor/BackgroundLights";
import { BackVitrine } from "@/components/ui/button/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
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
            const result = await customerResetPassword(token, password);
            document.cookie = `customer_token=${result.access_token}; path=/; max-age=3600; SameSite=Strict`;
            setDone(true);
        } catch {
            setError("Token inválido ou expirado. Solicite uma nova redefinição.");
        } finally {
            setLoading(false);
        }
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
        <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col gap-2">
            <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-1">Nova senha</h2>
            <p className="text-turquesa-light text-xs md:text-sm text-center mb-4 opacity-70 leading-relaxed">
                Escolha uma nova senha para sua conta.
            </p>
            <div className="flex flex-col w-full gap-2">
                <Input
                    placeholder="Nova senha"
                    label=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <Input
                    placeholder="Confirme a nova senha"
                    label=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    type="password"
                />
                {error && (
                    <p className="w-full px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-light text-sm text-center font-medium">
                        {error}
                    </p>
                )}
                <div className="mt-1 w-full">
                    <Button
                        loadingName="Redefinindo..."
                        variant="primary"
                        name="Redefinir senha"
                        onClick={handleSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

export default function RedefinirSenha() {
    return (
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen bg-marinho overflow-hidden px-6 py-10">
            <BackgroundLights />
            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex flex-row items-center gap-3 mb-8">
                    <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={52} height={52} />
                    <h1 className="font-unkempt text-3xl text-ouro">
                        A Ciência da{" "}
                        <span className="text-turquesa">Lua</span>
                    </h1>
                </div>
                <Suspense fallback={<div className="text-white">Carregando...</div>}>
                    <ResetForm />
                </Suspense>
                <div className="mt-6">
                    <BackVitrine />
                </div>
            </div>
        </div>
    );
}
