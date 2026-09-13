"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "../../_lib/api";

export default function AddReviewForm({ tourId }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await createReview(tourId, { rating, review });
      setSuccess(true);
      setReview("");

      // Refresh the page data in the background to show the new review instantly!
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-100 text-emerald-800 p-6 rounded-2xl text-center font-bold">
        Thank you for your review! 🎉
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-6 max-w-2xl mx-auto mt-12 w-full"
    >
      <h3 className="text-2xl font-bold uppercase text-slate-800">
        Leave a Review
      </h3>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="rating" className="font-bold text-slate-700">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={isLoading}
          className="px-4 py-3 bg-slate-100 text-slate-800 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500"
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Very Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Poor</option>
          <option value={1}>1 - Terrible</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review" className="font-bold text-slate-700">
          Your Review
        </label>
        <textarea
          id="review"
          rows="4"
          placeholder="Tell us about your adventure..."
          required
          value={review}
          onChange={(e) => setReview(e.target.value)}
          disabled={isLoading}
          className="px-4 py-3 bg-slate-100 text-slate-800 rounded-lg border-2 border-transparent focus:outline-none focus:border-emerald-500 resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-emerald-500 text-white uppercase px-8 py-3 rounded-full font-semibold tracking-wider hover:bg-emerald-600 transition-all shadow-md self-end disabled:opacity-70"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
