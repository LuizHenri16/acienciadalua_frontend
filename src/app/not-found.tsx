import { BackVitrine } from "@/components/ui/button/button";
import { BackgroundLights } from "@/components/ui/decor/BackgroundLights";
import { NotFoundStory } from "@/components/ui/decor/NotFoundStory";

export default function NotFound() {
    return (
        <main className="h-screen bg-marinho flex flex-col justify-center items-center relative">
            <BackgroundLights />
            <div className="z-10 flex flex-col items-center w-full gap-4">
                <div className="">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-sora text-center text-white">Erro 404</h2>
                    <p className="text-lg md:text-xl lg:text-2xl font-sora font-bold text-center text-rosa-rose">Página não encontrada</p>
                </div>
                <NotFoundStory />
                <BackVitrine />
            </div>
        </main>
    );
}