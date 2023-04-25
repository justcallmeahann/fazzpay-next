import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  redirectUrl: "",
  token: "",
};

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    setTopup: (prevState, action) => {
      const { amount, redirectUrl, token } = action.payload;
      return {
        ...prevState,
        amount,
        redirectUrl,
        token,
      };
    },
    clear: (prevState) => {
      return {
        ...initialState,
      };
    },
  },
});
export const topupAction = topupSlice.actions;
export default topupSlice.reducer;
