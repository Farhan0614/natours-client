export const getTourImageUrl = (imageName) => {
  const EXPRESS_ROOT = process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "");
  return `${EXPRESS_ROOT}/img/tours/${imageName}`;
};

export const getUserImageUrl = (photoName) => {
  const EXPRESS_ROOT = process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "");
  return `${EXPRESS_ROOT}/img/users/${photoName}`;
};

// Tiny 1x1 slate-colored PNG used as the blur placeholder for next/image.
// Keeps layout stable while backend photos download.
export const BLUR_DATA_URL =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrK8BABNAATPtYfEAAAAASUVORK5CYII=";
