import { BackVitrine } from "@/components/button/button";
import { SignInForm } from "@/components/customer/signinform";


export default function SignIn() {
    return (
        <div className="p-6 flex flex-col justify-center w-full h-screen bg-[#fafafa]">
            {/* Header */}
            <div className="flex flex-col items-center justify-center mb-4">
                <div className="flex flex-row items-center gap-2 p-2">
                    <img src="/acienciadalua-logo.svg" alt="Logo" className="w-14" />
                    <h1 className="font-unkempt text-3xl text-yellow-light-custom">A Ciência da <span className="text-3xl text-green-dark-custom">Lua</span> </h1>
                </div>
                <p className="text-[#5A5A58] font-light text-center w-40">Acesse sua área de materiais.</p>
            </div>

            {/* Form */}
            <SignInForm />

            {/* Footer */}
            <div className="flex flex-col justify-center mt-4">
                <p className="px-3 text-[#5A5A58] text-center ">Sua conta é criada automaticamente após a confirmação da compra na Hotmart.</p>
                <div className="flex items-center justify-center mt-4"><BackVitrine /></div>
            </div>
        </div>
    );
}