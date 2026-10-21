import type { ReactNode } from "react";
import Link from "next/link";

interface PaymentStatusCardProps {
  icon: ReactNode;
  iconWrapperClassName: string;
  title: string;
  message: string;
  primaryHref: string;
  primaryLabel: string;
  primaryIcon?: ReactNode;
}

export function PaymentStatusCard({
  icon,
  iconWrapperClassName,
  title,
  message,
  primaryHref,
  primaryLabel,
  primaryIcon,
}: PaymentStatusCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 max-w-sm w-full squircle-border px-6 py-8 bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className={iconWrapperClassName}>
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-texto-terciario text-sm leading-relaxed">
          {message}
        </p>
      </div>

      <Link
        href={primaryHref}
        className={`w-full squircle-border bg-turquesa-dark text-white font-bold py-4 text-sm flex items-center justify-center ${primaryIcon ? "gap-2" : ""} hover:opacity-90 transition-all active:scale-95`}
      >
        {primaryIcon}
        {primaryLabel}
      </Link>

      <Link href="/" className="text-xs md:text-sm lg:text-md text-texto-terciario hover:text-white/60 transition-colors">
        Voltar à vitrine
      </Link>
    </div>
  );
}
