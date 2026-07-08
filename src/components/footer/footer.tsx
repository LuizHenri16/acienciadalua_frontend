import Link from "next/link";
import Image from "next/image";

const sections = [
    { label: "Início", href: "/#banner" },
    { label: "Para Estudar", href: "/#produtos" },
    { label: "Para Dar Aula", href: "/#produtos" },
    { label: "Sobre", href: "/#sobre" },
    { label: "FAQ", href: "/#faq" },
];

const links = [
    { label: "Contato", href: "mailto:contato@acienciadalua.com.br" },
    { label: "Instagram", href: "https://www.instagram.com/acienciadalua?igsh=bXhjd2V6Njc50Wxy", target: "_blank" as const },
    { label: "Minha Conta", href: "/minha-conta/signin" },
];

export function Footer() {
    return (
        <footer className="mt-10 border-t border-borda bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                    <div className="flex flex-col gap-3 max-w-xs">
                        <div className="flex items-center gap-2">
                            <Image src="/acienciadalua-logo-var1.svg" alt="Logotipo A Ciência da Lua" width={32} height={32} />
                            <span className="font-unkempt text-xl text-ouro">
                                A Ciência da{" "}
                                <span className="text-turquesa-dark">Lua</span>
                            </span>
                        </div>
                        <p className="text-xs text-texto-terciario leading-relaxed">
                            Materiais de ensino e aprendizagem para estudantes e professores.
                        </p>
                    </div>

                    <div className="flex flex-1 gap-10 md:gap-20">
                        <div className="flex flex-col gap-3">
                            <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider">Seções</span>
                            <nav className="flex flex-col gap-2">
                                {sections.map((section) => (
                                    <a
                                        key={section.label}
                                        href={section.href}
                                        className="text-sm text-texto-terciario hover:text-turquesa-dark transition-colors"
                                    >
                                        {section.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-xs font-bold text-texto-secundario uppercase tracking-wider">Links</span>
                            <nav className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        target={link.target}
                                        className="text-sm text-texto-terciario hover:text-turquesa-dark transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-borda">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <p className="text-xs text-texto-terciario">
                        © 2026 A Ciência da Lua. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
