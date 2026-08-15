import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // TEMPORARY: Set to null to simulate logged out, or an object to simulate logged in.
  const user = null;

  return (
    <header className="bg-slate-800 px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md z-50">
      <nav className="flex items-center gap-6 text-slate-100 text-sm font-semibold uppercase tracking-wider">
        <Link href="/" className="hover:text-emerald-400 transition-colors">
          All tours
        </Link>
        <form className="flex items-center bg-slate-700 rounded-full px-4 py-2 border border-slate-600 focus-within:border-emerald-400 transition-colors">
          <button className="flex items-center justify-center">
            <svg className="w-4 h-4 fill-slate-300">
              <use xlinkHref="img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="bg-transparent border-none outline-none ml-3 text-slate-100 placeholder-slate-400 w-48 font-normal"
          />
        </form>
      </nav>

      <div className="flex-shrink-0">
        <Image
          src="/img/logo-white.png"
          alt="Natours logo"
          width={82}
          height={35}
          className="h-8 w-auto"
        />
      </div>

      <nav className="flex items-center gap-6 text-slate-100 text-sm font-semibold uppercase tracking-wider">
        {user ? (
          <>
            <button className="hover:text-emerald-400 transition-colors">
              Log out
            </button>
            <Link
              href="/me"
              className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
            >
              <Image
                src={`/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
                className="rounded-full object-cover border-2 border-slate-600"
                width={35}
                height={35}
              />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hover:text-emerald-400 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-emerald-500 text-white px-6 py-2.5 rounded-full hover:bg-emerald-600 hover:-translate-y-0.5 transition-all shadow-md"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
