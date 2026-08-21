// src/app/error.js
"use client"; // Error boundaries must be Client Components

export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50 px-6 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4 uppercase tracking-wide">
        Something went wrong!
      </h2>

      {/* THIS IS YOUR BACKEND ERROR MESSAGE! */}
      <p className="text-slate-700 mb-8 text-lg max-w-lg">{error.message}</p>

      <button
        onClick={() => reset()} // Attempts to re-render the segment
        className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
