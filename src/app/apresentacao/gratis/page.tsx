"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function CapturePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Lead capturado:", { name, email });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error("Erro ao salvar o lead:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white text-texto-principal flex flex-col font-sora">
      <header className="py-5 bg-marinho border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="font-unkempt text-xl text-ouro tracking-wide">
            A Ciência da <span className="text-turquesa">Lua</span>
          </span>
          <span className="text-[0.65rem] font-bold text-texto-terciario uppercase tracking-widest hidden sm:block">
            Material de Apoio Gratuito
          </span>
        </div>
      </header>

      <main className="grow bg-marinho">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <span className="inline-block bg-rosa-rose/10 border border-rosa-rose/30 text-rosa-rose text-[0.65rem] font-bold px-4 py-1.5 squircle-border-sm uppercase tracking-widest">
              Download Gratuito
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
              Planeje suas aulas de Química em <span className="text-turquesa">menos de 10 minutos</span>.
            </h1>

            <p className="text-sm md:text-base text-texto-terciario leading-relaxed max-w-md">
              Baixe gratuitamente o nosso <strong className="text-white">Material gratuito de Química Geral</strong>. Que tem mapas mentais, slides prontos e jogos para poupar horas do seu planejamento de aula.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-turquesa shrink-0" />
                <span className="text-sm text-texto-terciario">Materiais Exclusivos</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-turquesa shrink-0" />
                <span className="text-sm text-texto-terciario">Arquivos em PDF de alta qualidade e prontos para imprimir</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-turquesa shrink-0" />
                <span className="text-sm text-texto-terciario">Mais dinamismo para prender a atenção dos seus alunos</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-marinho-light/10 rounded-2xl p-6 md:p-8 border border-white/[0.07] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

              <div className="relative z-10 text-center mb-6">
                <p className="text-[0.6rem] font-bold text-texto-terciario uppercase tracking-[0.2em]">O que você vai levar</p>
              </div>

              <div className="relative z-10 flex items-center justify-center gap-3 md:gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-turquesa-dark/20 border border-turquesa-dark/40 flex items-center justify-center motion-safe:animate-[float-y_4s_ease-in-out_infinite]">
                    <svg className="w-5 h-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                  </div>
                  <span className="text-[0.55rem] md:text-[0.6rem] text-turquesa font-bold uppercase tracking-wider text-center leading-tight">
                    Mapas<br />Mentais
                  </span>
                </div>

                <div className="w-6 md:w-12 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-ouro/20 border border-ouro/40 flex items-center justify-center motion-safe:animate-[float-y_4s_ease-in-out_infinite_0.8s]">
                    <svg className="w-5 h-5 text-ouro" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>
                  </div>
                  <span className="text-[0.55rem] md:text-[0.6rem] text-ouro font-bold uppercase tracking-wider text-center leading-tight">
                    Slides<br />Prontos
                  </span>
                </div>

                <div className="w-6 md:w-12 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-rosa-rose/20 border border-rosa-rose/40 flex items-center justify-center motion-safe:animate-[float-y_4s_ease-in-out_infinite_1.6s]">
                    <svg className="w-5 h-5 text-rosa-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                  </div>
                  <span className="text-[0.55rem] md:text-[0.6rem] text-rosa-rose font-bold uppercase tracking-wider text-center leading-tight">
                    Jogos<br /> Educativos
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white squircle-border p-6 md:p-8 shadow-md">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-texto-secundario mb-1.5">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Professor Luiz"
                      className="w-full px-4 py-3.5 squircle-border border border-borda-med text-sm text-texto-principal placeholder:text-texto-terciario/60 outline-none focus:border-turquesa-dark/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-texto-secundario mb-1.5">
                      Seu Melhor E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-3.5 squircle-border border border-borda-med text-sm text-texto-principal placeholder:text-texto-terciario/60 outline-none focus:border-turquesa-dark/40 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-turquesa-dark hover:opacity-90 text-white font-bold py-4 px-8 squircle-border transition-all duration-200 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? "Preparando download..." : "QUERO MEU MATERIAL GRÁTIS"}
                  </button>

                  <p className="text-[0.65rem] text-center text-texto-terciario">
                    Respeitamos sua privacidade. Seus dados estão 100% seguros.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-turquesa-dark/10 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-turquesa-dark" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-texto-principal">Tudo pronto, {name.split(" ")[0]}!</h3>
                  <p className="text-sm text-texto-secundario">
                    Enviamos o link de download direto para o e-mail: <strong className="text-texto-principal">{email}</strong>.
                  </p>
                  <p className="text-xs text-texto-terciario">
                    Se não encontrar na caixa de entrada, dê uma olhadinha no spam!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-borda py-8 text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-1.5">
          <p className="text-xs text-texto-terciario">
            &copy; {new Date().getFullYear()} A Ciência da Lua. Todos os direitos reservados.
          </p>
          <p className="text-xs text-texto-terciario/60">
            Criado com dedicação para facilitar o ensino de Ciências e Química.
          </p>
        </div>
      </footer>
    </div>
  );
}
