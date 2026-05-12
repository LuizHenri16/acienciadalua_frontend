import { faqHelp } from "@/constants/faqHelp";
import { FaqCard } from "../ui/card/faqCard";

export function FaqSection() {

    const faqContent = faqHelp;

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h4 className="text-xs lg:text-sm text-[#5A5A58] uppercase font-bold tracking-wider">Dúvidas frequentes</h4>
                <h2 className="text-xl lg:text-2xl font-bold ">Perguntas Frequentes</h2>
                <p className="text-xs lg:text-sm text-[#5A5A58]">As perguntas mais comuns sobre os materiais e como funciona o acesso.</p>
            </div>

            {faqContent.map((faq, index) => (
                <FaqCard key={index} question={faq.question} answers={faq.answers} />
            ))}
        </section>
    );
}