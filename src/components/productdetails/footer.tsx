export function ProductDetailsFooter() {
    return (
        <footer className="border-t border-borda bg-off-white px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <p className="block text-xs text-texto-terciario opacity-70">
                &copy; <span style={{ fontFamily: "var(--font-unkempt)", fontSize: "0.85rem" }}>A Ciência da Lua</span> — Todos os direitos reservados
            </p>
        </footer>
    );
}