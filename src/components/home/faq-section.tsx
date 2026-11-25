import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { faqItems } from "@/content/faq";
import { FaqCard } from "@/components/home/faq-card";
import { AnimatedSection } from "@/components/ui/animated-section";

export function FaqSection() {
    return (
        <AnimatedSection
            id="faq"
            className="w-full relative overflow-hidden bg-[#15123B] text-white section-torn-both pt-24 pb-24 md:pt-32 md:pb-32"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-4 flex flex-col gap-5 items-start">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
                            Perguntas
                            <br />
                            <span className="font-caveat font-bold text-5xl sm:text-6xl text-turquesa inline-block leading-[0.95]">
                                frequentes
                            </span>
                        </h2>

                        <p className="text-base text-white/80 leading-relaxed max-w-xs">
                            Não encontrou o que procurava? Fale direto com a Profa. Lua.
                        </p>

                        <Link
                            href="https://www.instagram.com/acienciadalua?igsh=bXhjd2V6Njc50Wxy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-rosa-deep hover:bg-[#C4526D] text-white squircle-border px-5 py-3 text-sm font-bold shadow-[0_8px_22px_rgba(176,71,95,0.38)] hover:shadow-[0_10px_28px_rgba(212,114,138,0.45)] active:scale-[0.98] transition-all group"
                        >
                            <FaInstagram size={18} className="shrink-0" />
                            <span>@acienciadalua</span>
                            <ArrowUpRight
                                size={16}
                                className="shrink-0 opacity-85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-3">
                        {faqItems.map((faq, index) => (
                            <FaqCard
                                key={faq.question}
                                question={faq.question}
                                answers={faq.answers}
                                defaultOpen={index === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
