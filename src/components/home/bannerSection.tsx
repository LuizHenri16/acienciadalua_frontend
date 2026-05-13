export function BannerSection() {
    return (
        <section className="squircle-border border-3 border-dashed border-turquesa bg-[#fafafa] flex flex-col justify-center gap-3 mt-2 px-6 py-10 md:py-16">
            <p className="text-sm md:text-md font-medium tracking-[0.2em] text-texto-secundario">
                Estude com <span className="text-turquesa-dark">método e intenção</span>
            </p>
            <h1 className="text-black text-3xl md:text-5xl font-bold leading-[1.1] max-w-2xl">
                Transforme sua <span className="text-turquesa-dark">forma de aprender</span>
            </h1>
            <p className="text-sm md:text-lg text-texto-secundario tracking-wider leading-relaxed">
                Materiais de estudo exclusivos para <span className="font-bold text-turquesa-dark">gabaritar</span> ou dar uma aula inesquecível para seus alunos.
            </p>
        </section>
    );
}