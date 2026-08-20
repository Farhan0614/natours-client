// src/app/_components/tours/ReviewCard.js
import Image from "next/image";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-slate-50 rounded-2xl shadow-md p-10 flex flex-col items-center text-center gap-6 min-w-75 w-80 snap-center transition-transform hover:-translate-y-2">
      <div className="flex items-center gap-4">
        <Image
          src={`/img/users/${review.user.photo}`}
          alt={review.user.name}
          width={45}
          height={45}
          className="rounded-full"
        />
        <h6 className="font-bold text-slate-700 uppercase tracking-wider text-sm">
          {review.user.name}
        </h6>
      </div>

      <p className="text-slate-600 italic leading-relaxed text-sm flex-1">
        &quot;{review.review}&quot;
      </p>

      <div className="flex gap-1 mt-auto">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${review.rating >= star ? "fill-emerald-500" : "fill-slate-300"}`}
          >
            <use xlinkHref="/img/icons.svg#icon-star"></use>
          </svg>
        ))}
      </div>
    </div>
  );
}
