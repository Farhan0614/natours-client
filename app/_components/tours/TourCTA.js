// src/app/_components/tours/TourCTA.js
import { getTourImageUrl } from "@/app/_util/getBackendImages";
import Image from "next/image";
import BookTourButton from "./BookTourButton";

// Assuming you pass down a boolean `isLoggedIn` from the parent page
export default function TourCTA({ tour, isLoggedIn }) {
  return (
    <section className="bg-slate-100 pt-32 pb-24 flex justify-center -mt-24 relative z-0">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full mx-6 p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="flex items-center justify-center gap-4 relative z-10 hidden md:flex">
          <div className="w-32 h-32 rounded-full overflow-hidden relative shadow-lg z-20 border-4 border-white">
            <Image
              src={getTourImageUrl(tour.images[1])}
              alt="Tour pic 1"
              fill
              className="object-cover"
              sizes="150px"
              unoptimized
            />
          </div>
          <div className="w-32 h-32 rounded-full overflow-hidden relative shadow-lg z-10 -ml-12 border-4 border-white">
            <Image
              src={getTourImageUrl(tour.images[2])}
              alt="Tour pic 2"
              fill
              className="object-cover"
              sizes="150px"
              unoptimized
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left z-10 relative">
          <h2 className="text-3xl font-bold uppercase text-emerald-500 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
            What are you waiting for?
          </h2>
          <p className="text-slate-700 text-lg mb-8 font-semibold">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>

          {/* Drop in our new Interactive Client Component! */}
          <BookTourButton tourId={tour.id} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </section>
  );
}
