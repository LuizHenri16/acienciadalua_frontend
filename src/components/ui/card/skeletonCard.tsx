export function SkeletonCard() {
    return (
        <div className="bg-white h-80 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-pulse">
            <div className="w-full aspect-[4/3] bg-gray-200" />
            <div className="p-3 flex flex-col gap-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mt-1" />
                <div className="mt-auto w-full h-8 bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}
