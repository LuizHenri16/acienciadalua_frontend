export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-dvh w-full flex flex-col bg-paper-texture pt-[var(--header-h)]"
    >
      <span className="sr-only">Carregando dados do material…</span>
      <div className="flex-1 flex flex-col lg:flex-row mb-10 py-6">
        {/* Left cover showcase skeleton */}
        <div className="relative lg:w-1/2 xl:w-[35%] h-82 sm:h-96 lg:h-140 bg-marinho rounded-r-4xl shrink-0 overflow-hidden flex items-center justify-center">
          <div className="w-40 h-52 rounded-2xl skeleton-shimmer-dark" />
        </div>

        {/* Right product details skeleton */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-14 xl:px-20 py-8 lg:py-0">
          <div className="max-w-xl w-full mx-auto lg:mx-0 space-y-10">
            <div className="space-y-4 border-b border-borda py-5">
              <div className="h-5 w-36 rounded-full skeleton-shimmer" />
              <div className="space-y-2.5">
                <div className="h-9 w-full rounded-xl skeleton-shimmer" />
                <div className="h-9 w-3/4 rounded-xl skeleton-shimmer" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-44 rounded-xl skeleton-shimmer" />
              <div className="h-14 w-full squircle-border skeleton-shimmer" />
              <div className="flex items-center justify-center gap-8 p-4 mt-8 border-t border-borda">
                <div className="h-4 w-32 rounded-full skeleton-shimmer" />
                <div className="h-4 w-28 rounded-full skeleton-shimmer" />
              </div>
            </div>

            <div className="space-y-3 py-6 px-5 border border-borda squircle-border bg-white/60">
              <div className="h-5 w-40 rounded-full skeleton-shimmer" />
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded-full skeleton-shimmer" />
                <div className="h-3.5 w-11/12 rounded-full skeleton-shimmer" />
                <div className="h-3.5 w-4/5 rounded-full skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
