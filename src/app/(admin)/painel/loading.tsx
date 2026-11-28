export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="painel-ds min-h-dvh w-full flex flex-col lg:flex-row"
    >
      <span className="sr-only">Carregando painel administrativo…</span>

      {/* Desktop Compact Icon Rail Skeleton */}
      <aside
        aria-hidden="true"
        className="hidden lg:flex shrink-0 sticky top-0 h-dvh w-[68px] bg-white border-r border-marinho/[0.07] flex-col items-center justify-between py-4 px-2.5"
      >
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
          <div className="flex flex-col items-center gap-2 w-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-xl ${
                  i === 1 ? "bg-marinho/15" : "skeleton-shimmer"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl skeleton-shimmer" />
          <div className="w-9 h-9 rounded-xl skeleton-shimmer" />
          <div className="w-9 h-9 rounded-xl skeleton-shimmer mt-1" />
        </div>
      </aside>

      {/* Mobile Top Bar Skeleton */}
      <div
        aria-hidden="true"
        className="lg:hidden h-14 bg-white border-b border-marinho/[0.07] px-3 flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
          <div className="h-4 w-32 rounded-full skeleton-shimmer" />
        </div>
        <div className="h-9 w-24 rounded-full skeleton-shimmer" />
      </div>

      {/* Main Content Workspace Skeleton */}
      <main className="flex-1 min-w-0 px-3 sm:px-6 lg:px-8 py-4 sm:py-7">
        <div className="max-w-[1340px] mx-auto flex flex-col gap-5 sm:gap-6">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
            <div className="space-y-2">
              <div className="h-7 sm:h-8 w-56 sm:w-72 rounded-full skeleton-shimmer" />
              <div className="h-4 w-48 sm:w-64 rounded-full skeleton-shimmer" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-36 rounded-full bg-white shadow-xs skeleton-shimmer" />
              <div className="w-10 h-10 rounded-full bg-white shadow-xs skeleton-shimmer" />
              <div className="h-10 w-32 rounded-full bg-marinho/20 skeleton-shimmer" />
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[140px] ${
                  i === 2 ? "painel-card-accent" : "painel-card-soft"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full skeleton-shimmer" />
                  <div className="h-5 w-14 rounded-full skeleton-shimmer" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-20 rounded-full skeleton-shimmer" />
                  <div className="h-7 w-28 rounded-full skeleton-shimmer" />
                  <div className="h-3 w-32 rounded-full skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>

          {/* Chart & List Row */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-4 sm:gap-5">
            <div className="rounded-3xl painel-card-navy p-5 sm:p-6 flex flex-col justify-between min-h-[340px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded-full skeleton-shimmer-dark" />
                  <div className="h-7 w-32 rounded-full skeleton-shimmer-dark" />
                </div>
                <div className="h-9 w-56 rounded-full skeleton-shimmer-dark" />
              </div>
              <div className="mt-6 flex items-end gap-3 h-40">
                {[42, 68, 55, 84, 62, 92, 74, 88].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t-xl skeleton-shimmer-dark"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 w-16 rounded-full skeleton-shimmer-dark" />
                    <div className="h-5 w-24 rounded-full skeleton-shimmer-dark" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl painel-card p-5 sm:p-6 flex flex-col justify-between min-h-[340px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-28 rounded-full skeleton-shimmer" />
                  <div className="h-3 w-20 rounded-full skeleton-shimmer" />
                </div>
                <div className="space-y-4 pt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full skeleton-shimmer shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 rounded-full skeleton-shimmer" />
                        <div className="h-1.5 w-full rounded-full skeleton-shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-10 w-full rounded-full skeleton-shimmer mt-5" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}