import api from "../api";

export const transferBalance = (
  token,
  { receiverId, amount, notes = "" },
  controller
) => {
  return api.post(
    "/transaction/transfer",
    {
      receiverId,
      amount,
      notes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
