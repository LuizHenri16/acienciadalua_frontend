'use client'

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FaqCardProps {
    question: string;
    answers: string[];
}

export function FaqCard({ question, answers }: FaqCardProps) {

    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div onClick={toggleOpen} className={`w-full flex flex-col items-center p-4 squircle-border border bg-[#fafafa] border-borda hover:border-borda-med cursor-pointer`}>
            <div className="w-full flex items-center gap-3 ">
                <h3 className="font-medium text-sm lg:text-base text-texto-principal">{question}</h3>
                <ChevronDown className={`ml-auto transition-all duration-300 ${open ? "rotate-180" : ""}`} />
            </div>

            {open && (
                <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-top" >
                    <ul className="list-disc ml-6 mt-2 flex flex-col gap-2">
                        {answers.map((answer, index) => (
                            <li key={index} className="text-sm lg:text-base text-texto-secundario">{answer}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}