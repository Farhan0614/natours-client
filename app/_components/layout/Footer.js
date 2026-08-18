import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-200 mt-auto">
      <div className="w-36">
        <Image
          src="/img/logo-green.png"
          alt="Natours logo"
          width={150}
          height={31}
          className="w-full h-auto"
        />
      </div>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500 font-semibold transition-colors">
        <li>
          <Link href="#" className="hover:text-emerald-500">
            About us
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-emerald-500">
            Download apps
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-emerald-500">
            Become a guide
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-emerald-500">
            Careers
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-emerald-500">
            Contact
          </Link>
        </li>
      </ul>

      <p className="text-sm text-slate-400 text-center md:text-right">
        &copy; by Jonas Schmedtmann. All rights reserved.
      </p>
    </footer>
  );
}

///////////////////////
////////////////////
