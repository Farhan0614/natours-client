// src/app/my-bookings/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TourCard from "@/app/_components/tours/TourCard";
import { getMyBookings } from "@/app/_lib/api";
// Import whatever component you use on your home page to display a single tour!
// import TourCard from "../_components/tours/TourCard";

export const metadata = {
  title: "My Bookings | Natours",
};

export default async function MyBookingsPage() {
  // 1. Get the JWT cookie
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    // If they aren't logged in, kick them to the login page
    redirect("/login");
  }

  const cookieString = `jwt=${jwt}`;

  // 2. Fetch the booked tours from Express
  const bookedTours = await getMyBookings(cookieString);

  return (
    <main className="min-h-[80vh] bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold uppercase mb-10 text-slate-800 tracking-wider">
          My Booked Tours
        </h2>

        {bookedTours.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <p className="text-xl font-semibold text-slate-700">
              You haven't booked any tours yet!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Map over the tours. If you have a TourCard component, drop it in here! */}
            {bookedTours.map((tour) => (
              <TourCard tour={tour} key={tour.id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
