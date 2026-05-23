"use client";
import { ArrowRight } from "lucide-react";

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BannerSection() {
    return (
        <section className="flex flex-col justify-center gap-8 py-14 md:py-16 lg:py-28">
            <div className="w-fit inline-flex items-center gap-2 bg-turquesa/10 border-[0.02rem] border-turquesa/30 shadow-cyan-500/20 shadow-sm rounded-2xl py-1 px-3 animate-pulse">
                <div className="rounded-full bg-turquesa p-[0.26rem]"></div>
                <p className="text-[.7rem] uppercase tracking-wide text-turquesa font-semibold">
                    materiais exclusivos
                </p>
            </div>

            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight max-w-2xl">
                Aprenda com <span className="text-turquesa">método</span> e{" "}
                <span className="text-ouro">intenção</span>
            </h1>

            <p className="text-sm md:text-base text-texto-terciario tracking-wide leading-relaxed max-w-md">
                Materiais de estudo exclusivos para você <span className="font-bold text-turquesa">aprender</span> de um jeito leve e eficaz,{" "}
                ou dar uma aula inesquecível para seus alunos.
            </p>

            <div className="flex items-center gap-4">
                <button onClick={() => scrollTo("produtos")} className="inline-flex items-center gap-2 bg-turquesa text-marinho text-sm font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all cursor-pointer">
                    Ver materiais
                    <ArrowRight size={15} />
                </button>
                <button onClick={() => scrollTo("como-funciona")} className="inline-flex items-center gap-2 text-texto-terciario text-sm hover:text-turquesa transition-colors cursor-pointer">
                    Como funciona
                    <ArrowRight size={14} />
                </button>
            </div>

            <div className="flex items-stretch gap-0 border-t border-white/[0.07] pt-6 mt-2">
                <div className="flex flex-col gap-1 px-6">
                    <span className="text-2xl font-extrabold text-white tracking-tight">
                        9 <span className="text-turquesa">anos</span>
                    </span>
                    <span className="text-[0.7rem] text-texto-terciario leading-snug">
                        de<br />experiência
                    </span>
                </div>
                <div className="flex flex-col gap-1 pl-6 border-l border-white/[0.07]">
                    <span className="text-2xl font-extrabold text-turquesa tracking-tight">
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