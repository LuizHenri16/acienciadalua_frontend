export function CatalogSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="flex flex-col">
      <span className="sr-only">Carregando materiais…</span>

      <section className="w-full bg-hero">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-[calc(var(--header-h)+2.25rem)] pb-20 sm:pt-[calc(var(--header-h)+3rem)] sm:pb-24 lg:pt-[calc(var(--header-h)+3.5rem)] lg:pb-28">
          <div className="flex flex-col gap-5 max-w-3xl">
            <div className="h-4 w-48 rounded-full skeleton-shimmer-dark" />
            <div className="h-12 w-full max-w-xl rounded-2xl skeleton-shimmer-dark" />
            <div className="h-4 w-3/4 max-w-md rounded-full skeleton-shimmer-dark" />
            <div className="pt-5 mt-1 border-t border-white/[0.08] flex items-center gap-6">
              <div className="h-10 w-24 rounded-xl skeleton-shimmer-dark" />
              <div className="h-10 w-24 rounded-xl skeleton-shimmer-dark" />
              <div className="h-10 w-24 rounded-xl skeleton-shimmer-dark" />
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-10 lg:px-14 mt-4 sm:mt-10 mb-10 sm:mb-14 flex flex-col gap-4 sm:gap-6">
        <div className="bg-white border-y sm:border border-borda squircle-border max-sm:rounded-none! p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-11 w-36 shrink-0 squircle-border skeleton-shimmer" />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-full sm:w-72 squircle-border-sm skeleton-shimmer" />
            <div className="h-10 w-36 squircle-border-sm skeleton-shimmer shrink-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-none sm:rounded-3xl bg-white border-y sm:border border-borda p-4 shadow-xs flex flex-col gap-3"
            >
              <div className="aspect-4/3 rounded-2xl skeleton-shimmer" />
              <div className="h-4 w-24 rounded-full skeleton-shimmer" />
              <div className="h-5 w-5/6 rounded-full skeleton-shimmer" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-5 w-20 rounded-full skeleton-shimmer" />
                <div className="h-9 w-28 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
