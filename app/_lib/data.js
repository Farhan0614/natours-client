// src/app/_lib/data.js

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
  const res = await fetch(`${API_URL}/tours?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tour");
  }

  const fetchedData = await res.json();
  const tourArray = fetchedData.data.data || fetchedData.data.tours;

  return tourArray[0]; // Return just the single tour object
}
