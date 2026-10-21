export function SectionDivider() {
  return (
    <div className="flex items-center gap-4 px-4 md:px-0">
      <hr className="flex-1 border-borda" />
      <span className="text-[10px] md:text-xs text-texto-secundario font-black uppercase tracking-[0.3em]">ou</span>
      <hr className="flex-1 border-borda" />
    </div>
  );
}
