import TourCard from "./_components/tours/TourCard";
import { getTours } from "./_lib/data";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createBookingCheckout } from "./_lib/api";

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
  const tours = await getTours();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
}
