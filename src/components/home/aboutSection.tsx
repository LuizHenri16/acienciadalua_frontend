export function AboutSection() {
    const badges = [
        "+9 anos de experiência",
        "Licenciada pela UFRN",
        "Especialista em Bioquímica",
    ];

    return (
        <article className="bg-white squircle-border overflow-hidden border-2 border-borda flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-64 md:h-auto bg-linear-to-br from-[#7c4dbe] to-[#5a368f] flex items-center justify-center p-8">
                <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20" />
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 md:p-12 md:w-2/3">

                <h2 className="text-2xl md:text-3xl font-bold text-texto-principal  leading-tight">
                    Quem comanda o laboratório?
                </h2>

                <p className="text-sm md:text-base text-texto-secundario leading-relaxed font-medium">
                    Sou a Prof<sup>a</sup> Lua, formada em Química pela UFRN.
                    Com quase 10 anos de experiência, percebi que o problema
                    não é a matéria — é o método. Minha missão é tornar o aprendizado leve e eficaz.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {badges.map((badge) => (
                        <span key={badge} className="bg-petroleo text-white text-[10px] tracking-wider md:text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap shadow-sm">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}