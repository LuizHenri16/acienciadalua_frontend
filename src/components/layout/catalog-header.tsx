'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, User, UserIcon } from "lucide-react";

interface CatalogHeaderProps {
  variant?: "light" | "hero";
}

export function CatalogHeader({ variant = "light" }: CatalogHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (variant !== "hero") return;

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
  }, [variant]);

  if (variant === "hero") {
    return (
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "px-3 sm:px-6 pt-3"
            : "px-0 pt-0 bg-linear-to-b from-marinho/75 to-transparent"
        }`}
      >
        <nav
          aria-label="Navegação do catálogo"
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
            aria-label="Voltar para a vitrine"
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

          <Link
            href="/minha-conta/signin"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-marinho text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 squircle-border shadow-xs hover:bg-turquesa-light transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
          >
            <User size={14} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
            <span>Minha conta</span>
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-borda">
      <nav
        aria-label="Navegação do catálogo"
        className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 min-h-[var(--header-h)]"
      >
        <Link
          href="/"
          className="-m-3 flex items-center gap-2 p-3 text-texto-principal text-sm font-semibold hover:text-turquesa-deep transition-colors transition-opacity group"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2.5}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Vitrine
        </Link>

        <div className="hidden md:flex items-center gap-1 text-xs text-texto-terciario font-medium">
          <span
            className="opacity-50"
            style={{ fontFamily: "var(--font-unkempt)", fontSize: "1rem" }}
          >
            A Ciência da Lua
          </span>
          <span className="mx-2 opacity-30">/</span>
          <span className="text-turquesa-deep">Catálogo</span>
        </div>

        <Link
          href="/minha-conta/signin"
          className="-m-3 flex gap-1 items-center p-3 min-h-11 text-azul-med transition-opacity"
        >
          <UserIcon size={20} />
          <span className="text-xs">Minha conta</span>
        </Link>
      </nav>
    </header>
  );
}