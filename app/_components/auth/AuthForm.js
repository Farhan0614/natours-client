// src/app/_components/auth/AuthForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authenticate } from "../../_lib/api"; // 1. Import our new clean API function

export default function AuthForm({ mode = "login" }) {
  const isSignup = mode === "signup";
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 2. Prepare the payload based on mode
    const payload = isSignup
      ? { name, email, password, passwordConfirm }
      : { email, password };

    try {
      // 3. Call the external API function! Look how clean this is.
      await authenticate(payload, mode);

      // Success! Redirect to home and refresh the server components
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Error Message Display */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Conditionally render the Name field ONLY for signup */}
      {isSignup && (
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold text-slate-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            required={isSignup}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="px-4 py-3 bg-slate-100 text-slate-800 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 transition-all w-full disabled:opacity-50"
          />
        </div>
      )}

      {/* Email Group (Shared) */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-bold text-slate-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="px-4 py-3 bg-slate-100 text-slate-800 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 transition-all w-full disabled:opacity-50"
        />
      </div>

      {/* Password Group (Shared) */}
      <div className={`flex flex-col gap-2 ${isSignup ? "" : "mb-4"}`}>
        <label htmlFor="password" className="font-bold text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          minLength="8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="px-4 py-3 bg-slate-100 text-slate-800 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 transition-all w-full disabled:opacity-50"
        />
      </div>

      {/* Conditionally render the Confirm Password field ONLY for signup */}
      {isSignup && (
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="passwordConfirm" className="font-bold text-slate-700">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="••••••••"
            required={isSignup}
            minLength="8"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={isLoading}
            className="px-4 py-3 bg-slate-100 text-slate-800 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 transition-all w-full disabled:opacity-50"
          />
        </div>
      )}

      {/* Action Buttons & Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-500 text-white uppercase px-10 py-3 rounded-full font-semibold tracking-wider hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isLoading
            ? isSignup
              ? "Signing up..."
              : "Logging in..."
            : isSignup
              ? "Sign up"
              : "Login"}
        </button>

        {/* Toggle Link to switch pages */}
        {isSignup ? (
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p className="text-slate-600 text-sm">
            Need an account?{" "}
            <Link
              href="/signup"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
