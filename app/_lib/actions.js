"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token) {
  const cookieStore = await cookies();

  cookieStore.set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 90 * 24 * 60 * 60, // 90 days
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
}
