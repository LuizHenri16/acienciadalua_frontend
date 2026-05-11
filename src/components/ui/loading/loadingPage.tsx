import { HashLoader } from "react-spinners"

export const LoadingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFB] gap-6">
            <HashLoader color="#68B999" size={60} />

            <div className="flex flex-col items-center gap-2">
                <p className="text-[#3D6B5C] font-bold tracking-[0.3em] uppercase animate-pulse">
                    Buscando produto
                </p>
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#68B999] animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1 h-1 rounded-full bg-[#68B999] animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1 h-1 rounded-full bg-[#68B999] animate-bounce" />
                </div>
            </div>
        </div>
    );
};