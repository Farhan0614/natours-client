"use client";

import { useState } from "react";
import { updateSettings } from "../../_lib/api"; // 1. Import our shared function

export default function UpdatePasswordForm() {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // 2. Call the shared function, passing the data and the 'password' type
      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        "password",
      );

      setSuccess(true);

      // Clear the form on success
      setPasswordCurrent("");
      setPassword("");
      setPasswordConfirm("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg text-sm font-semibold">
          Password updated successfully!
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-bold text-slate-700" htmlFor="password-current">
          Current password
        </label>
        <input
          id="password-current"
          type="password"
          value={passwordCurrent}
          onChange={(e) => setPasswordCurrent(e.target.value)}
          placeholder="••••••••"
          required
          minLength="8"
          disabled={isLoading}
          className="px-4 py-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-slate-700" htmlFor="password">
          New password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength="8"
          disabled={isLoading}
          className="px-4 py-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-slate-700" htmlFor="password-confirm">
          Confirm password
        </label>
        <input
          id="password-confirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="••••••••"
          required
          minLength="8"
          disabled={isLoading}
          className="px-4 py-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-emerald-500 text-white uppercase px-8 py-3 rounded-full font-semibold tracking-wider hover:bg-emerald-600 transition-all self-end mt-4 disabled:opacity-70"
      >
        {isLoading ? "Saving..." : "Save password"}
      </button>
    </form>
  );
}
