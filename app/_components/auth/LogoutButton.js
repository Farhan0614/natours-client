// src/app/_components/auth/LogoutButton.js
"use client"; // <--- ADD THIS LINE!

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
        {
          method: "GET",
          credentials: "include", // CRITICAL: Must include this to overwrite the cookie
        },
      );

      const data = await res.json();

      // If successful, refresh the Next.js router
      if (data.status === "success") {
        router.push("/"); // Send them to the home page
        router.refresh(); // This forces the Header (Server Component) to re-run
      }
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Error logging out! Try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:text-emerald-400 transition-colors"
    >
      Log out
    </button>
  );
}
