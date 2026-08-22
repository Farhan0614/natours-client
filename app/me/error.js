"use client";

import Link from "next/link";

export default function Error({ error }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50 px-6 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4 uppercase tracking-wide">
        Access Denied
      </h2>

      {/* Renders: "You are not logged in! Please log in to get access." */}
      <p className="text-slate-700 mb-8 text-lg max-w-lg">{error.message}</p>

      {/* Directing them to the login page instead of resetting */}
      <Link
        href="/login"
        className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors inline-block"
      >
        Go to Login Page
      </Link>
    </main>
  );
}
