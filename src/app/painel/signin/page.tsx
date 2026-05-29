import { SignInForm } from "@/components/adminPanel/signinForm";
import Image from "next/image";

export default function SignIn() {
    return (
        <div className="p-6 flex flex-col justify-center w-full h-screen bg-[#fafafa]">
            <div className="flex flex-col items-center justify-center mb-4">
                <div className="flex flex-row items-center gap-2 p-2">
                    <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={60} height={60} />
                    <h1 className="font-unkempt text-3xl lg:text-4xl text-ouro">A Ciência da <span className="text-3xl md:text-4xl lg:text-5xl text-turquesa-dark">Lua</span> </h1>
                </div>
                <h2 className="text-2xl font-bold mt-3 text-texto-principal">Painel Administrador</h2>
                <p className="text-texto-secundario font-light text-center text-sm mt-1">Acesso restrito ao administrador</p>
            </div>
            <SignInForm />
            <div className="flex flex-col justify-center mt-4">
                <p className="px-3 text-texto-secundario text-center text-sm md:w-[60%] lg:w-[40%] mx-auto">Área restrita. Acesso não autorizado será registrado e bloqueado.</p>
            </div>
        </div>
    );
}