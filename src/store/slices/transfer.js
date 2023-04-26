import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  target: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    noTelp: "",
    balance: 0,
  },
  amount: 0,
  balance_left: 0,
  time: "",
  notes: "",
  isFulfilled: false,
  isPending: false,
  isRejected: false,
  process: true,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setTransfer: (prevState, action) => {
      const { target, amount, balance_left, time, notes } = action.payload;
      return {
        ...prevState,
        target,
        amount,
        balance_left,
        time,
        notes,
      };
    },
    setFulfilled: (prevState) => {
      return {
        ...prevState,
        isFulfilled: true,
      };
    },

    setProcess: (prevState) => {
      return {
        ...prevState,
        process: true,
      };
    },

    setRejected: (prevState) => {
      return {
        ...prevState,
        isRejected: true,
      };
    },
    clear: (prevState) => {
      return {
        ...initialState,
      };
    },
  },
});
export const transferAction = transferSlice.actions;
export default transferSlice.reducer;
