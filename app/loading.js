function TourCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      <div className="relative h-64 bg-slate-200 [clip-path:polygon(0_0,100%_0,100%_83%,0_100%)]" />
      <div className="px-8 py-6 flex flex-col gap-6 flex-1">
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-5/6 bg-slate-100 rounded" />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="h-8 w-20 bg-slate-200 rounded" />
          <div className="h-9 w-24 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <TourCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
