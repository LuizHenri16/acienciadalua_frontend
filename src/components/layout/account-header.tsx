'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { clearCustomerToken } from "@/lib/auth/cookies";

interface AccountHeaderProps {
  userName?: string;
}

const NAV_LINKS = [
  { href: "/", label: "Vitrine", active: false },
  { href: "/produtos", label: "Catálogo", active: false },
  { href: "/minha-conta", label: "Minha conta", active: true },
] as const;

export function AccountHeader({ userName }: AccountHeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolledRef = useRef(false);

  const trimmedName = userName?.trim() || "";
  const firstName = trimmedName ? trimmedName.split(/\s+/)[0] : "";
  const initial = firstName ? firstName.charAt(0).toUpperCase() : "M";

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolled = window.scrollY > 40;
      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled;
        setIsScrolled(scrolled);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  const handleExit = () => {
    setMobileOpen(false);
    clearCustomerToken();
    router.push("/");
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "px-3 sm:px-6 pt-3"
          : "px-0 pt-0 bg-linear-to-b from-marinho/75 to-transparent"
      }`}
    >
      <nav
        aria-label="Navegação da conta"
        className={`mx-auto flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ease-out ${
          isScrolled
            ? "max-w-6xl px-3 sm:px-6 py-2 squircle-border bg-marinho/90 backdrop-blur-md mobile-no-blur border border-white/12 shadow-[0_8px_32px_rgba(10,8,35,0.35)]"
            : "max-w-7xl px-4 sm:px-10 lg:px-14 py-3 squircle-border-sm border border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className={`flex flex-row items-center py-1 cursor-pointer shrink-0 transition-all duration-300 ease-out ${
            isScrolled ? "gap-0 sm:gap-2" : "gap-1.5 sm:gap-2"
          }`}
          aria-label="Ir para a vitrine"
        >
          <Image
            src="/logo.webp"
            alt="A Ciência da Lua - logo"
            width={36}
            height={36}
            className="w-7 h-7 sm:w-9 sm:h-9 shrink-0"
          />
          <Image
            src="/wordmark.webp"
            alt=""
            aria-hidden="true"
            width={575}
            height={62}
            sizes="(min-width: 1024px) 250px, (min-width: 640px) 210px, 155px"
            className={`w-[130px] min-[380px]:w-[155px] sm:w-[210px] lg:w-[250px] h-auto overflow-hidden inline-block transition-all duration-300 ease-out ${
              isScrolled
                ? "max-w-0 opacity-0 sm:max-w-[250px] sm:opacity-100"
                : "max-w-[250px] opacity-100"
            }`}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`relative px-3.5 py-1.5 squircle-border text-xs lg:text-sm transition-colors duration-200 whitespace-nowrap ${
                item.active
                  ? "text-white font-semibold"
                  : "text-white/75 hover:text-white font-medium"
              }`}
            >
              {item.active && (
                <span
                  aria-hidden="true"
                  className="nav-pill-enter absolute inset-0 squircle-border bg-linear-to-b from-white/28 via-white/12 to-white/8 backdrop-blur-md backdrop-saturate-150 border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(109,213,202,0.18),0_4px_14px_rgba(10,8,35,0.3)]"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {firstName && (
            <div className="hidden sm:inline-flex items-center gap-2 pr-1 text-white/90">
              <span
                aria-hidden="true"
                className="w-7 h-7 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-center shrink-0 select-none"
              >
                {initial}
              </span>
              <span className="text-xs font-medium max-w-[110px] truncate">
                {firstName}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={handleExit}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-marinho text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 squircle-border shadow-xs hover:bg-turquesa-light transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
          >
            <LogOut size={14} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
            <span>Sair</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden mx-auto max-w-6xl mt-2 px-4 py-3 squircle-border bg-marinho/95 backdrop-blur-md border border-white/12 shadow-xl flex flex-col gap-1">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={item.active ? "page" : undefined}
              className={`px-4 py-2.5 squircle-border-sm text-sm transition-colors ${
                item.active
                  ? "bg-linear-to-b from-white/24 via-white/12 to-white/8 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold"
                  : "text-white/75 hover:bg-white/8 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
