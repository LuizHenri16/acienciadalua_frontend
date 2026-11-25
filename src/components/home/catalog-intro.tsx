"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  FileCheck2,
  FileText,
  FlaskConical,
  Gamepad2,
  Layers,
  Presentation,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import studyDeskImg from "@/assets/images/estudar_objetos_quimica_1795571144140.webp";
import teachDeskImg from "@/assets/images/dar_aula_objetos_quimica_1795571144885.webp";

type TrackMode = "student" | "teacher";

interface MethodFeature {
  id: string;
  index: string;
  floatingLabel: string;
  title: string;
  description: string;
  icon: LucideIcon;
  positionClass: string;
}

interface WorkbenchTrack {
  mode: TrackMode;
  tabLabel: string;
  headline: string;
  description: string;
  highlightQuote: string;
  ctaLabel: string;
  targetId: string;
  image: typeof studyDeskImg;
  imageAlt: string;
  features: MethodFeature[];
}

const WORKBENCH_TRACKS: Record<TrackMode, WorkbenchTrack> = {
  student: {
    mode: "student",
    tabLabel: "Para Estudar",
    headline: "Estude Química com clareza visual, sem depender de decoreba.",
    description:
      "Materiais digitais ilustrados que conectam fórmulas, reações e fenômenos do dia a dia em esquemas fáceis de revisar antes das provas.",
    highlightQuote:
      "Quando você enxerga a ligação entre os conceitos, a fórmula faz sentido sozinha.",
    ctaLabel: "Explorar materiais para Alunos",
    targetId: "para-estudar",
    image: studyDeskImg,
    imageAlt:
      "Ilustração em aquarela de caderno de química aberto com mapas mentais em verde-petróleo, modelo molecular de madeira e materiais de estudo",
    features: [
      {
        id: "mapas-mentais",
        index: "01",
        floatingLabel: "Mapas Visuais.",
        title: "Mapas mentais e resumos ilustrados",
        description:
          "Sínteses visuais desenhadas para organizar conteúdos extensos em páginas limpas e fáceis de memorizar.",
        icon: Layers,
        positionClass: "sm:top-4 sm:left-2",
      },
      {
        id: "foco-provas",
        index: "02",
        floatingLabel: "Foco ENEM.",
        title: "Direcionado ao ENEM e vestibulares",
        description:
          "Explicações diretas dos temas de maior incidência, mostrando como interpretar os enunciados sem decorar macetes soltos.",
        icon: Sparkles,
        positionClass: "sm:top-10 sm:right-2",
      },
      {
        id: "pdf-pratico",
        index: "03",
        floatingLabel: "PDF Imediato.",
        title: "Leitura fluida no tablet ou impresso",
        description:
          "Arquivos liberados automaticamente em Minha Conta após o pagamento para estudar no ritmo que preferir.",
        icon: FileText,
        positionClass: "sm:bottom-4 sm:left-6",
      },
    ],
  },
  teacher: {
    mode: "teacher",
    tabLabel: "Para Dar Aula",
    headline: "Prepare aulas dinâmicas e visuais em muito menos tempo.",
    description:
      "Recursos pedagógicos pensados para a rotina real de sala de aula: dinâmicas testadas, apresentações claras e atividades prontas para aplicar.",
    highlightQuote:
      "Menos horas montando material do zero e mais energia para conduzir a descoberta da turma.",
    ctaLabel: "Explorar materiais para Professores",
    targetId: "para-dar-aula",
    image: teachDeskImg,
    imageAlt:
      "Ilustração em aquarela de cartas de jogos didáticos de química, pastas em terracota, béquer de vidro e modelos moleculares",
    features: [
      {
        id: "jogos-didaticos",
        index: "01",
        floatingLabel: "Jogos Didáticos.",
        title: "Cartas e jogos didáticos prontos",
        description:
          "Jogos de tabuleiro e baralhos temáticos para revisar conteúdos de forma ativa e aumentar o engajamento da turma.",
        icon: Gamepad2,
        positionClass: "sm:top-4 sm:left-2",
      },
      {
        id: "slides-visuais",
        index: "02",
        floatingLabel: "Slides Visuais.",
        title: "Slides didáticos com sequência clara",
        description:
          "Apresentações estruturadas com ilustrações moleculares limpas para explicar conceitos abstratos com segurança.",
        icon: Presentation,
        positionClass: "sm:top-10 sm:right-2",
      },
      {
        id: "fichas-questoes",
        index: "03",
        floatingLabel: "Fichas & Questões.",
        title: "Fichas de atividades e exercícios",
        description:
          "Listas de questões contextualizadas e roteiros de aula prontos para imprimir ou adaptar ao seu planejamento.",
        icon: FileCheck2,
        positionClass: "sm:bottom-4 sm:left-6",
      },
    ],
  },
};

export function CatalogIntro() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<TrackMode>("student");
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);

  const track = WORKBENCH_TRACKS[mode];
  const isTeacher = mode === "teacher";

  function handleModeChange(nextMode: TrackMode) {
    setMode(nextMode);
    setActiveFeatureIdx(0);
  }

  function scrollToSection(targetId: string) {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <AnimatedSection className="w-full py-8 md:py-14 overflow-x-clip">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-marinho tracking-tight leading-[1.15] text-balance">
          Sua jornada na Química sem{" "}
          <span className="font-caveat text-4xl sm:text-5xl lg:text-[3.3rem] text-turquesa-deep font-bold inline-block px-1">
            decoreba
          </span>{" "}
          e sem{" "}
          <span className="font-caveat text-4xl sm:text-5xl lg:text-[3.3rem] text-rosa-deep font-bold inline-block px-1">
            perda de tempo
          </span>
        </h2>
        <p className="text-texto-secundario max-w-2xl mx-auto text-sm sm:text-base mt-3 leading-relaxed">
          Alterne entre os dois modos da bancada para explorar como cada linha de materiais foi pensada para estudar ou ensinar Química.
        </p>
      </div>

      {/* Borderless Editorial Chemistry Workbench */}
      <div className="relative overflow-hidden text-marinho">
        {/* Top Switcher Bar — Liquid Glass Tab Control */}
        <div className="relative z-10 pb-6 md:pb-8 flex justify-start">
          <div
            role="tablist"
            aria-label="Alternar bancada entre materiais para estudar e para dar aula"
            className="relative grid grid-cols-2 sm:inline-flex items-center gap-1.5 p-1.5 squircle-border bg-linear-to-b from-off-white/90 via-off-white/70 to-off-white/95 backdrop-blur-xl backdrop-saturate-150 mobile-no-blur shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(30,27,75,0.04)] w-full sm:w-auto"
          >
            {(["student", "teacher"] as const).map((key) => {
              const item = WORKBENCH_TRACKS[key];
              const active = mode === key;
              const Icon = key === "student" ? BookOpen : FlaskConical;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleModeChange(key)}
                  className={`relative flex items-center justify-center gap-2 px-5 py-2.5 squircle-border text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    active
                      ? "text-white"
                      : "text-texto-secundario hover:text-marinho hover:bg-white/45"
                  }`}
                >
                  {active && (
                    <>
                      {/* On phones the shared-layout spring is skipped entirely. */}
                      <span
                        aria-hidden="true"
                        className={`sm:hidden absolute inset-0 squircle-border border border-white/40 ${
                          key === "teacher"
                            ? "bg-linear-to-b from-rosa-deep/90 via-rosa-deep/95 to-[#8F354A]/95"
                            : "bg-linear-to-b from-turquesa-deep/90 via-turquesa-deep/95 to-[#165C56]/95"
                        }`}
                      />
                      <motion.span
                        layoutId="workbench-tab-liquid-glass"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                        aria-hidden="true"
                        className={`hidden sm:block absolute inset-0 squircle-border backdrop-blur-md backdrop-saturate-150 border border-white/40 overflow-hidden ${
                          key === "teacher"
                            ? "bg-linear-to-b from-rosa-deep/90 via-rosa-deep/95 to-[#8F354A]/95 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(242,184,198,0.32)]"
                            : "bg-linear-to-b from-turquesa-deep/90 via-turquesa-deep/95 to-[#165C56]/95 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(109,213,202,0.3)]"
                        }`}
                      >
                        <span className="pointer-events-none absolute inset-x-2 top-0.5 h-1/2 squircle-border bg-linear-to-b from-white/28 to-transparent" />
                      </motion.span>
                    </>
                  )}
                  <Icon className="relative z-10 w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="relative z-10">{item.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Editorial Split — Zero Gray Borders (div:nth-of-type(4)) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Zone: Seamless Borderless Watercolor Workbench Composition (div:nth-of-type(1)) */}
          <div className="lg:col-span-7 relative flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={track.mode}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Borderless Artwork dissolving cleanly into white page canvas */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-texto-terciario/60"
                  >
                    {isTeacher ? (
                      <FlaskConical className="w-8 h-8" />
                    ) : (
                      <BookOpen className="w-8 h-8" />
                    )}
                    <span className="text-xs font-medium">{track.tabLabel}</span>
                  </div>

                  <Image
                    src={track.image}
                    alt={track.imageAlt}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-cover mix-blend-multiply [mask-image:radial-gradient(ellipse_78%_76%_at_50%_50%,black_62%,transparent_100%)]"
                  />

                  {/* Desktop Floating Editorial Serif Callouts (Inspired by Dribbble Reference, Zero Boxes) */}
                  {track.features.map((feat, idx) => {
                    const active = idx === activeFeatureIdx;
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => setActiveFeatureIdx(idx)}
                        aria-pressed={active}
                        className={`hidden sm:inline-flex items-baseline gap-1.5 absolute z-20 cursor-pointer transition-all duration-200 px-2.5 py-1 squircle-border-sm ${
                          feat.positionClass
                        } ${
                          active
                            ? isTeacher
                              ? "text-rosa-deep scale-105 bg-white/85 backdrop-blur-xs"
                              : "text-turquesa-deep scale-105 bg-white/85 backdrop-blur-xs"
                            : "text-marinho/80 hover:text-marinho bg-white/65 backdrop-blur-xs"
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold opacity-70 tabular-nums">
                          {feat.index}
                        </span>
                        <span className="font-serif text-lg lg:text-xl font-medium tracking-tight">
                          {feat.floatingLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile interactive selector chips (borderless pills without gray borders) */}
            <div className="flex sm:hidden items-center justify-center flex-wrap gap-2">
              {track.features.map((feat, idx) => {
                const active = idx === activeFeatureIdx;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setActiveFeatureIdx(idx)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 squircle-border-sm text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? isTeacher
                          ? "bg-rosa-light/30 text-rosa-deep"
                          : "bg-turquesa-light/30 text-turquesa-deep"
                        : "bg-off-white text-texto-secundario"
                    }`}
                  >
                    {feat.floatingLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Zone: Editorial Serif Presentation & Clean Method List (div:nth-of-type(2)) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={track.mode}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5"
              >
                {/* Editorial Serif Main Headline */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] font-medium text-marinho leading-[1.18] tracking-tight text-balance">
                    {track.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-texto-secundario leading-relaxed mt-3">
                    {track.description}
                  </p>
                </div>

                {/* Unboxed Highlight Quote */}
                <blockquote className="py-1">
                  <p
                    className={`font-serif italic text-base sm:text-[17px] leading-relaxed ${
                      isTeacher ? "text-[#8F354A]" : "text-turquesa-deep"
                    }`}
                  >
                    “{track.highlightQuote}”
                  </p>
                </blockquote>

                {/* Method Elements — Clean, Borderless Rows */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-bold text-texto-terciario tracking-wide mb-1">
                    O que você encontra nesta bancada
                  </p>
                  {track.features.map((feat, idx) => {
                    const active = idx === activeFeatureIdx;
                    const Icon = feat.icon;

                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => setActiveFeatureIdx(idx)}
                        className={`w-full py-2.5 px-3 -mx-3 squircle-border-sm text-left transition-colors cursor-pointer flex items-start gap-3 ${
                          active
                            ? isTeacher
                              ? "bg-rosa-light/25"
                              : "bg-turquesa-light/25"
                            : "hover:bg-off-white/75"
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-7 h-7 squircle-border-sm flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? isTeacher
                                ? "bg-rosa-deep text-white"
                                : "bg-turquesa-deep text-white"
                              : "bg-off-white text-texto-secundario"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-marinho">
                              {feat.title}
                            </span>
                            <span className="font-mono text-[11px] font-semibold text-texto-terciario tabular-nums shrink-0">
                              {feat.index}
                            </span>
                          </div>
                          {active && (
                            <p className="text-xs text-texto-secundario leading-relaxed mt-1">
                              {feat.description}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Primary CTA */}
            <div>
              <button
                type="button"
                onClick={() => scrollToSection(track.targetId)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 min-h-12 squircle-border text-white text-sm font-bold transition-all duration-200 cursor-pointer group hover:opacity-95 active:scale-[0.99] ${
                  isTeacher ? "bg-rosa-deep" : "bg-turquesa-deep"
                }`}
              >
                <span>{track.ctaLabel}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
