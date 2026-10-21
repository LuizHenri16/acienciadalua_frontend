'use client';

import { BackgroundLights } from "@/components/ui/background-lights";
import { BackVitrine } from "@/components/ui/back-vitrine";

interface ErrorStateProps {
  title: string;
  message: string;
  onReset: () => void;
  showIllustration?: boolean;
  showBackVitrine?: boolean;
}

export function ErrorState({
  title,
  message,
  onReset,
  showIllustration = false,
  showBackVitrine = false,
}: ErrorStateProps) {
  return (
    <main className="h-screen bg-marinho flex flex-col justify-center items-center relative">
      <BackgroundLights />
      <div className="z-10 flex flex-col items-center w-full gap-6 px-6">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-sora text-white">
            {title}
          </h2>
          <p className="text-base md:text-lg font-sora text-rosa-rose mt-1">
            {message}
          </p>
        </div>
        {showIllustration && (
          <div className="w-20 h-20 rounded-full bg-rosa-rose/10 border border-rosa-rose/20 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="px-6 py-3 squircle-border bg-turquesa-dark text-white text-sm font-bold hover:opacity-90 transition-all cursor-pointer active:scale-[0.98]"
          >
            Tentar novamente
          </button>
          {showBackVitrine && <BackVitrine />}
        </div>
      </div>
    </main>
  );
}
