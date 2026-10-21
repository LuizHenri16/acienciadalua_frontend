'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, setPassword as setCustomerPassword } from "@/lib/api/customers";
import { HttpError } from "@/lib/api/http-error";
import { setCustomerToken } from "@/lib/auth/cookies";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignInFormProps {
    initialEmail?: string;
}

export function SignInForm({ initialEmail }: SignInFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState(initialEmail ?? "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);

    async function handleSignIn() {
        if (!email.trim() || !password.trim()) return setError("Preencha email e senha.");
        setLoading(true);
        setError("");

        try {
            const result = await signIn(email, password);
            setCustomerToken(result.access_token);
            router.push("/minha-conta");
        } catch (err: unknown) {
            if (err instanceof HttpError && err.status === 401 && err.message === "NO_PASSWORD_SET") {
                setNeedsPasswordSetup(true);
                setPassword("");
                setError("");
            } else {
                setError("Email ou senha incorretos.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleSetPassword() {
        if (password.length < 8) return setError("A senha deve ter no mínimo 8 caracteres.");
        if (password !== confirmPassword) return setError("As senhas não conferem.");
        setLoading(true);
        setError("");

        try {
            const result = await setCustomerPassword(email, password);
            setCustomerToken(result.access_token);
            router.push("/minha-conta");
        } catch {
            setError("Erro ao criar senha. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (loading) return;
        if (needsPasswordSetup) {
            handleSetPassword();
        } else {
            handleSignIn();
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col w-full gap-2">
            <Input
                id="email"
                name="email"
                placeholder="Seu e-mail"
                ariaLabel="E-mail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                ariaDescribedBy={error ? "signin-form-error" : undefined}
            />

            <div className="flex flex-col gap-1">
                <Input
                    id="password"
                    name="password"
                    placeholder={needsPasswordSetup ? "Crie sua senha" : "Sua senha"}
                    ariaLabel={needsPasswordSetup ? "Crie sua senha" : "Senha"}
                    autoComplete={needsPasswordSetup ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    ariaDescribedBy={error ? "signin-form-error" : undefined}
                />
                {needsPasswordSetup && (
                    <Input
                        id="password-confirm"
                        name="password-confirm"
                        placeholder="Confirme sua senha"
                        ariaLabel="Confirme sua senha"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        ariaDescribedBy={error ? "signin-form-error" : undefined}
                    />
                )}
            </div>

            {!needsPasswordSetup && (
                <Link
                    href="/minha-conta/esqueci-senha"
                    className="text-turquesa-light text-xs text-right hover:underline mt-1"
                >
                    Esqueci minha senha
                </Link>
            )}

            {needsPasswordSetup && (
                <p className="w-full px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs text-center leading-relaxed">
                    Sua conta foi criada! Defina uma senha de acesso para continuar.
                </p>
            )}

            {error && (
                <p id="signin-form-error" role="alert" className="w-full px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-light text-sm text-center font-medium">
                    {error}
                </p>
            )}

            <div className="mt-1 w-full">
                {needsPasswordSetup ? (
                    <Button
                        type="submit"
                        loadingName="Criando..."
                        variant="primary"
                        size="lg"
                        name="Criar senha e entrar"
                        loading={loading}
                    />
                ) : (
                    <Button
                        type="submit"
                        loadingName="Entrando..."
                        variant="primary"
                        size="lg"
                        name="Entrar"
                        loading={loading}
                    />
                )}
            </div>
        </form>
    );
}
