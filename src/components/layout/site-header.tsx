'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, User, X } from "lucide-react";

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

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId>("banner");
    const [mobileOpen, setMobileOpen] = useState(false);
    const scrolledRef = useRef(false);
    const activeRef = useRef<SectionId>("banner");
    const offsetsRef = useRef<{ id: SectionId; top: number }[]>([]);

    useEffect(() => {
        let frame = 0;

        // Section offsets are measured only on mount/resize, not on every
        // scroll frame. That avoids five layout reads per frame on mobile.
        const measure = () => {
            offsetsRef.current = navSections.map((section) => {
                const el = document.getElementById(section.id);
                return {
                    id: section.id,
                    top: el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY,
                };
            });
        };

        const update = () => {
            frame = 0;
            const scrollY = window.scrollY;
            const scrolled = scrollY > 40;
            if (scrolled !== scrolledRef.current) {
                scrolledRef.current = scrolled;
                setIsScrolled(scrolled);
            }

            const nearBottom =
                window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
            let current: SectionId = nearBottom ? "faq" : "banner";
            if (!nearBottom) {
                const marker = scrollY + 160;
                for (const section of offsetsRef.current) {
                    if (marker >= section.top) current = section.id;
                }
            }

            if (current !== activeRef.current) {
                activeRef.current = current;
                setActiveSection(current);
            }
        };

        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };

        const remeasure = () => {
            measure();
            schedule();
        };

        measure();
        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", remeasure, { passive: true });
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", remeasure);
        };
    }, []);

    function handleNavigate(id: SectionId) {
        setActiveSection(id);
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "auto", block: "start" });
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
                        ? "max-w-6xl px-3 sm:px-6 py-2 squircle-border bg-marinho/90 backdrop-blur-md mobile-no-blur border border-white/12 shadow-[0_8px_32px_rgba(10,8,35,0.35)]"
                        : "max-w-7xl px-4 sm:px-10 lg:px-14 py-3 squircle-border-sm border border-transparent bg-transparent"
                }`}
            >
                <a
                    href="#banner"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("banner");
                    }}
                    className={`flex flex-row items-center py-1 cursor-pointer shrink-0 transition-all duration-300 ease-out ${isScrolled ? "gap-0 sm:gap-2" : "gap-1.5 sm:gap-2"}`}
                    aria-label="Ir para o início da página"
                >
                    <Image
                        src="/logo.webp"
                        alt="A ciência da Lua - logo"
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
                                    <span aria-hidden="true" className="nav-pill-enter absolute inset-0 squircle-border bg-linear-to-b from-white/28 via-white/12 to-white/8 backdrop-blur-md backdrop-saturate-150 border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(109,213,202,0.18),0_4px_14px_rgba(10,8,35,0.3)]" />
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
