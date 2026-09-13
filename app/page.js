import TourCard from "./_components/tours/TourCard";
import { getTours } from "./_lib/data";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createBookingCheckout } from "./_lib/api";
import { Suspense } from "react";
import Loading from "./loading";

// Tours grid is an async server component that fetches from Express,
// so it gets wrapped in Suspense and streamed while the shell renders.
async function ToursGrid() {
  const tours = await getTours();

  if (!tours || tours.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <p className="text-xl font-semibold text-slate-700">
          No tours available right now. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

export default async function OverviewPage({ searchParams }) {
  const { tour, user, price } = await searchParams;

  if (tour && user && price) {
    // 2. Read the JWT cookie from the browser's request
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const cookieString = jwt ? `jwt=${jwt}` : "";

    try {
      // 3. Pass the cookie string to the API function
      await createBookingCheckout({ tour, user, price }, cookieString);
    } catch (error) {
      console.error("Booking creation failed:", error);
    }

    // 4. Clean the URL
    redirect("/");
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <Suspense fallback={<Loading />}>
        <ToursGrid />
      </Suspense>
    </main>
  );
}
