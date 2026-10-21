import type { ReactNode } from "react";
import { BackgroundLights } from "@/components/ui/background-lights";

export default function PagamentoLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-dvh flex items-center justify-center font-sora bg-marinho px-4 sm:px-6">
      <BackgroundLights />
      {children}
    </main>
  );
}
