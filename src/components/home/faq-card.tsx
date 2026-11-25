'use client'

import { Plus, X } from "lucide-react";
import { useState, useRef, useEffect, useId } from "react";

export interface FaqCardProps {
    question: string;
    answers: string[];
    isOpen: boolean;
    onToggle: () => void;
}

export function FaqCard({ question, answers, isOpen, onToggle }: FaqCardProps) {

    const [height, setHeight] = useState("0px");
    const contentRef = useRef<HTMLDivElement>(null);
    const contentId = useId();
    const questionId = useId();

    useEffect(() => {
        if (!contentRef.current) return;
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }, [isOpen, answers]);

    return (
        <div
            className={`relative overflow-hidden w-full flex flex-col squircle-border backdrop-blur-xl backdrop-saturate-150 border px-4 sm:px-6 py-4 transition-all duration-200 ${
                isOpen
                    ? "bg-linear-to-b from-white/[0.19] via-white/[0.10] to-turquesa/[0.08] border-turquesa/45 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(109,213,202,0.24),0_10px_28px_rgba(8,6,28,0.36)]"
                    : "bg-linear-to-b from-white/[0.14] via-white/[0.07] to-white/[0.04] border-white/[0.22] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.34),inset_0_-1px_2px_rgba(109,213,202,0.12),0_6px_20px_rgba(8,6,28,0.28)] hover:from-white/[0.18] hover:via-white/[0.09] hover:to-white/[0.05] hover:border-white/[0.32]"
            }`}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/55 to-transparent"
            />
            <h3 id={questionId} className="relative z-10 w-full">
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={onToggle}
                    className="-my-2 flex w-full cursor-pointer items-center justify-between gap-4 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquesa"
                >
                    <span className="font-semibold text-base sm:text-[17px] text-white">{question}</span>
                    <span
                        aria-hidden="true"
                        className={`w-7 h-7 rounded-full backdrop-blur-md border flex items-center justify-center shrink-0 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.42)] ${
                            isOpen
                                ? "bg-turquesa/25 border-turquesa/45 text-turquesa"
                                : "bg-white/[0.12] border-white/25 text-white/90"
                        }`}
                    >
                        {isOpen ? <X size={14} strokeWidth={2.2} /> : <Plus size={14} strokeWidth={2.2} />}
                    </span>
                </button>
            </h3>

            <div
                ref={contentRef}
                id={contentId}
                role="region"
                aria-labelledby={questionId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                style={{
                    maxHeight: height,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                }}
                className="relative z-10 w-full"
            >
                <div className="pt-3 pb-1 flex flex-col gap-2">
                    {answers.map((answer, index) => (
                        <p key={index} className="text-sm sm:text-[15px] text-white/80 leading-relaxed">
                            {answer}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
