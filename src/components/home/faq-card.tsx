'use client'

import { ChevronDown } from "lucide-react";
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
        <div className={`w-full flex flex-col items-center p-4 squircle-border border bg-[#fafafa] transition-all ${isOpen ? "border-rosa-rose bg-rosa-rose/[0.04]" : "border-borda hover:border-borda-med"}`}>
            <h3 id={questionId} className="w-full">
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={onToggle}
                    className="-my-3 flex w-full cursor-pointer items-center gap-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquesa-dark"
                >
                    <span className="font-medium text-sm text-texto-principal lg:text-base">{question}</span>
                    <ChevronDown className={`ml-auto shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-rosa-rose" : "text-texto-terciario"}`} />
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
                <ul className="list-disc ml-6 mt-2 mb-1 flex flex-col gap-2">
                    {answers.map((answer, index) => (
                        <li key={index} className="text-sm lg:text-base text-texto-secundario">{answer}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
