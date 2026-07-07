"use client";

import { WatchIcon, GraduationCap, Microscope } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
    const badges = [
        { icon: WatchIcon, title: "+9 anos de experiência", iconClass: "text-turquesa-dark" },
        { icon: GraduationCap, title: "Bacharel em Química do Petróleo", iconClass: "text-turquesa-dark" },
        { icon: GraduationCap, title: "Licenciada em Química", iconClass: "text-turquesa-dark" },
        { icon: Microscope, title: "Mestranda em Química", iconClass: "text-rosa-rose" },
    ];

    return (
        <motion.article
            id="como-funciona"
            className="squircle-border overflow-hidden border-2 border-borda"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full h-80 md:w-48 md:h-auto md:min-h-full shrink-0">
                    <Image quality={100} src="/foto.png" alt="Profa. Lua" loading="eager" fill className="object-cover object-top" />
                    <div className="absolute inset-0 bg-linear-to-t from-marinho/80 to-transparent md:hidden flex items-end px-5 py-4">
                        <div>
                            <p className="text-white font-extrabold text-lg leading-tight tracking-tight">Profa. Lua</p>
                            <p className="text-texto-terciario text-sm mt-0.5">Química · UFRN · Mestranda</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-marinho md:bg-transparent">
                    <div className="hidden md:flex bg-marinho px-8 py-6">
                        <div className="flex flex-col justify-center gap-1">
                            <p className="text-white font-extrabold text-lg leading-tight tracking-tight">Profa. Lua</p>
                            <p className="text-texto-terciario text-sm mt-0.5">Química · UFRN · Mestranda</p>
                        </div>
                    </div>

                    <div className="bg-white flex flex-col gap-8 px-8 py-7">
                        <p className="text-sm md:text-lg text-marinho leading-relaxed tracking-wider border-l-2 border-rosa-rose pl-2 italic">
                            Percebi que a maior dificuldade dos alunos não é a matéria em si, mas a forma como ela é apresentada.
                        </p>
                        <p className="text-sm text-texto-secundario leading-relaxed">
                            Sou a Prof<sup>a</sup> Lua, Bacharel em Química do Petróleo e Licenciada em Química pela UFRN, atualmente Mestranda em Química. Com quase uma década de experiência em aulas particulares e atuação em laboratórios escolares do Ensino Fundamental ao Médio, percebi que quando a matéria é apresentada do jeito certo, tudo muda. Por isso desenvolvi materiais baseados em mapas conceituais para quem quer aprender de verdade, ou ensinar com mais impacto.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {badges.map((badge, index) => (
                                <motion.div
                                    key={badge.title}
                                    className="bg-rosa-rose/10 border border-rosa-rose/20 rounded-xl p-3 flex items-center gap-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <badge.icon className={`w-5 h-5 shrink-0 ${badge.iconClass}`} />
                                    <span className="text-xs font-medium text-marinho leading-snug">{badge.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}