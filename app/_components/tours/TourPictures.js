// src/app/_components/tours/TourPictures.js
import Image from "next/image";

export default function TourPictures({ images, tourName }) {
  return (
    <section className="flex [clip-path:polygon(0_9vw,100%_0,100%_calc(100%-9vw),0_100%)] -mt-24 z-10 relative flex-col md:flex-row">
      {images.map((img, i) => (
        <div key={i} className="relative h-[60vw] md:h-[30vw] flex-1 pt-[15%]">
          <Image
            src={`/img/tours/${img}`}
            alt={`${tourName} Tour ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={i === 0}
          />
        </div>
      ))}
    </section>
  );
}
