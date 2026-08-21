import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Fetch all tours
export async function getTours() {
  const res = await fetch(`${API_URL}/tours`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tours");
  }

  const fetchedData = await res.json();
  return fetchedData.data.data || fetchedData.data.tours;
}

// 2. Fetch a single tour by slug
export async function getTour(slug) {
  const res = await fetch(`${API_URL}/tours/slug/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const errorData = await res.json();
    // 2. If Express sends a 404 (e.g., "There is no tour with that name.")
    // Instantly trigger the Next.js not-found page. No need to throw an Error!
    if (res.status === 404) {
      notFound();
    }

    // 3. For all other errors (500s, DB crashes), throw to the global error.js
    throw new Error(
      errorData.message || "Something went wrong fetching the tour",
    );
  }

  const fetchedData = await res.json();
  return fetchedData.data.tour;
}

export async function getMe() {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get("jwt");

  if (!jwtCookie) return null;
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      cache: "no-store",
      headers: {
        // We MUST manually attach the cookie from the browser to this outgoing server request
        Cookie: `jwt=${jwtCookie.value}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const user = await res.json();
    return user.data.data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    return null;
  }
}
