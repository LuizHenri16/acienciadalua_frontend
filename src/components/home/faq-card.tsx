import { Plus, X } from "lucide-react";

export interface FaqCardProps {
    question: string;
    answers: string[];
    defaultOpen?: boolean;
}

// Native <details> handles open/close in the browser. No state, no handlers,
// no re-renders: opening a card costs zero JavaScript on the phone.
//
// Mobile is deliberately flat: no glass, blur, translucent layers or inset
// highlights. Those effects are what make the accordion feel heavy on a real
// phone. The liquid-glass styling only comes back at sm+.
export function FaqCard({ question, answers, defaultOpen = false }: FaqCardProps) {
    return (
        <details
            name="faq"
            open={defaultOpen}
            className="group relative w-full flex flex-col overflow-hidden squircle-border border px-4 sm:px-6 py-4 bg-[#211C48] border-white/10 shadow-none transition-none open:bg-[#262056] open:border-turquesa/45 sm:bg-linear-to-b sm:from-white/[0.14] sm:via-white/[0.07] sm:to-white/[0.04] sm:border-white/[0.22] sm:backdrop-blur-xl sm:backdrop-saturate-150 sm:shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.34),inset_0_-1px_2px_rgba(109,213,202,0.12),0_6px_20px_rgba(8,6,28,0.28)] sm:transition-colors sm:duration-200 sm:hover:from-white/[0.18] sm:hover:via-white/[0.09] sm:hover:to-white/[0.05] sm:hover:border-white/[0.32] sm:open:bg-linear-to-b sm:open:from-white/[0.19] sm:open:via-white/[0.10] sm:open:to-turquesa/[0.08] sm:open:shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(109,213,202,0.24),0_10px_28px_rgba(8,6,28,0.36)]"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0 hidden h-px bg-linear-to-r from-transparent via-white/55 to-transparent sm:block"
            />
            <summary className="-my-2 flex w-full cursor-pointer list-none items-center justify-between gap-4 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquesa [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-base sm:text-[17px] text-white">{question}</span>
                <span
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 bg-white/10 border-white/15 text-white/90 shadow-none transition-none group-open:bg-turquesa/25 group-open:border-turquesa/45 group-open:text-turquesa sm:bg-white/[0.12] sm:border-white/25 sm:backdrop-blur-md sm:shadow-[inset_0_1px_1px_rgba(255,255,255,0.42)] sm:transition-colors"
                >
                    <Plus size={14} strokeWidth={2.2} className="group-open:hidden" />
                    <X size={14} strokeWidth={2.2} className="hidden group-open:block" />
                </span>
            </summary>

            <div className="relative z-10 pt-3 pb-1 flex flex-col gap-2">
                {answers.map((answer, i) => (
                    <p key={i} className="text-sm sm:text-[15px] text-white/80 leading-relaxed">
                        {answer}
                    </p>
                ))}
            </div>
        </details>
    );
}
