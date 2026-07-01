'use client';

import { BackgroundLights } from "@/components/ui/decor/BackgroundLights";
import { BackVitrine } from "@/components/ui/button/button";

export default function ProdutoError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="h-screen bg-marinho flex flex-col justify-center items-center relative">
      <BackgroundLights />
      <div className="z-10 flex flex-col items-center w-full gap-6 px-6">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-sora text-white">
            Erro ao carregar produto
          </h2>
          <p className="text-base md:text-lg font-sora text-rosa-rose mt-1">
            Não foi possível carregar as informações. Tente novamente.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 squircle-border bg-turquesa-dark text-white text-sm font-bold hover:opacity-90 transition-all cursor-pointer active:scale-[0.98]"
          >
            Tentar novamente
          </button>
          <BackVitrine />
        </div>
      </div>
    </main>
  );
}
