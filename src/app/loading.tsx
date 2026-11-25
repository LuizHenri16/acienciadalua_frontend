export default function Loading() {
  return (
    <div className="w-full min-h-dvh flex flex-col bg-paper-texture">
      <div className="w-full h-[45dvh] min-h-64 bg-hero" />
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 flex flex-col gap-6"
      >
        <span className="sr-only">Carregando página…</span>
        <div className="h-4 w-40 bg-gray-200/70 squircle-border-sm animate-pulse" />
        <div className="h-9 w-full max-w-2xl bg-gray-200/70 squircle-border-sm animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-4/3 bg-gray-200/70 squircle-border animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
