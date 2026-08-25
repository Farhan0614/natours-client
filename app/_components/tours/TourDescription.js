// src/app/_components/tours/TourDescription.js
import { getUserImageUrl } from "@/app/_util/getBackendImages";
import Image from "next/image";

export default function TourDescription({ tour, date }) {
  return (
    <section className="bg-slate-50 py-24 flex justify-center -mt-[15vh]">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden mt-[15vh]">
        {/* Left Side: Quick Facts & Guides */}
        <div className="bg-slate-100 p-12 lg:p-20 flex flex-col gap-12">
          {/* Quick Facts */}
          <div>
            <h2 className="text-2xl font-bold uppercase text-emerald-500 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
              Quick facts
            </h2>
            <div className="flex flex-col gap-6 text-slate-700 text-sm">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 fill-emerald-500">
                  <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                </svg>
                <span className="font-bold uppercase w-32">Next date</span>
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 fill-emerald-500">
                  <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                </svg>
                <span className="font-bold uppercase w-32">Difficulty</span>
                <span>{tour.difficulty}</span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 fill-emerald-500">
                  <use xlinkHref="/img/icons.svg#icon-user"></use>
                </svg>
                <span className="font-bold uppercase w-32">Participants</span>
                <span>{tour.maxGroupSize} people</span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 fill-emerald-500">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <span className="font-bold uppercase w-32">Rating</span>
                <span>{tour.ratingsAverage} / 5</span>
              </div>
            </div>
          </div>

          {/* Tour Guides */}
          <div>
            <h2 className="text-2xl font-bold uppercase text-emerald-500 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
              Your tour guides
            </h2>
            <div className="flex flex-col gap-6 text-slate-700 text-sm">
              {tour.guides.map((guide) => (
                <div key={guide._id} className="flex items-center gap-4">
                  <Image
                    src={getUserImageUrl(guide.photo)}
                    alt={guide.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                  <span className="font-bold uppercase w-32">
                    {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                  </span>
                  <span>{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: About Text */}
        <div className="p-12 lg:p-20">
          <h2 className="text-2xl font-bold uppercase text-emerald-500 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
            About {tour.name} tour
          </h2>
          <div className="flex flex-col gap-4 text-slate-600 text-[15px] leading-relaxed">
            {tour.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
