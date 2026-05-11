export function BannerSection() {
    return (
        <div className="banner flex flex-col justify-center gap-3 px-6 py-10 md:py-16 md:px-12">
            <p className="text-sm md:text-md font-medium tracking-[0.2em] text-[#5A5A58]">
                Estude com <span className="text-[#68B999]">método e intenção</span>
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-[#171717] leading-[1.1] max-w-2xl">
                Transforme sua <span className="text-[#68B999]">forma de aprender</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-500 max-w-xl leading-relaxed">
                Materiais de estudo exclusivos para <span className="font-bold text-[#68B999]">gabaritar</span> ou dar uma aula inesquecível para seus alunos.
            </p>
        </div>
    );
}