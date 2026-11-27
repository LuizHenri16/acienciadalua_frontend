export function CatalogSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="flex flex-col gap-8">
      <span className="sr-only">Carregando materiais…</span>

      <div className="space-y-2">
        <div className="h-9 w-56 rounded-xl skeleton-shimmer" />
        <div className="h-4 w-80 max-w-full rounded-full skeleton-shimmer" />
      </div>

      <div className="flex gap-2.5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-11 w-40 shrink-0 squircle-border skeleton-shimmer" />
        ))}
      </div>

      <div className="h-12 w-full rounded-full bg-white/80 shadow-xs px-4 flex items-center gap-3">
        <div className="w-5 h-5 rounded-full skeleton-shimmer shrink-0" />
        <div className="h-3.5 w-48 rounded-full skeleton-shimmer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-white/90 p-4 shadow-xs flex flex-col gap-3"
          >
            <div className="aspect-4/3 rounded-2xl skeleton-shimmer" />
            <div className="h-4 w-24 rounded-full skeleton-shimmer" />
            <div className="h-5 w-5/6 rounded-full skeleton-shimmer" />
            <div className="flex items-center justify-between pt-2">
              <div className="h-5 w-20 rounded-full skeleton-shimmer" />
              <div className="h-8 w-24 rounded-full skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
