import Image from "next/image";

interface LoadingPageProps {
  message?: string;
  subtitle?: string;
  asMain?: boolean;
  variant?: "storefront" | "painel";
}

export const LoadingPage = ({
  message = "Carregando",
  subtitle = "Preparando os conteúdos para você",
  asMain = true,
  variant = "storefront",
}: LoadingPageProps) => {
  const Tag = asMain ? "main" : "div";
  const isPainel = variant === "painel";

  return (
    <Tag
      {...(asMain ? { id: "main-content", tabIndex: -1 } : {})}
      className={`min-h-dvh flex flex-col items-center justify-center px-4 ${
        isPainel ? "bg-[#F5F4F0]" : "bg-paper-texture"
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center text-center max-w-xs w-full">
        {/* Lunar orbital emblem */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-marinho/[0.08]"
          />
          <div
            aria-hidden="true"
            className="loading-orbit absolute inset-0 rounded-full border-2 border-transparent border-t-turquesa-deep border-r-marinho/30"
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ouro shadow-[0_0_10px_rgba(245,166,35,0.65)]" />
          </div>

          <div className="relative w-14 h-14 rounded-2xl bg-white shadow-[0_10px_28px_-10px_rgba(30,27,75,0.22)] flex items-center justify-center">
            <Image
              src="/logo.webp"
              alt="A Ciência da Lua"
              width={34}
              height={34}
              priority
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-base sm:text-lg font-bold text-marinho tracking-tight">
          {message}
        </p>
        <p className="text-xs sm:text-sm text-texto-secundario mt-1">
          {subtitle}
        </p>

        {/* Smooth indeterminate progress bar */}
        <div
          aria-hidden="true"
          className="mt-5 w-44 h-1.5 rounded-full bg-marinho/[0.08] overflow-hidden"
        >
          <div className="loading-progress-bar h-full w-1/2 rounded-full bg-linear-to-r from-marinho via-turquesa-deep to-ouro" />
        </div>
      </div>
    </Tag>
  );
};