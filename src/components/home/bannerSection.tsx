"use client";
import { ArrowRight } from "lucide-react";
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
        <section id="banner" className="flex flex-col justify-center gap-8 py-10 md:py-12">
            <div className="w-fit inline-flex items-center gap-2 bg-rosa-rose/10 border-[0.02rem] border-rosa-rose/30 shadow-rosa-rose/20 shadow-sm rounded-2xl py-1 px-3 animate-pulse">
                <div className="rounded-full bg-rosa-rose p-[0.26rem]"></div>
                <p className="text-[.7rem] uppercase tracking-wide text-rosa-rose font-semibold">
                    materiais exclusivos
                </p>
            </div>

            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight max-w-2xl">
                Aprenda com <span className="text-turquesa">método</span> e{" "}
                <span className="text-rosa-rose">intenção</span>
            </h1>

            <p className="text-sm md:text-base text-texto-terciario tracking-wide leading-relaxed max-w-md">
                Materiais de estudo exclusivos para você <span className="font-bold text-turquesa">aprender</span> de um jeito leve e eficaz,{" "}
                ou dar uma aula inesquecível para seus alunos.
            </p>

            <div className="flex items-center gap-4">
                <button onClick={() => scrollTo("produtos")} className="inline-flex items-center gap-1 bg-turquesa-dark text-white text-sm font-bold px-6 py-3 squircle-border hover:shadow-sm hover:shadow-turquesa/30 hover:brightness-110 transition-all cursor-pointer">
                    Ver materiais
                    <ArrowRight size={15} />
                </button>
                <button onClick={() => scrollTo("faq")} className=" inline-flex items-center gap-1 text-texto-terciario text-sm hover:text-turquesa hover:gap-2 transition-all cursor-pointer">
                    Como funciona
                    <ArrowRight size={14} />
                </button>
            </div>

            <div ref={ufrnRef} className="flex items-stretch gap-0 border-t border-white/[0.07] pt-6 mt-2">
                <div className="flex flex-col gap-1 px-6">
                    <span className="text-2xl font-extrabold text-white tracking-tight">
                        <span ref={ref}>{count}</span> <span className="text-turquesa">anos</span>
                    </span>
                    <span className="text-[0.7rem] text-texto-terciario leading-snug">
                        de<br />experiência
                    </span>
                </div>
                <div className="flex flex-col gap-1 pl-6 border-l border-white/[0.07]">
                    <span
                        className="text-2xl font-extrabold text-turquesa tracking-tight transition-opacity duration-700"
                        style={{ opacity: ufrnVisible ? 1 : 0 }}
                    >
                        UFRN
                    </span>
                    <span className="text-[0.7rem] text-texto-terciario leading-snug">
                        Licenciada<br />em Química
                    </span>
                </div>
            </div>
        </section>
    );
}