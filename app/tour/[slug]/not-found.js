import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50 px-6">
      <h2 className="text-4xl font-bold text-slate-800 mb-4">Not Found:)</h2>
      <p className="text-slate-600 mb-8 text-lg">
        The tour you are looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors"
      >
        Go back home
      </Link>
    </main>
  );
}
