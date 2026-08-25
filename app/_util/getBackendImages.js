export const getTourImageUrl = (imageName) => {
  const EXPRESS_ROOT = process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "");
  return `${EXPRESS_ROOT}/img/tours/${imageName}`;
};

export const getUserImageUrl = (photoName) => {
  const EXPRESS_ROOT = process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "");
  return `${EXPRESS_ROOT}/img/users/${photoName}`;
};
