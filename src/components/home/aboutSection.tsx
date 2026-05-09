export function AboutSection() {
    const badges = [
        "+9 anos de experiência",
        "Licenciada pela UFRN",
        "Especialista em Bioquímica",
    ];

    return (
        <div className="bg-[#fafafa] shadow-lg banner overflow-hidden">
            <div className="w-full h-44 bg-[#7c4dbe]"></div>
            <div className="flex flex-col gap-3 px-5 pt-5 pb-6">
                <h2 className="text-lg font-bold leading-snug text-[#171717]">
                    Quem comanda o laboratório?
                </h2>
                <p className="text-[.8rem] text-[#4a4a48] leading-relaxed">
                    Sou a Prof<sup>a</sup> Lua, formada em Química pela UFRN.
                    Com quase 10 anos de experiência, percebi que o problema
                    não é a matéria — é o método.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                    {badges.map((badge) => (
                        <span
                            key={badge}
                            className="bg-[#3D6B5C] text-white text-[0.7rem] font-medium px-4 py-1.5 rounded-full whitespace-nowrap"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}