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
