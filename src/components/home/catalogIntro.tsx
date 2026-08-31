import { AnimatedSection } from "../ui/animated/AnimatedSection";
import {
    Clock,
    FileText,
    Gamepad2,
    Presentation,
    Sparkles,
    Target,
    type LucideIcon,
} from "lucide-react";

type Accent = "teal" | "rose";

interface MiniCard {
    title: string;
    text: string;
    icon: LucideIcon;
}

interface Block {
    accent: Accent;
    cards: MiniCard[];
}

const studentBlock: Block = {
    accent: "teal",
    cards: [
        {
            title: "Resumos Visuais Intuitivos",
            text: "Esquemas claros que sintetizam conceitos complexos sem enrolação.",
            icon: Sparkles,
        },
        {
            title: "Foco no ENEM e Vestibulares",
            text: "Conteúdo direcionado para o que é realmente cobrado nas provas.",
            icon: Target,
        },
        {
            title: "Acesso Imediato em PDF",
            text: "Baixe para estudar no seu ritmo em qualquer dispositivo.",
            icon: FileText,
        },
    ],
};

const teacherBlock: Block = {
    accent: "rose",
    cards: [
        {
            title: "Jogos Didáticos Prontos",
            text: "Dinâmicas e recursos validados para aumentar o engajamento da turma.",
            icon: Gamepad2,
        },
        {
            title: "Slides Prontos",
            text: "Apresentações visuais prontas para o seu plano de aula.",
            icon: Presentation,
        },
        {
            title: "Economia Real de Tempo",
            text: "Menos horas planejando aulas e mais qualidade de ensino.",
            icon: Clock,
        },
    ],
};

const MINI_CARD_BASE =
    "bg-white p-4 sm:p-5 squircle-border cursor-pointer border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-200 transition-all duration-300 flex items-start gap-4";

function iconBoxClass(accent: Accent) {
    return accent === "teal"
        ? "bg-teal-50 text-teal-600"
        : "bg-rose-50 text-rose-600";
}

function FeatureColumn({ block }: { block: Block }) {
    const iconBox = iconBoxClass(block.accent);

    return (
        <div className="flex flex-col space-y-4">
            {block.cards.map((card, index) => (
                <div
                    key={card.title}
                    className={MINI_CARD_BASE}
                    style={{ animationDelay: `${index * 0.08}s` }}
                >
                    <span className={`flex items-center justify-center p-2 rounded-xl shrink-0 ${iconBox}`}>
                        <card.icon className="w-5 h-5" />
                    </span>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-1 tracking-tight">
                            {card.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {card.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CentralAnchor() {
    return (
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-linear-to-tr from-teal-100/50 via-purple-100/30 to-rose-100/50 flex items-center justify-center p-6 border border-white/80 shadow-inner group cursor-pointer">
  
  <div className="absolute z-10 w-48 sm:w-52 h-60 bg-linear-to-br from-rose-500 to-rose-700 text-white p-5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-rose-500/30 transform rotate-8 translate-x-7 -translate-y-6 group-hover:rotate-12 group-hover:translate-x-10 group-hover:-translate-y-8 transition-all duration-300 select-none flex flex-col justify-between">
    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
      <Presentation className="w-4.5 h-4.5" />
    </div>
    <div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-rose-200 block mb-1">
        Para Aulas
      </span>
      <h4 className="text-sm font-extrabold leading-snug">
        Kit Didático do Professor
      </h4>
    </div>
  </div>

  <div className="absolute z-20 w-48 sm:w-52 h-60 bg-white p-5 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-teal-500/25 transform -rotate-6 -translate-x-6 translate-y-4 group-hover:-rotate-12 group-hover:-translate-x-10 group-hover:translate-y-6 transition-all duration-300 select-none flex flex-col justify-between">
    <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
      <FileText className="w-4.5 h-4.5" />
    </div>
    <div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600 block mb-1">
        Para Estudos
      </span>
      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
        Resumos & Guia Visual
      </h4>
    </div>
  </div>

</div>
    );
}

export function CatalogIntro() {
    return (
        <AnimatedSection className="w-full py-10 md:py-14">
            <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
                    Sua jornada na Química sem decoreba e sem perda de tempo
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-base text-center mt-3 mb-12">
                    Conteúdos autorais desenvolvidos para simplificar o estudo dos alunos e transformar a rotina dos professores.
                </p>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    <div className="lg:col-span-4 lg:order-2 flex justify-center items-center py-8 lg:py-0">
                        <CentralAnchor />
                    </div>

                    <div className="lg:col-span-4 lg:order-1 space-y-4">
                        <FeatureColumn block={studentBlock} />
                    </div>

                    <div className="lg:col-span-4 lg:order-3 space-y-4">
                        <FeatureColumn block={teacherBlock} />
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
