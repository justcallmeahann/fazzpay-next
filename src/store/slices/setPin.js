import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id_user: "",
  token: "",
};

const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    setPin: (prevState, action) => {
      const { id, token } = action.payload;
      return {
        ...prevState,
        id_user: id,
        token: token,
      };
    },
    clear: (prevState) => {
      return {
        ...initialState,
      };
    },
  },
});
export const pinAction = pinSlice.actions;
export default pinSlice.reducer;
