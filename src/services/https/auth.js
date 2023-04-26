import api from "../api";

export const logout = (token, controller) => {
  return api.post(
    "/auth/logout",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    }
  );
};
