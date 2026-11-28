"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { adminSignIn } from "@/lib/api/auth";
import { HttpError } from "@/lib/api/http-error";

export function AdminSignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await adminSignIn(user.email, user.password);

      router.push("/painel");
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        setError("Email ou senha inválidos.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col w-full gap-1.5">
        <label htmlFor="admin-email" className="text-xs font-semibold text-texto-secundario">
          E-mail
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={loading}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="admin@exemplo.com"
          className="w-full px-4 py-3.5 rounded-2xl painel-control text-sm text-texto-principal placeholder:text-texto-terciario disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col w-full gap-1.5">
        <label htmlFor="admin-password" className="text-xs font-semibold text-texto-secundario">
          Senha
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          disabled={loading}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="••••••••"
          className="w-full px-4 py-3.5 rounded-2xl painel-control text-sm text-texto-principal placeholder:text-texto-terciario disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="w-full px-4 py-2.5 rounded-2xl bg-red-50 text-coral-dark text-sm text-center font-medium"
        >
          {error}
        </p>
      )}

      <div className="mt-1">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? "Entrando" : "Entrar"}
          className="mt-4 w-full py-3.5 px-6 rounded-full painel-btn-primary text-sm font-bold cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Entrando</span>
            </>
          ) : (
            <span>Entrar</span>
          )}
        </button>
      </div>
    </form>
  );
}
