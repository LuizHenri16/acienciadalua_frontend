'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
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
    const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrolledRef = useRef(false);
    const activeRef = useRef<SectionId>("banner");
    const offsetsRef = useRef<{ id: SectionId; top: number }[]>([]);
    const navLockRef = useRef<{ id: SectionId; until: number } | null>(null);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            const measured: { id: SectionId; top: number }[] = [];
            for (const section of navSections) {
                const el = document.getElementById(section.id);
                if (el) {
                    measured.push({
                        id: section.id,
                        top: el.getBoundingClientRect().top + window.scrollY,
                    });
                }
            }
            measured.sort((a, b) => a.top - b.top);
            offsetsRef.current = measured;
        };

        const update = () => {
            frame = 0;
            const scrollY = window.scrollY;
            const scrolled = scrollY > 40;
            if (scrolled !== scrolledRef.current) {
                scrolledRef.current = scrolled;
                setIsScrolled(scrolled);
            }

            const lock = navLockRef.current;
            if (lock) {
                if (performance.now() < lock.until) {
                    if (lock.id !== activeRef.current) {
                        activeRef.current = lock.id;
                        setActiveSection(lock.id);
                    }
                    return;
                }
                navLockRef.current = null;
            }

            if (offsetsRef.current.length === 0) {
                measure();
            }

            const nearBottom =
                window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;

            let current: SectionId = nearBottom ? "faq" : "banner";
            if (!nearBottom) {
                const marker = scrollY + Math.min(220, Math.round(window.innerHeight * 0.3));
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

        const clearLock = () => {
            navLockRef.current = null;
        };

        measure();
        schedule();

        // Watch for async Suspense sections (#para-estudar, #para-dar-aula) streaming in
        // and any dynamic layout shifts (images, tabs, FAQ accordions).
        const mainTarget = document.getElementById("main-content") ?? document.body;
        const resizeObserver = new ResizeObserver(remeasure);
        resizeObserver.observe(document.body);
        if (mainTarget !== document.body) {
            resizeObserver.observe(mainTarget);
        }

        const mutationObserver = new MutationObserver(remeasure);
        mutationObserver.observe(mainTarget, { childList: true, subtree: true });

        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", remeasure, { passive: true });
        window.addEventListener("wheel", clearLock, { passive: true });
        window.addEventListener("touchstart", clearLock, { passive: true });
        window.addEventListener("keydown", clearLock, { passive: true });

        return () => {
            window.cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", remeasure);
            window.removeEventListener("wheel", clearLock);
            window.removeEventListener("touchstart", clearLock);
            window.removeEventListener("keydown", clearLock);
        };
    }, []);

    function handleNavigate(id: SectionId) {
        activeRef.current = id;
        setActiveSection(id);
        setMobileOpen(false);

        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        navLockRef.current = prefersReduced
            ? null
            : { id, until: performance.now() + 750 };

        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({
                behavior: prefersReduced ? "auto" : "smooth",
                block: "start",
            });
        }
    }

    return (
        <MotionConfig reducedMotion="user">
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

                    <div
                        className="hidden lg:flex items-center gap-1"
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        {navSections.map((section) => {
                            const isActive = activeSection === section.id;
                            const isHovered = hoveredSection === section.id;
                            return (
                                <motion.a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigate(section.id);
                                    }}
                                    onMouseEnter={() => setHoveredSection(section.id)}
                                    onFocus={() => setHoveredSection(section.id)}
                                    onBlur={() => setHoveredSection(null)}
                                    whileTap={{ scale: 0.96 }}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative px-3.5 py-1.5 squircle-border text-xs lg:text-sm transition-colors duration-200 whitespace-nowrap ${
                                        isActive
                                            ? "text-white font-semibold"
                                            : "text-white/75 hover:text-white font-medium"
                                    }`}
                                >
                                    {isHovered && !isActive && (
                                        <motion.span
                                            layoutId="header-hover-nav"
                                            aria-hidden="true"
                                            transition={{
                                                type: "spring",
                                                stiffness: 480,
                                                damping: 36,
                                            }}
                                            className="absolute inset-0 squircle-border bg-white/10"
                                        />
                                    )}
                                    {isActive && (
                                        <motion.span
                                            layoutId="header-active-nav"
                                            aria-hidden="true"
                                            transition={{
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 34,
                                                mass: 0.85,
                                            }}
                                            className="absolute inset-0 squircle-border bg-linear-to-b from-white/28 via-white/12 to-white/8 backdrop-blur-md backdrop-saturate-150 border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(109,213,202,0.18),0_4px_14px_rgba(10,8,35,0.3)]"
                                        />
                                    )}
                                    <span className="relative z-10">{section.label}</span>
                                </motion.a>
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

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:hidden mx-auto max-w-6xl mt-2 px-4 py-3 squircle-border bg-marinho/95 backdrop-blur-md border border-white/12 shadow-xl flex flex-col gap-1 origin-top"
                        >
                            {navSections.map((section) => {
                                const isActive = activeSection === section.id;
                                return (
                                    <motion.a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigate(section.id);
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`relative px-4 py-2.5 squircle-border-sm text-sm transition-colors ${
                                            isActive
                                                ? "text-white font-semibold"
                                                : "text-white/75 hover:bg-white/8 hover:text-white"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="mobile-active-nav"
                                                aria-hidden="true"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 420,
                                                    damping: 34,
                                                }}
                                                className="absolute inset-0 squircle-border-sm bg-linear-to-b from-white/24 via-white/12 to-white/8 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                                            />
                                        )}
                                        <span className="relative z-10">{section.label}</span>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </MotionConfig>
    );
}
