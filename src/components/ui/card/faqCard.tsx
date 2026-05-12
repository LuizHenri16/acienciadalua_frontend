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
        <div onClick={toggleOpen} className={`w-full flex flex-col items-center p-3.5 banner border border-slate-200 cursor-pointer`}>
            <div className="w-full flex items-center gap-3 ">
                <h3 className="font-medium text-sm lg:text-base">{question}</h3>
                <ChevronDown className={`ml-auto transition-all duration-300 ${open ? "rotate-180" : ""}`} />
            </div>

            {open && (
                <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300" >
                    <ul className="list-disc ml-6 mt-2 flex flex-col gap-1">
                        {answers.map((answer, index) => (
                            <li key={index} className="text-sm lg:text-base text-[#5A5A58]">{answer}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}