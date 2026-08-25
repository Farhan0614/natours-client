// src/app/_components/tours/TourHero.js
import { getTourImageUrl } from "@/app/_util/getBackendImages";
import Image from "next/image";

export default function TourHero({ tour }) {
  return (
    <section className="relative h-[85vh] flex items-center justify-center [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-400 to-emerald-600 opacity-70 z-10 mix-blend-multiply"></div>
      <Image
        src={getTourImageUrl(tour.imageCover)}
        alt={tour.name}
        fill
        className="object-cover z-0"
        priority
        sizes="100vw"
        unoptimized
      />
      <div className="z-20 text-center text-white flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-light uppercase w-3/4 mb-8">
          <span className="bg-linear-to-br from-emerald-400/80 to-emerald-600/80 px-6 py-2 box-decoration-clone leading-snug">
            {tour.name} tour
          </span>
        </h1>
        <div className="flex gap-8 text-lg font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 fill-white">
              <use xlinkHref="/img/icons.svg#icon-clock"></use>
            </svg>
            <span>{tour.duration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 fill-white">
              <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
            </svg>
            <span>{tour.startLocation.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
