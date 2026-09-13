export default function Loading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="relative h-[85vh] flex items-center justify-center [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
        <div className="absolute inset-0 bg-slate-300 animate-pulse" />
        <div className="z-20 flex flex-col items-center gap-6">
          <div className="h-14 w-3/4 max-w-xl bg-slate-400/60 rounded animate-pulse" />
          <div className="h-6 w-64 bg-slate-400/50 rounded animate-pulse" />
        </div>
      </section>

      {/* Description skeleton */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 animate-pulse">
        <div className="flex flex-col gap-4">
          <div className="h-8 w-56 bg-slate-200 rounded" />
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-4/5 bg-slate-100 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
        </div>
      </section>

      {/* CTA skeleton */}
      <section className="bg-slate-100 pt-32 pb-24 flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full mx-6 p-12 h-48 animate-pulse" />
      </section>
    </main>
  );
}
