'use client';
import { useState } from "react";
import { Input } from "../form/input";
import { Button } from "../button/button";

export function SignInForm() {
    const [email, setEmail] = useState("");

    return (
        <div className="flex flex-col items-center justify-center">
            <Input placeholder="Digite seu email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <div className="mt-2 w-full">
                <Button variant="primary" name="Entrar" onClick={() => { }} />
            </div>
        </div>
    );
}