"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateSettings } from "@/app/_lib/api";
import { getUserImageUrl } from "@/app/_util/getBackendImages";

export default function UpdateUserDataForm({ user }) {
  const router = useRouter();

  // 1. Initialize state with the user's current data
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photoFile, setPhotoFile] = useState(null);
  // New state for a temporary preview URL
  const [photoPreview, setPhotoPreview] = useState(getUserImageUrl(user.photo));

  // 2. UI States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      // Create a temporary local URL to show the user immediately
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // 4. Build FormData!
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);

      // Only append the photo if they actually selected a new one
      if (photoFile) {
        form.append("photo", photoFile);
      }

      // 5. Send the FormData! Notice the true flag at the end.
      await updateSettings(form, "data", true);

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Messages */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg text-sm font-semibold">
          Data updated successfully!
        </div>
      )}

      {/* Name and Email inputs (same as before) */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-slate-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          className="px-4 py-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-slate-700" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="px-4 py-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 w-full"
        />
      </div>

      {/* 6. The New Image Upload UI */}
      <div className="flex items-center gap-6 mt-2">
        <Image
          src={photoPreview} // Use our dynamic URL logic
          alt="User photo"
          width={75}
          height={75}
          className="rounded-full h-[75px] w-[75px] object-cover border-2 border-slate-200"
          unoptimized // Required for Next.js to load external Express images easily during dev
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          id="photo"
          name="photo"
          onChange={handlePhotoChange}
          className="hidden" // Hide the ugly default input
        />

        {/* Clickable label styled as a link */}
        <label
          htmlFor="photo"
          className="text-emerald-500 font-semibold border-b border-emerald-500 pb-0.5 hover:text-emerald-600 transition-colors cursor-pointer"
        >
          Choose new photo
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-emerald-500 text-white uppercase px-8 py-3 rounded-full font-semibold tracking-wider hover:bg-emerald-600 transition-all self-end mt-4 disabled:opacity-70"
      >
        {isLoading ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
