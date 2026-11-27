import { AdminSignInForm } from "@/components/admin/sign-in-form";
import Image from "next/image";
import { Shield } from "lucide-react";

export default function SignIn() {
  return (
    <div className="painel-ds flex flex-col lg:flex-row w-full min-h-dvh text-texto-principal">
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between w-[380px] min-h-dvh painel-card-navy px-10 py-12 shrink-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-turquesa/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-ouro/10 blur-2xl"
        />

        <div className="relative flex flex-row items-center gap-3">
          <Image className="lg:w-16" src="/logo.webp" alt="Logo" width={40} height={40} />
          <span className="font-unkempt text-xl lg:text-3xl text-ouro-light">
            A Ciência da{" "}
            <span className="text-turquesa-light">Lua</span>
          </span>
        </div>

        <div className="relative flex flex-col gap-4">
          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-turquesa-light" />
          </div>
          <h2 className="text-white text-2xl font-bold leading-snug">
            Painel de<br />Administração
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Gerencie produtos, uploads e conteúdos da plataforma.
          </p>
        </div>
        <p className="relative text-white/70 text-xs">
          Acesso restrito. Não compartilhe suas credenciais.
        </p>
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-col justify-center items-center flex-1 px-4 sm:px-6 py-12"
      >
        <div className="flex lg:hidden flex-row items-center gap-3 mb-8">
          <Image src="/logo.webp" alt="Logo" width={40} height={40} />
          <span className="font-unkempt text-xl text-ouro-ink">
            A Ciência da{" "}
            <span className="text-turquesa-deep">Lua</span>
          </span>
        </div>

        <div className="w-full max-w-sm mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDEFF2] mb-5">
            <Shield className="w-3 h-3 text-rosa-deep" />
            <span className="text-rosa-deep text-xs font-semibold">Área Restrita</span>
          </div>
          <h1 className="text-texto-principal text-2xl font-bold tracking-tight leading-tight">
            Acesso ao painel
          </h1>
          <p className="text-texto-secundario text-sm mt-1">
            Faça login com suas credenciais de administrador.
          </p>
        </div>

        <div className="w-full max-w-sm">
          <AdminSignInForm />
        </div>

        <p className="mt-8 text-texto-terciario text-xs text-center max-w-xs leading-relaxed">
          Acesso não autorizado será registrado e bloqueado.
        </p>
      </main>
    </div>
  );
}