"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
}

export function BannerSection() {
    return (
        <section id="banner" className="relative flex-1 flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 pt-4 pb-16 md:pt-0 md:pb-0">
            <div className="flex flex-col flex-1 gap-4 justify-center md:pb-14">
                <h1 className="text-slate-100 font-sora text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight max-w-4xl">
                    Aprenda e ensine Química com <span className="text-turquesa font-caveat text-5xl md:text-6xl xl:text-7xl">método</span><span> e </span>
                    <span className="text-rosa-rose font-caveat text-5xl md:text-6xl xl:text-7xl">intenção</span>
                </h1>

                <p className="text-sm md:text-base text-slate-300 tracking-wide leading-relaxed max-w-xl">
                    Materiais exclusivos criados para estudantes <span className="font-bold text-white">dominarem</span> a matéria e {" "}
                    professores prepararem aulas inesquecíveis com total leveza e <span className="font-bold text-turquesa-light">eficácia</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
                    <button onClick={() => scrollTo("produtos")} className="inline-flex items-center justify-center gap-1 w-full sm:w-auto bg-turquesa-deep text-white text-sm font-bold px-6 py-3 squircle-border hover:shadow-sm hover:shadow-turquesa/30 hover:brightness-110 transition-all cursor-pointer">
                        Ver materiais
                    </button>
                    <button onClick={() => scrollTo("faq")} className=" inline-flex items-center justify-center gap-1 w-full sm:w-auto text-cinza-azul text-sm hover:text-white hover:gap-2 transition-all cursor-pointer">
                        Como funciona
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div className="flex items-stretch gap-0 border-t border-white/[0.07] pt-6 mt-2">
                    <div className="flex flex-col gap-1 pr-6">
                        <span className="text-2xl font-extrabold text-rosa-rose tracking-tight">
                            <span className="stat-count" aria-hidden="true" />{" "}
                            <span className="text-rosa-rose" aria-hidden="true">anos</span>
                            <span className="sr-only">9 anos</span>
                        </span>
                        <span className="text-xs text-white/70 leading-snug">
                            de<br />experiência
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 pl-6 border-l border-white/[0.07]">
                        <span className="stat-reveal text-2xl font-extrabold text-rosa-rose tracking-tight">
                            UFRN
                        </span>
                        <span className="text-xs text-white/70 leading-snug">
                            Licenciada<br />em Química
                        </span>
                    </div>
                </div>
            </div>
            <div className="hidden md:block relative -bottom-5.5 w-full h-56 md:h-auto md:w-72 lg:w-[24rem] xl:w-[30rem] md:flex-none">
                <Image
                    fill
                    src="/lua-person.webp"
                    alt=""
                    sizes="(min-width: 1024px) 480px, (min-width: 768px) 320px, 100vw"
                    className="object-contain object-bottom mask-[linear-gradient(to_top,transparent_0%,black_3%)] gradient(to_top) [webkit-mask-image:linear-gradient(to_top,transparent_0%,black_35%)]"
                />
            </div>
        </section>
    );
}
