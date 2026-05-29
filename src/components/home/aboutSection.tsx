import { WatchIcon, GraduationCap, Microscope } from "lucide-react";

export function AboutSection() {
    const badges = [
        { icon: WatchIcon, title: "+9 anos de experiência", iconClass: "text-turquesa-dark" },
        { icon: GraduationCap, title: "Bacharel em Química do Petróleo", iconClass: "text-turquesa-dark" },
        { icon: GraduationCap, title: "Licenciada em Química", iconClass: "text-turquesa-dark" },
        { icon: Microscope, title: "Mestranda em Química", iconClass: "text-rosa-rose" },
    ];

    return (
        <article id="como-funciona" className="squircle-border overflow-hidden border-2 border-borda">
            <div className="bg-marinho flex items-center gap-4 px-8 py-6">
                <div className="w-20 h-20 rounded-2xl bg-turquesa-dark flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0c3330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                </div>
                <div>
                    <p className="text-white font-extrabold text-lg leading-tight tracking-tight">Profa. Lua</p>
                    <p className="text-texto-terciario text-sm mt-0.5">Química · UFRN · Mestranda</p>
                </div>
            </div>

            <div className="bg-white flex flex-col gap-8 px-8 py-7">
                <p className="text-sm md:text-lg text-marinho leading-relaxed tracking-wider border-l-2 border-rosa-rose pl-2 italic">
                    Percebi que a maior dificuldade dos alunos não é a matéria em si, mas a forma como ela é apresentada.
                </p>
                <p className="text-sm text-texto-secundario leading-relaxed">
                    Sou a Prof<sup>a</sup> Lua, Bacharel em Química do Petróleo e Licenciada em Química pela UFRN, atualmente Mestranda em Química. Com quase uma década de experiência em aulas particulares e atuação em laboratórios escolares do Ensino Fundamental ao Médio, percebi que quando a matéria é apresentada do jeito certo, tudo muda. Por isso desenvolvi materiais baseados em mapas conceituais — para quem quer aprender de verdade, ou ensinar com mais impacto.
                </p>
                <div className="flex flex-wrap gap-3">
                    {badges.map((badge) => (
                        <div key={badge.title} className="bg-purple-700/5 border border-purple-200 rounded-xl p-3 flex items-center gap-3">
                            <badge.icon className={`w-5 h-5 shrink-0 ${badge.iconClass}`} />
                            <span className="text-xs font-medium text-marinho leading-snug">{badge.title}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    );
}