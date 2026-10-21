import type { ReactNode } from "react";
import Image from "next/image";
import { BackgroundLights } from "@/components/ui/background-lights";

interface AuthShellProps {
  subtitle?: string;
  logoMargin?: "mb-2" | "mb-8";
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ subtitle, logoMargin = "mb-2", children, footer }: AuthShellProps) {
  return (
    <main id="main-content" tabIndex={-1} className="relative flex flex-col justify-center items-center w-full min-h-dvh bg-marinho overflow-x-clip px-4 sm:px-6 py-14 sm:py-10">
      <BackgroundLights />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className={`flex flex-row items-center gap-3 ${logoMargin}`}>
          <Image src="/acienciadalua-logo-var1.svg" alt="Logo" width={52} height={52} />
          <h1 className="font-unkempt text-2xl sm:text-3xl text-ouro">
            A Ciência da{" "}
            <span className="text-turquesa">Lua</span>
          </h1>
        </div>
        {subtitle && (
          <p className="text-turquesa-light text-sm font-light text-center mb-8 opacity-80">
            {subtitle}
          </p>
        )}
        {children}
        {footer}
      </div>
    </main>
  );
}
