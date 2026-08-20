// src/app/tour/[slug]/page.js
import { getTour } from "../../_lib/data";
import TourHero from "../../_components/tours/TourHero";
import TourPictures from "../../_components/tours/TourPictures";
import TourCTA from "../../_components/tours/TourCTA";
import ReviewCard from "../../_components/tours/ReviewCard";
import Image from "next/image"; // Kept for the Description section

export default async function TourDetailPage({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour)
    return <div className="text-center py-20 text-2xl">Tour not found!</div>;

  const date = new Date(tour.startDates[0]).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <TourHero tour={tour} />

      {/* DESCRIPTION & GUIDES SECTION (Kept inline because it's the core text content, but you could extract this too!) */}
      <section className="bg-slate-50 py-24 flex justify-center -mt-[15vh]">
        {/* ... (Your existing Quick Facts, Guides, and About text HTML) ... */}
      </section>

      <TourPictures images={tour.images} tourName={tour.name} />

      {/* MAP PLACEHOLDER */}
      <section className="bg-slate-100 h-[65vh] flex items-center justify-center -mt-24 relative z-0">
        <p className="text-slate-400 font-bold uppercase tracking-wider text-xl">
          Map Component goes here
        </p>
      </section>

      {/* REVIEWS SECTION */}
      <section className="bg-linear-to-br from-emerald-400 to-emerald-600 py-32 relative [clip-path:polygon(0_9vw,100%_0,100%_calc(100%-9vw),0_100%)] -mt-24 z-10 flex overflow-hidden">
        <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory px-8 md:px-20 py-8 no-scrollbar w-full">
          {tour.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>

      <TourCTA tour={tour} />
    </main>
  );
}
