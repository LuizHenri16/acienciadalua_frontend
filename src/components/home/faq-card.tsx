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
            className="w-full flex flex-col squircle-border bg-white px-4 sm:px-6 py-4 transition-all shadow-[0_2px_10px_rgba(30,27,75,0.03)]"
        >
            <h3 id={questionId} className="w-full">
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={onToggle}
                    className="-my-2 flex w-full cursor-pointer items-center justify-between gap-4 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquesa-dark"
                >
                    <span className="font-semibold text-sm sm:text-[15px] text-marinho">{question}</span>
                    <span
                        aria-hidden="true"
                        className="w-7 h-7 rounded-full bg-[#F4F3FA] text-marinho flex items-center justify-center shrink-0 transition-colors"
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
                className="w-full"
            >
                <div className="pt-3 pb-1 flex flex-col gap-2">
                    {answers.map((answer, index) => (
                        <p key={index} className="text-xs sm:text-sm text-texto-secundario leading-relaxed">
                            {answer}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
