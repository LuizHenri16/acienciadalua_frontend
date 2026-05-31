'use client'

import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export interface FaqCardProps {
    question: string;
    answers: string[];
}

export function FaqCard({ question, answers }: FaqCardProps) {

    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div onClick={() => setOpen(!open)} className={`w-full flex flex-col items-center p-4 squircle-border border bg-[#fafafa] cursor-pointer transition-all ${open ? "border-rosa-rose border-l-4" : "border-borda hover:border-borda-med"}`}>
            <div className="w-full flex items-center gap-3">
                <h3 className="font-medium text-sm lg:text-base text-texto-principal">{question}</h3>
                <ChevronDown className={`ml-auto flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-rosa-rose" : "text-texto-terciario"}`} />
            </div>

            <div
                ref={contentRef}
                style={{
                    maxHeight: open ? contentRef.current?.scrollHeight + "px" : "0px",
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