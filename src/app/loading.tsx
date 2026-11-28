export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="w-full min-h-dvh flex flex-col bg-paper-texture"
    >
      <span className="sr-only">Carregando página…</span>

      {/* Hero Banner Skeleton */}
      <div className="w-full h-[52dvh] min-h-72 bg-hero flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-8">
          <div className="max-w-xl space-y-4">
            <div className="h-5 w-44 rounded-full skeleton-shimmer-dark" />
            <div className="h-10 sm:h-12 w-full rounded-2xl skeleton-shimmer-dark" />
            <div className="h-10 sm:h-12 w-4/5 rounded-2xl skeleton-shimmer-dark" />
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-44 rounded-full skeleton-shimmer-dark" />
              <div className="h-12 w-36 rounded-full skeleton-shimmer-dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Cards Skeleton */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 flex flex-col gap-6">
        <div className="h-4 w-40 rounded-full skeleton-shimmer" />
        <div className="h-9 w-full max-w-2xl rounded-xl skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/85 p-4 shadow-xs flex flex-col gap-3"
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
    </div>
  );
}
