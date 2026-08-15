import TourCard from "./_components/tours/TourCard";

async function getTours() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/tours", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tours");
  }

  const fetchedData = await res.json();
  return fetchedData.data.data || fetchedData.data.tours;
}

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
