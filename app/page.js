import TourCard from "./_components/tours/TourCard";
import { getTours } from "./_lib/data";

export default async function OverviewPage() {
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
