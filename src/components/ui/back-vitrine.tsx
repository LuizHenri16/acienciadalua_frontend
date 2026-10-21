import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackVitrineProps {
    tone?: "dark" | "light";
}

export function BackVitrine({ tone = "dark" }: BackVitrineProps) {
    const color = tone === "light" ? "text-azul-deep" : "text-azul-claro";

    return (
        <Link href="/" className={`flex items-center gap-1 cursor-pointer hover:gap-2 transition-all ${color}`}>
            <ArrowLeft size={16} /> <span className="font-medium text-sm"> Voltar à vitrine</span>
        </Link>
    );
}
