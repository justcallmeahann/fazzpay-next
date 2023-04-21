import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id_user: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignAuth: (prevState, { id, token }) => {
      return {
        ...prevState,
        id_user: id,
        token: token,
      };
    },
    dismissAuth: (prevState) => {
      return {
        ...initialState,
      };
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;
