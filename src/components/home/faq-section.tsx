"use client";

import { useState } from "react";
import { faqItems } from "@/content/faq";
import { FaqCard } from "@/components/home/faq-card";
import { AnimatedSection } from "@/components/ui/animated-section";

export function FaqSection() {

    const faqContent = faqItems;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    function handleToggle(index: number) {
        setOpenIndex((prev) => prev === index ? null : index);
    }

    return (
        <AnimatedSection
            id="faq"
            className="flex flex-col gap-4"
            amount={0.1}
        >
            <div className="flex flex-col gap-1">
                <h2 className="text-xl lg:text-2xl text-texto-principal font-bold">Perguntas <span className="text-turquesa-dark">Frequentes</span></h2>
                <p className="text-xs lg:text-sm tracking-wider text-texto-terciario">As perguntas mais comuns sobre os materiais e como funciona o acesso.</p>
            </div>

            {faqContent.map((faq, index) => (
                <FaqCard
                    key={index}
                    question={faq.question}
                    answers={faq.answers}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </AnimatedSection>
    );
}