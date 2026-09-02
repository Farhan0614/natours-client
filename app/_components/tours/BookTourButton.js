"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCheckoutSession } from "../../_lib/api";

export default function BookTourButton({ tourId, isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    // 1. Frontend check: Is the cookie completely missing?
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);

      const checkoutUrl = await getCheckoutSession(tourId);
      window.location.assign(checkoutUrl);
    } catch (err) {
      // 2. Backend check: Did Express reject the cookie?
      // (Checking if the Express error message contains "log in")
      if (err.message.toLowerCase().includes("log in")) {
        router.push("/login");
      } else {
        // Only alert if it's a real Stripe/Network error
        alert("Payment error: " + err.message);
      }

      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={isLoading}
      className="bg-emerald-500 text-white uppercase px-8 py-4 rounded-full font-semibold tracking-wider hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-md hover:shadow-lg w-full md:w-auto disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {isLoading
        ? "Processing..."
        : isLoggedIn
          ? "Book tour now!"
          : "Log in to book tour"}
    </button>
  );
}
