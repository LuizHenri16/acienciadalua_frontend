"use client"

import { useRouter } from "next/navigation";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Input } from "../ui/form/input";
import { adminSignIn } from "@/api/auth";

export function SignInForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const { access_token, refresh_token } = await adminSignIn(user.email, user.password);

            // Salva os tokens em cookies (acessíveis pelo middleware)
            document.cookie = `admin_token=${access_token}; path=/; max-age=3600; SameSite=Strict`;
            document.cookie = `admin_refresh_token=${refresh_token}; path=/; max-age=604800; SameSite=Strict`;

            router.push("/painel");
        } catch (error: any) {
            if (error.status === 401) {
                setError("Email ou senha inválidos.");
            } else {
                setError("Erro ao fazer login. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <Input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} label="E-mail" placeholder="admin@exemplo.com" />
            <Input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} label="Senha" placeholder="••••••••" />
            {error && (
                <p className="w-full px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-dark text-sm text-center font-medium">
                    {error}
                </p>
            )}
            <div className="mt-1">
                <Button name="Entrar" loadingName="Entrando" loading={loading} onClick={handleSubmit} />
            </div>
        </div>
    );
}
