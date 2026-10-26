import type { ReactNode } from "react";
import Link from "next/link";

interface PaymentStatusCardProps {
  icon: ReactNode;
  iconWrapperClassName: string;
  title: string;
  message: string;
  primaryHref?: string;
  primaryOnClick?: () => void;
  primaryLabel: string;
  primaryIcon?: ReactNode;
  primaryDisabled?: boolean;
  primaryBusy?: boolean;
  secondaryHref?: string | null;
  secondaryLabel?: string;
  live?: "polite" | "assertive";
}

export function PaymentStatusCard({
  icon,
  iconWrapperClassName,
  title,
  message,
  primaryHref,
  primaryOnClick,
  primaryLabel,
  primaryIcon,
  primaryDisabled,
  primaryBusy,
  secondaryHref = "/",
  secondaryLabel = "Voltar à vitrine",
  live,
}: PaymentStatusCardProps) {
  const primaryClassName = `w-full squircle-border bg-turquesa-deep text-white font-bold py-4 text-sm flex items-center justify-center ${primaryIcon ? "gap-2" : ""} hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100`;

  return (
    <div className="flex flex-col items-center text-center gap-6 w-full max-w-md squircle-border px-4 sm:px-6 py-8 bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className={iconWrapperClassName}>
        {icon}
      </div>

      <div
        className="flex flex-col gap-2"
        role={live ? "status" : undefined}
        aria-live={live}
      >
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-texto-sobre-escuro text-sm leading-relaxed break-words">
          {message}
        </p>
      </div>

      {primaryOnClick ? (
        <button
          type="button"
          onClick={primaryOnClick}
          disabled={primaryDisabled}
          aria-busy={primaryBusy}
          className={primaryClassName}
        >
          {primaryIcon}
          {primaryLabel}
        </button>
      ) : primaryHref ? (
        <Link href={primaryHref} className={primaryClassName}>
          {primaryIcon}
          {primaryLabel}
        </Link>
      ) : null}

      {secondaryHref ? (
        <Link
          href={secondaryHref}
          className="inline-flex items-center min-h-11 text-xs md:text-sm text-texto-sobre-escuro hover:text-white/60 transition-colors"
        >
          {secondaryLabel}
        </Link>
      ) : null}
    </div>
  );
}
