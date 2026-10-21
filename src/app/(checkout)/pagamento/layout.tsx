import type { ReactNode } from "react";
import { BackgroundLights } from "@/components/ui/background-lights";

export default function PagamentoLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center font-sora bg-marinho px-6">
      <BackgroundLights />
      {children}
    </main>
  );
}
