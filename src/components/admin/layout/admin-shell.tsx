"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Package,
  Receipt,
  Users,
  BarChart3,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Plus,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { clearAdminTokens, getAdminToken } from "@/lib/auth/cookies";
import { getAdminSalesData } from "@/lib/api/admin-panel";
import { AdminToastProvider } from "@/components/admin/ui/toast";

interface NavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: typeof Home;
  match: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Visão geral",
    shortLabel: "Início",
    href: "/painel",
    icon: Home,
    match: (p) => p === "/painel",
  },
  {
    label: "Produtos",
    shortLabel: "Produtos",
    href: "/painel/produtos",
    icon: Package,
    match: (p) => p.startsWith("/painel/produtos") || p.startsWith("/painel/produto"),
  },
  {
    label: "Vendas",
    shortLabel: "Vendas",
    href: "/painel/vendas",
    icon: Receipt,
    match: (p) => p.startsWith("/painel/vendas"),
  },
  {
    label: "Clientes",
    shortLabel: "Clientes",
    href: "/painel/clientes",
    icon: Users,
    match: (p) => p.startsWith("/painel/clientes"),
  },
  {
    label: "Relatórios",
    shortLabel: "Relatórios",
    href: "/painel/relatorios",
    icon: BarChart3,
    match: (p) => p.startsWith("/painel/relatorios"),
  },
];

function getAdminDisplayNameFromToken(token: string): string {
  if (!token) return "Profa. Lua";
  try {
    const parts = token.split(".");
    if (parts.length < 2) return "Profa. Lua";
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      Array.from(atob(padded), (ch) => `%${ch.charCodeAt(0).toString(16).padStart(2, "0")}`).join("")
    );
    const payload = JSON.parse(json) as Record<string, unknown>;

    const rawName =
      (typeof payload.username === "string" && payload.username.trim()) ||
      (typeof payload.name === "string" && payload.name.trim()) ||
      (typeof payload.preferred_username === "string" && payload.preferred_username.trim()) ||
      (typeof payload.given_name === "string" && payload.given_name.trim());

    if (rawName) return rawName;

    const emailOrSub =
      (typeof payload.email === "string" && payload.email.trim()) ||
      (typeof payload.sub === "string" && payload.sub.includes("@") ? payload.sub.trim() : "");

    if (emailOrSub) {
      const localPart = emailOrSub.split("@")[0]?.trim();
      if (localPart) return localPart;
    }
  } catch {
    // Fallback gracefully when token is opaque or cannot be parsed
  }
  return "Profa. Lua";
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerPathname, setDrawerPathname] = useState<string | null>(null);
  const mobileOpen = drawerPathname === pathname;
  const [pendingSalesCount, setPendingSalesCount] = useState<number>(0);
  const [adminDisplayName, setAdminDisplayName] = useState<string>("Profa. Lua");
  const adminInitial = adminDisplayName.trim().charAt(0).toUpperCase() || "P";

  useEffect(() => {
    let active = true;
    const token = getAdminToken();
    const syncTimer = window.setTimeout(() => {
      if (active) setAdminDisplayName(getAdminDisplayNameFromToken(token));
    }, 0);
    getAdminSalesData(token)
      .then((res) => {
        if (!active) return;
        const count = res.data.filter((sale) => sale.status === "pending").length;
        setPendingSalesCount(count);
      })
      .catch(() => {
        // Ignore silent badge load failure
      });
    return () => {
      active = false;
      window.clearTimeout(syncTimer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerPathname(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  async function handleSignOut() {
    await clearAdminTokens();
    router.push("/painel/signin");
  }

  const vitrineSpotlightCard = (
    <div className="relative overflow-hidden rounded-2xl bg-marinho text-white p-4 shadow-[0_10px_24px_-12px_rgba(30,27,75,0.55)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-turquesa/25 blur-xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-8 w-24 h-24 rounded-full bg-rosa-rose/20 blur-xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-turquesa-light">
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          Vitrine pública
        </span>
        <p className="text-sm font-bold leading-snug mt-1.5">
          Veja sua loja como alunos e professores
        </p>
        <Link
          href="/produtos"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3.5 w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-full bg-white text-marinho text-xs font-bold hover:bg-off-white transition-colors"
        >
          <span>Abrir vitrine</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );

  const mobileSidebarContent = (
    <div className="flex flex-col justify-between h-full px-4 py-5">
      <div>
        <div className="flex items-center gap-2.5 px-2 py-1 select-none">
          <div className="w-9 h-9 rounded-xl bg-[#F5F4F0] border border-marinho/[0.07] flex items-center justify-center shrink-0">
            <Image
              src="/logo.webp"
              alt="Logotipo A Ciência da Lua"
              width={24}
              height={24}
              className="shrink-0"
            />
          </div>
          <div className="min-w-0">
            <span className="block font-unkempt text-[19px] leading-none text-ouro-ink whitespace-nowrap">
              A Ciência da <span className="text-turquesa-deep">Lua</span>
            </span>
            <span className="block text-[11px] text-texto-terciario mt-0.5">
              Painel administrativo
            </span>
          </div>
        </div>

        <div className="mt-6 mb-2 px-2.5">
          <span className="text-[11px] font-semibold tracking-wider text-texto-terciario uppercase">
            Navegação
          </span>
        </div>

        <nav aria-label="Menu principal do painel" className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            const showPending = item.href === "/painel/vendas" && pendingSalesCount > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center justify-between gap-3 px-3 min-h-11 rounded-xl text-sm transition-all whitespace-nowrap ${
                  active
                    ? "bg-[#F5F4F0] text-texto-principal font-semibold"
                    : "text-texto-secundario hover:bg-[#F5F4F0]/70 hover:text-texto-principal font-medium"
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      active
                        ? "bg-turquesa-deep text-white"
                        : "text-texto-terciario group-hover:text-texto-principal"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="truncate">{item.label}</span>
                </span>
                {showPending && (
                  <span
                    className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold tabular-nums shrink-0"
                    title={`${pendingSalesCount} vendas pendentes`}
                  >
                    {pendingSalesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 pt-4 border-t border-marinho/[0.07]">
          <Link
            href="/painel/produto"
            className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-10 rounded-full painel-btn-primary text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Novo material</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        {vitrineSpotlightCard}

        <div className="rounded-2xl border border-marinho/[0.08] bg-[#F5F4F0]/75 p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-turquesa-light/40 shrink-0 relative border border-marinho/[0.08]">
              <Image
                src="/professor-foto.webp"
                alt="Profa. Lua"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-texto-principal truncate">
                Profa. Lua
              </p>
              <p className="text-[11px] text-texto-terciario truncate">
                Administradora
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            title="Sair do painel"
            aria-label="Sair do painel"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-texto-terciario hover:text-coral-dark hover:bg-white transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminToastProvider>
      <div className="painel-ds min-h-dvh w-full text-texto-principal flex flex-col lg:flex-row">
        {/* Desktop Compact Icon Rail */}
        <aside className="hidden lg:flex shrink-0 sticky top-0 z-30 h-dvh bg-white border-r border-marinho/[0.07]">
          <div className="w-[68px] flex flex-col items-center justify-between py-4 px-2.5 bg-white">
            <div className="flex flex-col items-center gap-5 w-full">
              <Link
                href="/painel"
                aria-label="Ir para visão geral do painel"
                className="group relative w-10 h-10 rounded-xl bg-[#F5F4F0] border border-marinho/[0.07] flex items-center justify-center hover:border-turquesa-deep/30 transition-colors"
              >
                <Image
                  src="/logo.webp"
                  alt="Logotipo A Ciência da Lua"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl bg-marinho px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-6px_rgba(30,27,75,0.38)] ring-1 ring-white/10 opacity-0 -translate-x-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-marinho"
                  />
                  A Ciência da Lua
                </span>
              </Link>

              <nav aria-label="Acesso rápido por ícones" className="flex flex-col items-center gap-2 w-full">
                {NAV_ITEMS.map((item) => {
                  const active = item.match(pathname);
                  const Icon = item.icon;
                  const showPending = item.href === "/painel/vendas" && pendingSalesCount > 0;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-label={item.label}
                      aria-current={active ? "page" : undefined}
                      className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        active
                          ? "bg-turquesa-deep text-white shadow-[0_6px_14px_-4px_rgba(31,122,115,0.48)]"
                          : "text-texto-terciario hover:bg-[#F5F4F0] hover:text-texto-principal"
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                      {showPending && (
                        <span
                          className={`absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full text-[10px] font-bold tabular-nums flex items-center justify-center ring-2 ring-white ${
                            active
                              ? "bg-ouro text-marinho"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {pendingSalesCount}
                        </span>
                      )}
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl bg-marinho px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-6px_rgba(30,27,75,0.38)] ring-1 ring-white/10 flex items-center gap-2 opacity-0 -translate-x-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-marinho"
                        />
                        <span>{item.label}</span>
                        {showPending && (
                          <span className="rounded-full bg-ouro/20 px-1.5 py-0.5 text-[10px] font-bold text-ouro-light tabular-nums">
                            {pendingSalesCount} {pendingSalesCount === 1 ? "pendente" : "pendentes"}
                          </span>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col items-center gap-2.5">
              <Link
                href="/produtos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir vitrine da loja"
                className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-texto-terciario hover:text-turquesa-deep hover:bg-[#F5F4F0] transition-colors"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl bg-marinho px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-6px_rgba(30,27,75,0.38)] ring-1 ring-white/10 opacity-0 -translate-x-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-marinho"
                  />
                  Abrir vitrine da loja
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sair do painel"
                className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-texto-terciario hover:text-coral-dark hover:bg-[#F5F4F0] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl bg-marinho px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-6px_rgba(30,27,75,0.38)] ring-1 ring-white/10 opacity-0 -translate-x-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-marinho"
                  />
                  Sair do painel
                </span>
              </button>

              <div
                tabIndex={0}
                aria-label={`${adminDisplayName} · Admin`}
                className="group relative mt-1 w-9 h-9 rounded-xl bg-marinho text-white shadow-[0_6px_14px_-6px_rgba(30,27,75,0.45)] focus-visible:outline-2 focus-visible:outline-turquesa-deep"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="text-sm font-bold leading-none select-none"
                  >
                    {adminInitial}
                  </span>
                </div>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl bg-marinho px-3 py-1.5 text-xs text-white shadow-[0_10px_25px_-6px_rgba(30,27,75,0.38)] ring-1 ring-white/10 opacity-0 -translate-x-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-marinho"
                  />
                  <span className="font-bold">{adminDisplayName}</span>
                  <span className="text-white/65 ml-1.5 font-medium">· Admin</span>
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-marinho/[0.08] px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerPathname(pathname)}
              aria-label="Abrir menu de navegação"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-marinho/[0.1] bg-[#F5F4F0]/70 text-texto-principal hover:bg-[#F5F4F0] transition-colors cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/painel" className="flex items-center gap-1.5 min-w-0">
              <Image
                src="/logo.webp"
                alt="Logotipo A Ciência da Lua"
                width={24}
                height={24}
                className="shrink-0"
              />
              <span className="font-unkempt text-base sm:text-lg text-ouro-ink truncate">
                A Ciência da <span className="text-turquesa-deep">Lua</span>
              </span>
            </Link>
          </div>

          <Link
            href="/painel/produto"
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full painel-btn-primary text-xs font-bold whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo</span>
          </Link>
        </header>

        {/* Mobile Slide-Over Drawer */}
        <div
          className="admin-drawer-layer lg:hidden fixed inset-0 z-40 flex"
          data-open={mobileOpen}
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
        >
          <div
            onClick={() => setDrawerPathname(null)}
            className="admin-drawer-backdrop fixed inset-0 bg-texto-principal/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <aside
            aria-label="Menu lateral"
            className="admin-drawer-panel relative z-10 w-[284px] max-w-[85vw] h-full bg-white border-r border-marinho/[0.08] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setDrawerPathname(null)}
              aria-label="Fechar menu"
              className="absolute top-4 right-3 w-9 h-9 rounded-xl flex items-center justify-center text-texto-terciario hover:text-texto-principal hover:bg-[#F5F4F0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            {mobileSidebarContent}
          </aside>
        </div>

        {/* Main Content Viewport */}
        <div className="flex-1 min-w-0 flex flex-col min-h-dvh">
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 w-full max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
          >
            {children}
          </main>

          <footer className="w-full max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pb-5 pt-1 text-center">
            <p className="text-xs text-texto-terciario">
              © {new Date().getFullYear()} A Ciência da Lua · Painel administrativo
            </p>
          </footer>
        </div>
      </div>
    </AdminToastProvider>
  );
}
