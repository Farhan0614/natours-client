// src/app/tour/[slug]/page.js
import { getTour } from "../../_lib/data";
import TourHero from "../../_components/tours/TourHero";
import TourDescription from "../../_components/tours/TourDescription";
import TourPictures from "../../_components/tours/TourPictures";
import TourCTA from "../../_components/tours/TourCTA";
import ReviewCard from "../../_components/tours/ReviewCard";

import TourMap from "../../_components/tours/TourMap";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Natours",
    };
  }

  return {
    title: `Natours | ${tour.name} Tour `,
    // You can also add dynamic SEO descriptions here!
    description: tour.summary,
  };
}

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

      <TourDescription tour={tour} date={date} />

      <TourPictures images={tour.images} tourName={tour.name} />

      {/* MAP PLACEHOLDER */}
      <section className="bg-slate-100 h-[65vh] flex items-center justify-center mt-[-9vw] relative z-0 [clip-path:polygon(0_9vw,100%_0,100%_calc(100%-9vw),0_100%)]">
        <TourMap locations={tour.locations} />
      </section>

      {/* REVIEWS SECTION */}
      <section className="bg-linear-to-br from-emerald-300 to-emerald-700 py-48 relative [clip-path:polygon(0_9vw,100%_0,100%_calc(100%-9vw),0_100%)] mt-[-9vw] z-10 flex overflow-hidden">
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
