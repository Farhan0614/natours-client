export const updateSettings = async (data, type) => {
  const url =
    type === "password"
      ? `${process.env.NEXT_PUBLIC_API_URL}/users/updateMyPassword`
      : `${process.env.NEXT_PUBLIC_API_URL}/users/updateMe`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // CRITICAL: Send the JWT cookie!
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || `Failed to update ${type}`);
  }

  return result; // Return success so the component knows it worked
};
