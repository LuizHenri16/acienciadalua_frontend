'use client';
import { useState } from "react";
import { Input } from "../ui/form/input";
import { Button } from "../ui/button/button";
import { useRouter } from "next/navigation";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleLogin() {
        setLoading(true);
        try {
            setError("Erro ao fazer login");
            setTimeout(() => {
                console.log(email);
                router.push("/minha-conta");
                setLoading(false);
            }, 1000);
        } catch (error: any) {
            setError(error.message || "Erro ao fazer login");
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-3 md:max-w-[60%] lg:max-w-[40%] mx-auto w-full">
            <Input placeholder="Digite seu email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            {error && <p className="w-full p-2 border border-red-8003/45 squircle-border bg-red-50 text-red-800 text-sm text-center font-medium mt-2">{error}</p>}
            <div className="mt-2 w-full">
                <Button loadingName="Entrando" variant="primary" name="Entrar" onClick={handleLogin} loading={loading} />
            </div>
        </div>
    );
}