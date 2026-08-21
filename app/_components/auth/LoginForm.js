"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // New state for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Hit your Express backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // CRITICAL: This tells the browser to accept the HttpOnly cookie!
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      console.log(data);

      // 2. Handle backend errors (e.g., wrong password)
      if (!res.ok) {
        throw new Error(data.message || "Failed to log in");
      }

      router.push("/");
      router.refresh();
      // 3. Success!
      console.log("Success! Logged in as:", data.data.user.name);

      // We will handle redirecting the user to the home page in the next step
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

      {/* Email Group */}
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
          className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 transition-all w-full disabled:opacity-50"
        />
      </div>

      {/* Password Group */}
      <div className="flex flex-col gap-2 mb-4">
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
          className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 transition-all w-full disabled:opacity-50"
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-emerald-500 text-white uppercase px-10 py-3 rounded-full font-semibold tracking-wider hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-md hover:shadow-lg self-start disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
