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
