'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button/button";
import { BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BannerProps {
    totalMateriais?: number;
    userName: string;
}

export function Banner({ totalMateriais, userName }: BannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="squircle-border bg-white border border-borda overflow-hidden"
        >
            <div className="bg-linear-to-br from-turquesa/5 to-turquesa-dark/10 px-6 py-6 md:px-8 md:py-7">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-turquesa-dark/10 border border-turquesa-dark/20 flex items-center justify-center shrink-0">
                        <BookOpen className="w-6 h-6 text-turquesa-dark" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p className="text-sm text-texto-secundario">
                            Olá, <span className="font-semibold text-turquesa-dark">{userName}</span> 👋
                        </p>
                        {totalMateriais && totalMateriais > 0 ? (
                            <>
                                <h1 className="text-xl md:text-2xl font-bold text-texto-principal">Continue de onde parou</h1>
                                <p className="text-sm text-texto-terciario leading-relaxed">
                                    Você tem <span className="font-semibold text-turquesa-dark">{totalMateriais} {totalMateriais === 1 ? 'material disponível' : 'materiais disponíveis'}</span>.
                                    Cada página é um passo a mais no seu aprendizado.
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-xl md:text-2xl font-bold text-texto-principal">Transforme sua <span className="text-turquesa-dark">forma de aprender</span></h1>
                                <p className="text-sm text-texto-terciario leading-relaxed">
                                    Explore a vitrine e encontre o material perfeito para você.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function BannerNoMaterials() {
    const router = useRouter();

    function handleGoToVitrine() {
        router.push("/");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center gap-4 bg-white border border-borda-med rounded-2xl squircle-border p-8 shadow-sm"
        >
            <div className="w-14 h-14 rounded-xl bg-rosa-rose/10 border border-rosa-rose/20 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-rosa-rose" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-texto-principal">Nenhum material ainda</h3>
                <p className="text-sm text-texto-terciario max-w-sm">
                    Explore a vitrine e adquira seu primeiro material de estudo.
                </p>
            </div>
            <div className="w-full sm:w-72">
                <Button name="Ir para a vitrine" loadingName="Indo para a vitrine..." onClick={handleGoToVitrine} />
            </div>
        </motion.div>
    );
}
