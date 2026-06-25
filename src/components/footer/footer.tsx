import Link from "next/link";

export function Footer() {
    return (
        <footer className="mt-10 border-t border-gray-300 w-full flex justify-center gap-3 px-6 py-6 text-[.8rem]">
            <p className="text-rosa-rose"> © 2026 A Ciência da Lua</p>
            <p className="text-texto-secundario"> · </p>
            <Link className="text-texto-secundario hover:text-texto-principal transition-colors" href="">Contato</Link>
            <p className="text-texto-secundario"> · </p>
            <Link href="https://www.instagram.com/acienciadalua?igsh=bXhjd2V6Njc50Wxy" target="_blank" className="text-texto-secundario hover:text-texto-principal transition-colors" >instagram</Link>
        </footer>
    );
}