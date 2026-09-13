export default function Loading() {
  return (
    <main className="bg-slate-100 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[75vh] animate-pulse">
        <aside className="w-full md:w-80 bg-slate-800 flex flex-col py-10 gap-4 flex-shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 mx-8 bg-slate-700/50 rounded" />
          ))}
        </aside>
        <section className="flex-1 p-10 md:p-16 flex flex-col gap-10">
          <div className="h-8 w-64 bg-slate-200 rounded" />
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-12 w-40 bg-slate-200 rounded-full" />
          </div>
          <div className="h-8 w-64 bg-slate-200 rounded" />
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-10 w-full bg-slate-100 rounded" />
          </div>
        </section>
      </div>
    </main>
  );
}
