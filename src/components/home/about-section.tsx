import { Award, FlaskConical, GraduationCap, Microscope } from "lucide-react";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";

const badges = [
    {
        icon: Award,
        title: "+9 anos de experiência",
        boxClass: "bg-turquesa/15 text-turquesa-dark",
    },
    {
        icon: FlaskConical,
        title: "Bacharel em Química do Petróleo",
        boxClass: "bg-rosa-rose/12 text-rosa-deep",
    },
    {
        icon: GraduationCap,
        title: "Licenciada em Química",
        boxClass: "bg-turquesa/15 text-turquesa-dark",
    },
    {
        icon: Microscope,
        title: "Mestranda em Química",
        boxClass: "bg-rosa-rose/12 text-rosa-deep",
    },
];

export function AboutSection() {
    return (
        <AnimatedSection
            id="sobre"
            className="w-full py-6 md:py-12 overflow-x-clip"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -rotate-3 squircle-border bg-linear-to-br from-turquesa-light/40 via-[#F4F6FB] to-rosa-light/30"
                        />

                        <div className="relative aspect-[4/4.3] w-full squircle-border overflow-hidden shadow-lg">
                            <Image
                                src="/professor-foto.webp"
                                alt="Profa. Lua"
                                fill
                                sizes="(max-width: 640px) 340px, 370px"
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rosa-deep">
                        Quem está por trás
                    </span>

                    <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[2rem] text-marinho leading-[1.25] tracking-tight">
                        “Percebi que a maior dificuldade dos alunos não é a matéria em si, mas a{" "}
                        <span className="text-turquesa-dark">forma como ela é apresentada.</span>”
                    </blockquote>

                    <p className="text-sm sm:text-[15px] text-texto-secundario leading-relaxed">
                        Sou a Prof<sup>a</sup> Lua, Bacharel em Química do Petróleo e Licenciada em Química pela UFRN, atualmente Mestranda em Química. Com quase uma década de experiência em aulas particulares e atuação em laboratórios escolares do Ensino Fundamental ao Médio, percebi que quando a matéria é apresentada do jeito certo, tudo muda. Por isso desenvolvi materiais baseados em mapas conceituais para quem quer aprender de verdade, ou ensinar com mais impacto.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        {badges.map((badge) => (
                            <div
                                key={badge.title}
                                className="bg-[#F9F9FC] border border-borda/80 squircle-border px-4 py-3.5 flex items-center gap-3.5 shadow-[0_2px_10px_rgba(30,27,75,0.03)]"
                            >
                                <span className={`w-9 h-9 squircle-border-sm flex items-center justify-center shrink-0 ${badge.boxClass}`}>
                                    <badge.icon className="w-4.5 h-4.5" strokeWidth={2} />
                                </span>
                                <span className="text-xs font-semibold text-texto-principal leading-snug">
                                    {badge.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
