import { BackVitrine } from "@/components/ui/button/button";
import { SignInForm } from "@/components/customer/signinform";
import Image from "next/image";

export default function SignIn() {
    return (
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen bg-marinho overflow-hidden px-6 py-10">

            {/* Decorações de fundo com luzes*/}
            <div className="pointer-events-none select-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-turquesa opacity-10 blur-3xl" />
                <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-rosa-rose opacity-10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-turquesa opacity-5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-turquesa opacity-[0.03]" />
            </div>
            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex flex-row items-center gap-3 mb-2">
                    <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={52} height={52} />
                    <h1 className="font-unkempt text-3xl text-ouro">
                        A Ciência da{" "}
                        <span className="text-turquesa">Lua</span>
                    </h1>
                </div>
                <p className="text-turquesa-light text-sm font-light text-center mb-8 opacity-80">
                    Acesse sua área de materiais
                </p>
                <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-8 flex flex-col gap-2">
                    <h2 className="text-white text-lg font-semibold text-center mb-1">Entrar na minha conta</h2>
                    <p className="text-turquesa-light text-xs text-center mb-4 opacity-70 leading-relaxed">
                        Informe seu e-mail e enviaremos um link de acesso direto.
                    </p>
                    <SignInForm />
                </div>
                <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-white/30 text-xs text-center max-w-xs leading-relaxed">
                        Sua conta é criada automaticamente após a confirmação da compra.
                    </p>
                    <BackVitrine />
                </div>
            </div>
        </div>
    );
}