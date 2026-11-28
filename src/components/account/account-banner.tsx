'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface AccountWelcomeProps {
  totalMateriais?: number;
  studentCount?: number;
  teacherCount?: number;
  userName: string;
}

function getTimeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function AccountWelcome({
  totalMateriais = 0,
  studentCount = 0,
  teacherCount = 0,
  userName,
}: AccountWelcomeProps) {
  const [greeting, setGreeting] = useState("Olá");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setGreeting(getTimeGreeting());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const displayName = userName.trim() || "visitante";

  return (
    <section className="w-full bg-hero">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-[calc(var(--header-h)+2.25rem)] pb-20 sm:pt-[calc(var(--header-h)+3rem)] sm:pb-24 lg:pt-[calc(var(--header-h)+3.5rem)] lg:pb-28">
        <div className="flex flex-col gap-5 max-w-3xl content-enter">
          <p className="text-xs sm:text-sm font-semibold text-turquesa-light">
            {greeting}, {displayName}
          </p>

          {totalMateriais > 0 ? (
            <>
              <h1 className="text-slate-100 font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-balance">
                Sua estante de Química está{" "}
                <span className="text-turquesa font-caveat text-4xl sm:text-5xl lg:text-6xl font-bold">
                  pronta
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Acesse seus arquivos digitais a qualquer momento e baixe quantas vezes precisar.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-slate-100 font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-balance">
                Transforme sua forma de{" "}
                <span className="text-turquesa font-caveat text-4xl sm:text-5xl lg:text-6xl font-bold">
                  aprender
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Explore a vitrine da Profa. Lua e monte sua coleção de resumos visuais e planos de aula.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/[0.08] pt-5 mt-1">
            {totalMateriais > 0 ? (
              <div className="flex items-stretch gap-0">
                <div className="flex flex-col gap-0.5 pr-6">
                  <span className="text-2xl font-extrabold text-turquesa tabular-nums tracking-tight">
                    {totalMateriais}
                  </span>
                  <span className="text-xs text-white/70">
                    {totalMateriais === 1 ? "material disponível" : "materiais disponíveis"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 px-6 border-l border-white/[0.08]">
                  <span className="text-2xl font-extrabold text-white tabular-nums tracking-tight">
                    {studentCount}
                  </span>
                  <span className="text-xs text-white/70">para estudar</span>
                </div>
                <div className="flex flex-col gap-0.5 pl-6 border-l border-white/[0.08]">
                  <span className="text-2xl font-extrabold text-rosa-rose tabular-nums tracking-tight">
                    {teacherCount}
                  </span>
                  <span className="text-xs text-white/70">planos de aula</span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-white/70">
                Acesso vitalício aos materiais digitais após a confirmação da compra
              </span>
            )}

            <Link
              href="/produtos"
              className="inline-flex items-center justify-center gap-2 bg-turquesa-deep text-white text-sm font-bold px-6 py-3 squircle-border hover:brightness-110 transition-all whitespace-nowrap shrink-0 w-full sm:w-auto group"
            >
              <span>Explorar catálogo</span>
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BannerNoMaterials() {
  return (
    <div className="content-enter-delayed flex flex-col items-center text-center gap-5 bg-white border border-borda squircle-border px-6 py-12 sm:p-12 shadow-sm">
      <div className="w-14 h-14 squircle-border-sm bg-turquesa-dark/10 flex items-center justify-center">
        <BookOpen className="w-7 h-7 text-turquesa-dark" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold text-texto-principal">
          Sua estante ainda está vazia
        </h3>
        <p className="text-sm text-texto-secundario max-w-md leading-relaxed">
          Explore os resumos visuais para alunos ou os planos de aula editáveis para professores e comece agora.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-1">
        <Link
          href="/produtos?categoria=alunos"
          className="inline-flex items-center justify-center gap-2 bg-turquesa-deep text-white font-bold text-sm px-6 py-3 squircle-border transition-all hover:opacity-90 w-full sm:w-auto whitespace-nowrap"
        >
          <span>Materiais para Alunos</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link
          href="/produtos?categoria=professores"
          className="inline-flex items-center justify-center gap-2 border-2 border-rosa-rose text-rosa-deep font-bold text-sm px-6 py-2.5 squircle-border transition-all hover:bg-rosa-deep hover:text-white hover:border-rosa-deep w-full sm:w-auto whitespace-nowrap"
        >
          <span>Planos para Professores</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
