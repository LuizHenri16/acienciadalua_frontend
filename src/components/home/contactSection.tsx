"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.section
      id="contato"
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl lg:text-2xl text-texto-principal font-bold">
          Tem alguma <span className="text-turquesa-dark">dúvida</span>?
        </h2>
        <p className="text-xs lg:text-sm tracking-wider text-texto-terciario">
          Mande sua pergunta diretamente para a gente. Respondemos em até 24h.
        </p>
      </div>

      <div className="bg-white squircle-border p-6 md:p-8 shadow-md border border-borda-med">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="text-sm text-texto-secundario">
                  Nome
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="w-full bg-white text-sm squircle-border border border-borda-med p-4 outline-none focus:border-turquesa-dark/40 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm text-texto-secundario">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  className="w-full bg-white text-sm squircle-border border border-borda-med p-4 outline-none focus:border-turquesa-dark/40 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="text-sm text-texto-secundario">
                Assunto <span className="text-texto-terciario">(opcional)</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Ex: Dúvida sobre o material"
                className="w-full bg-white text-sm squircle-border border border-borda-med p-4 outline-none focus:border-turquesa-dark/40 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm text-texto-secundario">
                Mensagem
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Escreva sua dúvida aqui..."
                rows={5}
                className="w-full bg-white text-sm squircle-border border border-borda-med p-4 outline-none focus:border-turquesa-dark/40 transition-colors resize-y min-h-[120px]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 squircle-border-sm p-3 border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-turquesa-dark hover:opacity-90 text-white font-bold py-4 px-8 squircle-border transition-all duration-200 active:scale-[0.98] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Enviando...</>
              ) : (
                <>
                  <Mail size={18} />
                  Enviar mensagem
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-turquesa-dark/10 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-turquesa-dark" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-texto-principal">Mensagem enviada!</h3>
            <p className="text-sm text-texto-secundario max-w-md mx-auto">
              Obrigada, <strong>{form.name.split(" ")[0]}</strong>! Recebemos sua mensagem e responderemos em breve pelo email <strong>{form.email}</strong>.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
