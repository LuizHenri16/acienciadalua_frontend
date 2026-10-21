import { BackVitrine } from "@/components/ui/back-vitrine";
import { SignInForm } from "@/components/account/sign-in-form";
import { AuthShell } from "@/components/layout/auth-shell";

export default async function SignIn({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
    const params = await searchParams;
    return (
        <AuthShell
            subtitle="Acesse sua área de materiais"
            footer={
                <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-white/70 text-xs md:text-sm text-center max-w-xs leading-relaxed">
                        Sua conta é criada automaticamente após a confirmação da compra.
                    </p>
                    <BackVitrine />
                </div>
            }
        >
            <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-sm squircle-border px-6 py-8 flex flex-col gap-2">
                <h2 className="text-white text-lg md:text-xl font-semibold text-center mb-1">Entrar na minha conta</h2>
                <p className="text-turquesa-light text-xs md:text-sm text-center mb-4 opacity-70 leading-relaxed">
                    Entre com seu e-mail e senha para acessar seus materiais.
                </p>
                <SignInForm initialEmail={params.email} />
            </div>
        </AuthShell>
    );
}
