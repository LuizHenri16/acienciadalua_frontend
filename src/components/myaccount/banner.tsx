'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button/button";

interface BannerProps {
    totalMateriais?: number;
    userName: string;
}

export function Banner({ totalMateriais, userName }: BannerProps) {
    return (totalMateriais && totalMateriais > 0) ? (
        <div className="banner flex flex-col gap-2 px-4">
            <p className="text-sm">Olá, {userName}👋!</p>
            <h1 className="text-2xl font-bold">Continue de onde parou</h1>
            <p className="text-sm">Você tem {totalMateriais} materiais disponíveis. Cada página é um passo a mais no seu aprendizado</p>
        </div>
    ) : (
        <div className="banner flex flex-col gap-2 px-4 py-6">
            <p className="text-sm">Seja <span className="text-green-light-custom">Bem-vindo, </span> {userName}👋</p>
            <h1 className="text-2xl font-bold">Transforme sua <span className="text-green-light-custom">forma de aprender</span></h1>
        </div>
    );
}

export function BannerNoMaterials() {
    const router = useRouter();

    function handleGoToVitrine() {
        router.push("/");
    }

    return (
        <div className="flex flex-col justify-center items-center text-center gap-2 mt-4 bg-[#FEFFFF] border-[#68B999] border border-dashed p-6 rounded-2xl squircle-border">
            <h3 className="text-lg font-bold text-[#5A5A58]">Nenhum material ainda</h3>
            <p className="text-sm text-[#9e9e9e]">Explore a vitrine e adquira seu primeiro material de estudo.</p>

            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
                <Button name="Ir para a vitrine" loadingName="Indo para a vitrine..." onClick={handleGoToVitrine} />
            </div>
        </div>
    );
}