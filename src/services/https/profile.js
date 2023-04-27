import api from "../api";

export const getProfileById = (userId, token, controller) => {
  return api.get(`/user/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const checkPin = (pin, token) => {
  return api.get(`/user/pin/${pin}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfileImage = ({ image, userId }, token) => {
  const formData = new FormData();
  formData.append("image", image);
  return api.patch(`/user/image/${userId}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
