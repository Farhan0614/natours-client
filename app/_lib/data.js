import { cookies } from "next/headers";

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
  // 1. Hit the new specific endpoint you just created
  const res = await fetch(`${API_URL}/tours/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch tour");

  const fetchedData = await res.json();

  // 2. Return the single tour object directly
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
