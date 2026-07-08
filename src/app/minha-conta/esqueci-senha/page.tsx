'use client';

import { useState } from "react";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/button/button";
import { customerForgotPassword } from "@/api/customer";
import { BackVitrine } from "@/components/ui/button/button";
import { BackgroundLights } from "@/components/ui/decor/BackgroundLights";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function EsqueciSenha() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    async function handleSubmit() {
        if (!email.trim()) return setError("Informe seu email.");
        setLoading(true);
        setError("");

        try {
            await customerForgotPassword(email);
            setSent(true);
        } catch {
            setError("Erro ao enviar o email. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
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
                    <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col items-center gap-3 text-center">
                        <div className="w-12 h-12 rounded-full bg-turquesa/20 border border-turquesa/30 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-turquesa-light" />
                        </div>
                        <p className="text-white font-semibold">Email enviado!</p>
                        <p className="text-turquesa-light text-sm opacity-80 leading-relaxed">
                            Se o email estiver cadastrado, você receberá um link para redefinir sua senha.
                        </p>
                    </div>
                    <div className="mt-6">
                        <BackVitrine />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen bg-marinho overflow-hidden px-6 py-10">
            <BackgroundLights />
            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex flex-row items-center gap-3 mb-2">
                    <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={52} height={52} />
                    <h1 className="font-unkempt text-3xl text-ouro">
                        A Ciência da{" "}
                        <span className="text-turquesa">Lua</span>
                    </h1>
                </div>
                <p className="text-turquesa-light text-sm font-light text-center mb-8 opacity-80">
                    Recupere o acesso à sua conta
                </p>
                <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col gap-2">
                    <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-1">Redefinir senha</h2>
                    <p className="text-turquesa-light text-xs md:text-sm text-center mb-4 opacity-70 leading-relaxed">
                        Informe seu email e enviaremos um link de redefinição.
                    </p>
                    <div className="flex flex-col w-full gap-2">
                        <Input
                            placeholder="Seu e-mail"
                            label=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            type="email"
                        />
                        {error && (
                            <p className="w-full px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-light text-sm text-center font-medium">
                                {error}
                            </p>
                        )}
                        <div className="mt-1 w-full">
                            <Button
                                loadingName="Enviando..."
                                variant="primary"
                                name="Enviar link de redefinição"
                                onClick={handleSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <BackVitrine />
                </div>
            </div>
        </div>
    );
}
