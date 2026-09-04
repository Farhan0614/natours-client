// src/app/me/page.js
import { getMe } from "../_lib/data";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UpdateUserDataForm from "../_components/auth/UpdateUserDataForm";
import UpdatePasswordForm from "../_components/auth/UpdatePasswordForm";

// Helper component for the sidebar navigation links
function NavItem({ link, text, icon, active }) {
  return (
    <li
      className={`px-8 py-4 transition-colors ${active ? "border-l-4 border-emerald-500 bg-slate-700/50" : "hover:bg-slate-700/30"}`}
    >
      <Link
        href={link}
        className="flex items-center gap-4 text-slate-100 font-semibold uppercase tracking-wider text-sm"
      >
        <svg className="w-5 h-5 fill-emerald-400">
          <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
        </svg>
        {text}
      </Link>
    </li>
  );
}

export const metadata = {
  title: "Your account | Natours",
};

export default async function ProfilePage() {
  // 1. Route Protection: Fetch the user, redirect if not logged in
  const user = await getMe();
  if (!user) {
    throw new Error("You are not logged in! Please log in to get access.");
  }

  return (
    <main className="bg-slate-100 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[75vh]">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-80 bg-slate-800 flex flex-col py-10 flex-shrink-0">
          <nav>
            <ul className="flex flex-col">
              <NavItem link="#" text="Settings" icon="settings" active={true} />
              <NavItem
                link="/me/my-bookings"
                text="My bookings"
                icon="briefcase"
                active={false}
              />
              <NavItem link="#" text="My reviews" icon="star" active={false} />
              <NavItem
                link="#"
                text="Billing"
                icon="credit-card"
                active={false}
              />
            </ul>
          </nav>

          {/* Conditional Admin Menu */}
          {user.role === "admin" && (
            <div className="mt-12">
              <h5 className="px-8 mb-4 text-slate-400 font-bold uppercase tracking-widest text-xs border-b border-slate-700 pb-2">
                Admin Menu
              </h5>
              <ul className="flex flex-col">
                <NavItem
                  link="#"
                  text="Manage tours"
                  icon="map"
                  active={false}
                />
                <NavItem
                  link="#"
                  text="Manage users"
                  icon="users"
                  active={false}
                />
                <NavItem
                  link="#"
                  text="Manage reviews"
                  icon="star"
                  active={false}
                />
                <NavItem
                  link="#"
                  text="Manage bookings"
                  icon="briefcase"
                  active={false}
                />
              </ul>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT AREA */}
        <section className="flex-1 p-10 md:p-16">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold uppercase text-slate-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
              Your account settings
            </h2>

            <UpdateUserDataForm user={user} />
          </div>

          <hr className="border-slate-200 mb-16" />

          {/* PASSWORD CHANGE FORM (UI Only for now) */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold uppercase text-slate-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
              Password change
            </h2>

            <UpdatePasswordForm />
          </div>
        </section>
      </div>
    </main>
  );
}
