'use client';
import { useState } from "react";
import { Input } from "../form/input";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin() {
        setLoading(true);
        try {
            setTimeout(() => {
                // Implementar API request para login aqui
                console.log(email);
                router.push("/minhaconta");
                setLoading(false);
            }, 1000);
        } catch (error) {
            // Implementar toast de erro aqui
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-3 lg:max-w-[40%] mx-auto w-full">
            <Input placeholder="Digite seu email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <div className="mt-2 w-full">
                <Button loadingName="Entrando" variant="primary" name="Entrar" onClick={handleLogin} loading={loading} />
            </div>
        </div>
    );
}