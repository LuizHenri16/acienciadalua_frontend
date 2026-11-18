'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const navSections = [
    { id: "banner", label: "Início" },
    { id: "para-estudar", label: "Para Estudar" },
    { id: "para-dar-aula", label: "Para Dar Aula" },
    { id: "sobre", label: "Sobre" },
    { id: "faq", label: "FAQ" },
] as const;

type SectionId = (typeof navSections)[number]["id"];

export function SiteHeader() {
    const router = useRouter();
    const reduceMotion = useReducedMotion();

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId>("banner");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        let ticking = false;

        const updateOnScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 40);

            const nearBottom =
                window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
            if (nearBottom) {
                setActiveSection("faq");
                ticking = false;
                return;
            }

            const marker = scrollY + 160;
            let current: SectionId = "banner";

            for (const section of navSections) {
                const el = document.getElementById(section.id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top + scrollY;
                if (marker >= top) {
                    current = section.id;
                }
            }

            setActiveSection(current);
            ticking = false;
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateOnScroll);
        };

        updateOnScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    function handleNavigate(id: SectionId) {
        setActiveSection(id);
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }
    }

    return (
        <header
            className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
                isScrolled
                    ? "px-3 sm:px-6 pt-3"
                    : "px-0 pt-0 bg-linear-to-b from-marinho/75 to-transparent"
            }`}
        >
            <nav
                aria-label="Navegação principal"
                className={`mx-auto flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ease-out ${
                    isScrolled
                        ? "max-w-6xl px-3 sm:px-6 py-2 squircle-border bg-marinho/90 backdrop-blur-md border border-white/12 shadow-[0_8px_32px_rgba(10,8,35,0.35)]"
                        : "max-w-7xl px-4 sm:px-10 lg:px-14 py-3 squircle-border-sm border border-transparent bg-transparent"
                }`}
            >
                <a
                    href="#banner"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("banner");
                    }}
                    className="flex flex-row items-center gap-1.5 sm:gap-2 py-1 cursor-pointer shrink-0"
                    aria-label="Ir para o início da página"
                >
                    <Image
                        src="/acienciadalua-logo-var1.svg"
                        alt="A ciência da Lua - logo"
                        width={36}
                        height={36}
                        className="w-7 h-7 sm:w-9 sm:h-9"
                    />
                    <span className="font-unkempt text-[15px] min-[380px]:text-lg sm:text-2xl lg:text-[1.65rem] text-ouro whitespace-nowrap">
                        A Ciência da <span className="text-turquesa-dark">Lua</span>
                    </span>
                </a>

                <div className="hidden lg:flex items-center gap-1">
                    {navSections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigate(section.id);
                                }}
                                aria-current={isActive ? "page" : undefined}
                                className={`relative px-3.5 py-1.5 squircle-border text-xs lg:text-sm transition-colors duration-200 whitespace-nowrap ${
                                    isActive
                                        ? "text-white font-semibold"
                                        : "text-white/75 hover:text-white font-medium"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="header-active-pill"
                                        transition={
                                            reduceMotion
                                                ? { duration: 0 }
                                                : { type: "spring", stiffness: 380, damping: 32 }
                                        }
                                        className="absolute inset-0 squircle-border bg-linear-to-b from-white/28 via-white/12 to-white/8 backdrop-blur-md backdrop-saturate-150 border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(109,213,202,0.18),0_4px_14px_rgba(10,8,35,0.3)]"
                                    />
                                )}
                                <span className="relative z-10">{section.label}</span>
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={() => router.push("/minha-conta/signin")}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-marinho text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 squircle-border shadow-xs hover:bg-turquesa-light transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
                    >
                        <User size={14} strokeWidth={2.2} className="shrink-0" />
                        <span>Minha conta</span>
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
                    {navSections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigate(section.id);
                                }}
                                aria-current={isActive ? "page" : undefined}
                                className={`px-4 py-2.5 squircle-border-sm text-sm transition-colors ${
                                    isActive
                                        ? "bg-linear-to-b from-white/24 via-white/12 to-white/8 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold"
                                        : "text-white/75 hover:bg-white/8 hover:text-white"
                                }`}
                            >
                                {section.label}
                            </a>
                        );
                    })}
                </div>
            )}
        </header>
    );
}
