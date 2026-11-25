import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Shield } from "lucide-react";
import { FaInstagram, FaPix } from "react-icons/fa6";
import { SiDevelopmentcontainers } from "react-icons/si";

const sections = [
    { label: "Início", href: "/#banner" },
    { label: "Para Estudar", href: "/#produtos" },
    { label: "Para Dar Aula", href: "/#produtos" },
    { label: "Sobre", href: "/#sobre" },
    { label: "FAQ", href: "/#faq" },
];

const links = [
    { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/acienciadalua?igsh=bXhjd2V6Njc50Wxy", target: "_blank" as const },
    { label: "Feito por", icon: SiDevelopmentcontainers, href: "https://luizhenri16.github.io/meuPortfolio/", target: "_blank" as const }
];

const trustBadges = [
    {
        icon: FaPix,
        title: "Pagamento via PIX",
        text: "Aprovação imediata e QR Code na hora",
        boxClass: "bg-turquesa-light/40 text-petroleo",
        kind: "react-icon" as const,
    },
    {
        icon: Shield,
        title: "Conexão segura (SSL)",
        text: "Seus dados protegidos por criptografia",
        boxClass: "bg-[#F1F0FA] text-marinho",
        kind: "lucide-filled" as const,
    },
    {
        icon: RefreshCw,
        title: "Compra garantida",
        text: "Acesso vitalício aos materiais adquiridos",
        boxClass: "bg-rosa-light/35 text-rosa-deep",
        kind: "lucide-stroke" as const,
    },
];

export function SiteFooter({ className = "mt-10" }: { className?: string } = {}) {
    return (
        <footer className={`${className} bg-paper-texture`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {trustBadges.map((badge) => (
                        <div key={badge.title} className="flex items-center gap-3.5">
                            <span className={`flex items-center justify-center w-12 h-12 squircle-border-sm shrink-0 ${badge.boxClass}`}>
                                {badge.kind === "react-icon" ? (
                                    <badge.icon size={22} />
                                ) : (
                                    <badge.icon
                                        size={22}
                                        strokeWidth={badge.kind === "lucide-filled" ? 0 : 2.1}
                                        fill={badge.kind === "lucide-filled" ? "currentColor" : "none"}
                                    />
                                )}
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-bold text-marinho">
                                    {badge.title}
                                </span>
                                <span className="text-xs text-texto-terciario leading-snug">
                                    {badge.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative overflow-hidden bg-[#15123B] text-white footer-torn-top">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-20 pb-12 md:pt-28 md:pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                        <div className="md:col-span-5 flex flex-col gap-4 max-w-sm">
                            <Link href="/#banner" className="flex items-center gap-2 w-fit">
                                <Image src="/logo.webp" alt="A ciência da Lua - logo" width={36} height={36} />
                                <span className="font-unkempt text-xl sm:text-2xl text-ouro">
                                    A Ciência da{" "}
                                    <span className="text-turquesa-dark">
                                        Lua
                                    </span>
                                </span>
                            </Link>
                            <p className="text-sm text-white/65 leading-relaxed">
                                Materiais de ensino e aprendizagem para estudantes e professores.
                            </p>
                        </div>

                        <div className="md:col-span-3 flex flex-col gap-3.5">
                            <span className="text-[11px] font-bold text-white/45 uppercase tracking-[0.18em]">
                                Seções
                            </span>
                            <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2.5">
                                {sections.map((section) => (
                                    <a
                                        key={section.label}
                                        href={section.href}
                                        className="text-sm text-white/75 hover:text-turquesa transition-colors w-fit"
                                    >
                                        {section.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="md:col-span-4 flex flex-col gap-3.5">
                            <span className="text-[11px] font-bold text-white/45 uppercase tracking-[0.18em]">
                                Links
                            </span>
                            <nav aria-label="Redes sociais" className="flex items-center gap-3">
                                {links.map((link) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            target={link.target}
                                            aria-label={link.label}
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-11 h-11 squircle-border-sm bg-white/[0.08] border border-white/[0.08] text-white/85 hover:bg-white/[0.14] hover:text-turquesa transition-all"
                                        >
                                            <IconComponent size={18} />
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/[0.08]">
                    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-5 flex items-center justify-center md:justify-start">
                        <p className="text-xs text-white/45">
                            © 2026 A Ciência da Lua. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
