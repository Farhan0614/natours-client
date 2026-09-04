export const updateSettings = async (data, type, isFormData = false) => {
  const url =
    type === "password"
      ? `${process.env.NEXT_PUBLIC_API_URL}/users/updateMyPassword`
      : `${process.env.NEXT_PUBLIC_API_URL}/users/updateMe`;

  // 2. Determine how to configure the fetch request
  const fetchOptions = {
    method: "PATCH",
    credentials: "include", // CRITICAL: Send the JWT cookie!
  };

  if (isFormData) {
    // If it's a file upload, just pass the FormData object directly.
    // DO NOT set 'Content-Type'. The browser sets it automatically with the multipart boundary!
    fetchOptions.body = data;
  } else {
    // If it's normal text, use JSON
    fetchOptions.headers = { "Content-Type": "application/json" };
    fetchOptions.body = JSON.stringify(data);
  }

  const res = await fetch(url, fetchOptions);
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || `Failed to update ${type}`);
  }

  return result; // Return success so the component knows it worked
};

export const authenticate = async (payload, mode) => {
  const endpoint = mode === "signup" ? "/users/signup" : "/users/login";
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // CRITICAL: Sets the JWT cookie
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || `Failed to ${mode === "signup" ? "sign up" : "log in"}`,
    );
  }

  return data;
};

export const getCheckoutSession = async (tourId) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/booking/checkout-session/${tourId}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // CRITICAL: Sends the JWT cookie to Express
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not create checkout session");
  }

  // Return the Stripe URL so the frontend can redirect to it
  return data.session.url;
};

export const createBookingCheckout = async (bookingData, cookieString) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/booking`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Manually attach the cookie for Server-to-Server requests!
      Cookie: cookieString || "",
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    throw new Error("Could not create booking");
  }
};

export const getMyBookings = async (cookieString) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/booking/my-bookings`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: cookieString || "",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  // Return the array of tours
  return data.data.data;
};
