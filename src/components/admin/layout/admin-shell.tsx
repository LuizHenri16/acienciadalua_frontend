"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { clearAdminTokens, getAdminToken } from "@/lib/auth/cookies";
import { getAdminSalesData } from "@/lib/api/admin-panel";
import { AdminToastProvider } from "@/components/admin/ui/toast";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Home;
  match: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Visão geral",
    href: "/painel",
    icon: Home,
    match: (p) => p === "/painel",
  },
  {
    label: "Produtos",
    href: "/painel/produtos",
    icon: Package,
    match: (p) => p.startsWith("/painel/produtos") || p.startsWith("/painel/produto"),
  },
  {
    label: "Vendas",
    href: "/painel/vendas",
    icon: Receipt,
    match: (p) => p.startsWith("/painel/vendas"),
  },
  {
    label: "Clientes",
    href: "/painel/clientes",
    icon: Users,
    match: (p) => p.startsWith("/painel/clientes"),
  },
  {
    label: "Relatórios",
    href: "/painel/relatorios",
    icon: BarChart3,
    match: (p) => p.startsWith("/painel/relatorios"),
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [drawerPathname, setDrawerPathname] = useState<string | null>(null);
  const mobileOpen = drawerPathname === pathname;
  const [pendingSalesCount, setPendingSalesCount] = useState<number>(0);

  useEffect(() => {
    let active = true;
    const token = getAdminToken();
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

  function handleSignOut() {
    clearAdminTokens();
    router.push("/painel/signin");
  }

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full px-4 py-5">
      <div>
        {/* Brand lockup */}
        <div className="flex items-center gap-2.5 px-2 py-1.5 select-none">
          <Image
            src="/logo.webp"
            alt="Logotipo A Ciência da Lua"
            width={30}
            height={30}
            className="shrink-0"
          />
          <span className="hidden lg:inline font-unkempt text-[21px] leading-none text-ouro-ink whitespace-nowrap">
            A Ciência da <span className="text-turquesa-deep">Lua</span>
          </span>
        </div>

        {/* Menu label */}
        <div className="mt-7 mb-2 px-3">
          <span className="text-[11px] font-semibold tracking-wider text-texto-terciario">
            Menu
          </span>
        </div>

        {/* Nav items */}
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
                className={`group flex items-center justify-between gap-3 px-3 min-h-11 rounded-xl text-sm transition-colors whitespace-nowrap ${
                  active
                    ? "bg-[#E7F6F4] text-turquesa-deep font-semibold"
                    : "text-texto-secundario hover:bg-off-white hover:text-texto-principal font-medium"
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      active
                        ? "text-turquesa-deep"
                        : "text-texto-terciario group-hover:text-texto-principal"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                {showPending && (
                  <span
                    className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold tabular-nums shrink-0"
                    title={`${pendingSalesCount} vendas pendentes`}
                  >
                    {pendingSalesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: Vitrine card + User profile */}
      <div className="flex flex-col gap-3 pt-6">
        <div className="rounded-2xl bg-[#F3F0FA] border border-[#E4DDF5] p-4">
          <p className="text-xs font-bold text-texto-principal">Sua vitrine</p>
          <p className="text-xs text-texto-secundario leading-relaxed mt-1">
            Veja como os alunos e professores enxergam sua loja.
          </p>
          <Link
            href="/produtos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#52468A] hover:text-marinho transition-colors whitespace-nowrap"
          >
            <span>Abrir loja</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="rounded-2xl border border-borda bg-white p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-turquesa-light/40 shrink-0 relative border border-borda">
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
            className="flex items-center justify-center w-9 h-9 rounded-xl text-texto-terciario hover:text-coral-dark hover:bg-off-white transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminToastProvider>
      <div className="min-h-dvh w-full bg-off-white text-texto-principal flex flex-col lg:flex-row">
        {/* Desktop Fixed Sidebar */}
        <aside className="hidden lg:block w-[252px] shrink-0 bg-white border-r border-borda sticky top-0 h-dvh">
          {sidebarContent}
        </aside>

        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-borda px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerPathname(pathname)}
              aria-label="Abrir menu de navegação"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-borda text-texto-principal hover:bg-off-white transition-colors cursor-pointer shrink-0"
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
            className="px-3 py-2 rounded-xl bg-turquesa-deep text-white text-xs font-bold whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            + Novo
          </Link>
        </header>

        {/* Mobile Slide-Over Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setDrawerPathname(null)}
                className="fixed inset-0 bg-texto-principal/40 backdrop-blur-[2px]"
                aria-hidden="true"
              />
              <motion.aside
                initial={reduceMotion ? false : { x: "-100%" }}
                animate={{ x: 0 }}
                exit={reduceMotion ? undefined : { x: "-100%" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                aria-label="Menu lateral"
                className="relative z-10 w-[272px] max-w-[85vw] h-full bg-white border-r border-borda shadow-xl"
              >
                <button
                  type="button"
                  onClick={() => setDrawerPathname(null)}
                  aria-label="Fechar menu"
                  className="absolute top-4 right-3 w-9 h-9 rounded-xl flex items-center justify-center text-texto-terciario hover:text-texto-principal hover:bg-off-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                {sidebarContent}
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Viewport */}
        <div className="flex-1 min-w-0 flex flex-col min-h-dvh">
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 w-full max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
          >
            {children}
          </main>

          <footer className="w-full max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 pb-5 pt-1 text-center">
            <p className="text-xs text-texto-terciario">
              © {new Date().getFullYear()} A Ciência da Lua · Painel administrativo
            </p>
          </footer>
        </div>
      </div>
    </AdminToastProvider>
  );
}
