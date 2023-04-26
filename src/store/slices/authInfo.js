import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id_user: "",
  token: "",
  logoutModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignAuth: (prevState, action) => {
      const { id, token } = action.payload;
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
    toggleModal: (prevState, action) => {
      return {
        ...prevState,
        logoutModal: !prevState.logoutModal,
      };
    },
    closeModal: (prevState, action) => {
      return {
        ...prevState,
        logoutModal: false,
      };
    },
    openModal: (prevState, action) => {
      return {
        ...prevState,
        logoutModal: true,
      };
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;
