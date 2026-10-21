export function CatalogSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-9 w-56 bg-gray-200/70 rounded-xl animate-pulse" />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-11 w-40 bg-gray-200/70 rounded-2xl animate-pulse" />
        ))}
      </div>
      <div className="h-12 w-full bg-gray-200/70 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-4/3 bg-gray-200/70 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
