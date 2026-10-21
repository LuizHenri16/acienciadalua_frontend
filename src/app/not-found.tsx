import { BackVitrine } from "@/components/ui/back-vitrine";
import { BackgroundLights } from "@/components/ui/background-lights";
import { NotFoundStory } from "@/components/ui/not-found-story";

export default function NotFound() {
    return (
        <main id="main-content" tabIndex={-1} className="min-h-dvh bg-marinho flex flex-col justify-center items-center relative px-4">
            <BackgroundLights />
            <div className="z-10 flex flex-col items-center w-full gap-4">
                <div className="">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-sora text-center text-white">Erro 404</h1>
                    <p className="text-lg md:text-xl lg:text-2xl font-sora font-bold text-center text-rosa-rose">Página não encontrada</p>
                </div>
                <NotFoundStory />
                <BackVitrine />
            </div>
        </main>
    );
}