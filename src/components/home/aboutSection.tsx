export function AboutSection() {
    const badges = [
        "+9 anos de experiência",
        "Licenciada pela UFRN",
        "Especialista em Petroquímica",
    ];

    return (
        <article id="como-funciona" className="squircle-border overflow-hidden border-2 border-borda">

            {/* Header navy com avatar */}
            <div className="bg-marinho flex items-center gap-4 px-8 py-6">
                <div className="w-14 h-14 rounded-2xl bg-turquesa flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0c3330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                </div>
                <div>
                    <p className="text-white font-extrabold text-lg leading-tight tracking-tight">Profa. Lua</p>
                    <p className="text-texto-terciario text-sm mt-0.5">Química · UFRN · Especialista em Petroquímica</p>
                </div>
            </div>

            {/* Corpo */}
            <div className="bg-[#f2fcfa] flex flex-col gap-5 px-8 py-7">

                {/* Citação */}
                <p className="text-sm md:text-base text-[#234a44] leading-relaxed border-l-2 border-turquesa pl-4 italic">
                    Percebi que o problema não é a matéria — é o método.
                    Minha missão é tornar o aprendizado leve e eficaz.
                </p>

                {/* Bio */}
                <p className="text-sm text-texto-secundario leading-relaxed">
                    Sou a Prof<sup>a</sup> Lua, formada em Química pela UFRN.
                    Com quase 10 anos de experiência ensinando, desenvolvi materiais
                    pensados para quem quer aprender de verdade — ou ensinar com mais impacto.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {badges.map((badge) => (
                        <span key={badge} className="bg-marinho-light text-white text-[10px] tracking-wider md:text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap shadow-sm">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

        </article>
    );
}