"use client"

import { useRouter } from "next/navigation";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Input } from "../ui/form/input";

export function SignInForm() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleSubmit = () => {
        setLoading(true);
        router.push("/panel");
    };

    return (
        <form className="flex flex-col items-center justify-center mt-3 md:max-w-[60%] lg:max-w-[30%] mx-auto w-full">
            <Input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} label="Email" placeholder="Digite seu email de acesso" />
            <Input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} label="Senha" placeholder="Digite sua senha" />
            <Button name="Entrar" loadingName="Entrando" loading={loading} onClick={handleSubmit} />
        </form>
    );
}