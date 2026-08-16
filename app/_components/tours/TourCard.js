import Image from "next/image";
import Link from "next/link";

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-3 hover:shadow-2xl duration-300">
      {/* Header Section */}
      <div className="relative">
        <div className="relative h-64 [clip-path:polygon(0_0,100%_0,100%_83%,0_100%)]">
          {/* Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-60 z-10 mix-blend-multiply"></div>
          <Image
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
            fill={true}
            style={{ objectFit: "cover" }}
            className="z-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Title */}
        <h3 className="absolute bottom-4 right-4 text-white text-3xl font-light uppercase text-right w-2/3 z-20">
          <span className="bg-gradient-to-br from-emerald-400/80 to-emerald-600/80 px-4 py-1 box-decoration-clone leading-snug">
            {tour.name}
          </span>
        </h3>
      </div>

      {/* Details Section */}
      <div className="px-8 py-6 flex-1 flex flex-col gap-6">
        <div>
          <h4 className="text-sm font-bold uppercase text-slate-800 mb-2">
            {tour.difficulty} {tour.duration}-day tour
          </h4>
          <p className="text-slate-500 italic text-sm">{tour.summary}</p>
        </div>

        {/* 2x2 Grid for Data Icons */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[13px] text-slate-600 mt-auto">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 fill-emerald-500">
              <use xlinkHref="img/icons.svg#icon-map-pin"></use>
            </svg>
            <span>{tour.startLocation.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 fill-emerald-500">
              <use xlinkHref="img/icons.svg#icon-calendar"></use>
            </svg>
            <span>
              {new Date(tour.startDates[0]).toLocaleString("en-us", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 fill-emerald-500">
              <use xlinkHref="img/icons.svg#icon-flag"></use>
            </svg>
            <span>{tour.locations.length} stops</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 fill-emerald-500">
              <use xlinkHref="img/icons.svg#icon-user"></use>
            </svg>
            <span>{tour.maxGroupSize} people</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-slate-100 border-t border-slate-200 px-8 py-4 flex justify-between items-center mt-auto">
        <div className="text-sm text-slate-500 flex flex-col gap-1">
          <p>
            <span className="font-bold text-slate-800 text-lg">
              ${tour.price}
            </span>{" "}
            per person
          </p>
          <p>
            <span className="font-bold text-slate-800">
              {tour.ratingsAverage}
            </span>{" "}
            rating ({tour.ratingsQuantity})
          </p>
        </div>
        <Link
          href={`/tour/${tour.slug}`}
          className="bg-emerald-500 text-white uppercase px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider hover:bg-emerald-600 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

//-------------//
