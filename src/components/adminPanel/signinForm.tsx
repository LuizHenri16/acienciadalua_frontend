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

            router.push("/panel");
        } catch {
            setError("Email ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="flex flex-col items-center justify-center mt-3 md:max-w-[60%] lg:max-w-[30%] mx-auto w-full"
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        >
            <Input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                label="Email"
                placeholder="Digite seu email de acesso"
            />
            <Input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                label="Senha"
                placeholder="Digite sua senha"
            />
            {error && (
                <p className="text-red-500 text-xs mt-1 self-start w-full text-center">{error}</p>
            )}
            <Button name="Entrar" loadingName="Entrando" loading={loading} onClick={handleSubmit} />
        </form>
    );
}
