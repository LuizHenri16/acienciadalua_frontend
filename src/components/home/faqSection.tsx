import { faqHelp } from "@/lib/constants/faqHelp";
import { FaqCard } from "../ui/card/faqCard";

export function FaqSection() {

    const faqContent = faqHelp;

    return (
        <section id="como-funciona" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h4 className="text-xs lg:text-sm text-texto-secundario uppercase font-bold tracking-wider">Dúvidas frequentes</h4>
                <h2 className="text-xl lg:text-2xl text-texto-principal font-bold ">Perguntas Frequentes</h2>
                <p className="text-xs lg:text-sm tracking-wider text-texto-terciario">As perguntas mais comuns sobre os materiais e como funciona o acesso.</p>
            </div>

            {faqContent.map((faq, index) => (
                <FaqCard key={index} question={faq.question} answers={faq.answers} />
            ))}
        </section>
    );
}