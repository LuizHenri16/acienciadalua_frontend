"use client";

import { useState } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { faqItems } from "@/content/faq";
import { FaqCard } from "@/components/home/faq-card";
import { AnimatedSection } from "@/components/ui/animated-section";

export function FaqSection() {
    const faqContent = faqItems;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    function handleToggle(index: number) {
        setOpenIndex((prev) => prev === index ? null : index);
    }

    return (
        <AnimatedSection
            id="faq"
            className="w-full bg-[#F5F4FB] py-16 md:py-24"
            amount={0.1}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-4 flex flex-col gap-4 items-start">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-marinho leading-[1.08] tracking-tight">
                            Perguntas
                            <br />
                            <span className="font-serif italic font-normal text-turquesa-dark">
                                frequentes
                            </span>
                        </h2>

                        <p className="text-sm text-texto-secundario leading-relaxed max-w-xs">
                            Não encontrou o que procurava? Fale direto com a Profa. Lua.
                        </p>

                        <Link
                            href="https://www.instagram.com/acienciadalua?igsh=bXhjd2V6Njc50Wxy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white border border-borda squircle-border-sm px-4 py-2.5 text-xs font-semibold text-marinho shadow-[0_2px_8px_rgba(30,27,75,0.04)] hover:border-rosa-rose/40 hover:shadow-sm transition-all"
                        >
                            <FaInstagram size={15} className="text-rosa-deep shrink-0" />
                            <span>@acienciadalua</span>
                        </Link>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-3">
                        {faqContent.map((faq, index) => (
                            <FaqCard
                                key={faq.question}
                                question={faq.question}
                                answers={faq.answers}
                                isOpen={openIndex === index}
                                onToggle={() => handleToggle(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}