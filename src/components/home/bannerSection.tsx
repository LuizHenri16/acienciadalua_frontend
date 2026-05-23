import { Circle } from "lucide-react";

export function BannerSection() {
    return (
        <section className="flex flex-col justify-center gap-8 py-14 md:py-16">
            <div className="w-fit inline-flex items-center gap-2 bg-turquesa/10 border-[0.02rem] border-turquesa/30 rounded-2xl py-1 px-2">
                <div className="rounded-full bg-turquesa p-[0.26rem] flex"></div>
                <p className="text-[.7rem] uppercase tracking-wide text-turquesa">
                    materiais exclusivos
                </p>
            </div>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] max-w-2xl">
                Aprenda com <span className="text-turquesa">método</span> e <span className="text-ouro">intenção</span>
            </h1>
            <p className="text-sm md:text-lg text-texto-terciario tracking-wider leading-relaxed">
                Materiais de estudo exclusivos para <span className="font-bold text-turquesa">gabaritar</span> ou dar uma aula inesquecível para seus alunos.
            </p>
        </section>
    );
}