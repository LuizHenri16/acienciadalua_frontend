"use client";

import { faqHelp } from "@/lib/constants/faqHelp";
import { FaqCard } from "../ui/card/faqCard";
import { motion } from "framer-motion";

export function FaqSection() {

    const faqContent = faqHelp;

    return (
        <motion.section
            id="como-funciona"
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex flex-col gap-1">
                <h4 className="text-xs lg:text-sm text-rosa-rose uppercase font-bold tracking-wider">Dúvidas frequentes</h4>
                <h2 className="text-xl lg:text-2xl text-texto-principal font-bold">Perguntas <span className="text-turquesa-dark">Frequentes</span></h2>
                <p className="text-xs lg:text-sm tracking-wider text-texto-terciario">As perguntas mais comuns sobre os materiais e como funciona o acesso.</p>
            </div>

            {faqContent.map((faq, index) => (
                <FaqCard key={index} question={faq.question} answers={faq.answers} />
            ))}
        </motion.section>
    );
}