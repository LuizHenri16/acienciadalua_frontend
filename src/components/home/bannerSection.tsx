"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useCountUp(target: number, duration: number = 1200) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return { count, ref };
}

export function BannerSection() {
    const { count, ref } = useCountUp(9, 1200);
    const [ufrnVisible, setUfrnVisible] = useState(false);
    const ufrnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTimeout(() => setUfrnVisible(true), 600); },
            { threshold: 0.5 }
        );
        if (ufrnRef.current) observer.observe(ufrnRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="banner" className="relative flex-1 flex flex-col md:flex-row gap-10 md:gap-12">
            <div className="flex flex-col flex-1 gap-4 justify-center">
                <h1 className="text-slate-100 font-sora text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight max-w-4xl">
                    Aprenda e ensine Química com <span className="text-turquesa font-caveat text-5xl md:text-6xl xl:text-7xl">método</span><span> e </span> 
                    <span className="text-rosa-rose font-caveat text-5xl md:text-6xl xl:text-7xl">intenção</span>
                </h1>

                <p className="text-sm md:text-base text-slate-300 tracking-wide leading-relaxed max-w-xl">
                    Materiais exclusivos criados para estudantes <span className="font-bold text-white">dominarem</span> a matéria e {" "}
                    professores prepararem aulas inesquecíveis com total leveza e <span className="font-bold text-turquesa-light">eficácia</span>.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <button onClick={() => scrollTo("produtos")} className="inline-flex items-center gap-1 bg-turquesa-dark text-white text-sm font-bold px-6 py-3 squircle-border hover:shadow-sm hover:shadow-turquesa/30 hover:brightness-110 transition-all cursor-pointer">
                        Ver materiais
                    </button>
                    <button onClick={() => scrollTo("faq")} className=" inline-flex items-center gap-1 text-cinza-azul text-sm hover:text-white hover:gap-2 transition-all cursor-pointer">
                        Como funciona
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div ref={ufrnRef} className="flex items-stretch gap-0 border-t border-white/[0.07] pt-6 mt-2">
                    <div className="flex flex-col gap-1 px-6">
                        <span className="text-2xl font-extrabold text-rosa-rose tracking-tight">
                            <span ref={ref}>{count}</span> <span className="text-rosa-rose">anos</span>
                        </span>
                        <span className="text-xs text-white/70 leading-snug">
                            de<br />experiência
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 pl-6 border-l border-white/[0.07]">
                        <span
                            className="text-2xl font-extrabold text-rosa-rose tracking-tight transition-opacity duration-700"
                            style={{ opacity: ufrnVisible ? 1 : 0 }}
                        >
                            UFRN
                        </span>
                        <span className="text-xs text-white/70 leading-snug">
                            Licenciada<br />em Química
                        </span>
                    </div>
                </div>
            </div>
            <div className="hidden md:block relative -bottom-5.5 w-full h-56 md:h-auto md:w-80 lg:w-126 md:flex-none">
                <Image
                    fill
                    src="/lua-person.png"
                    alt=""
                    sizes="(min-width: 1024px) 480px, (min-width: 768px) 320px, 100vw"
                    className="object-contain object-bottom [mask-image:linear-gradient(to_top,transparent_0%,black_3%)] gradient(to_top) [webkit-mask-image:linear-gradient(to_top,transparent_0%,black_35%)]"
                />
            </div>
        </section>
    );
}