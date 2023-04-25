import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getProfileThunk = createAsyncThunk("profile/get", async (payload) => {
  try {
    const { id_user, token } = payload;
    const response = await api.get(`/user/profile/${id_user}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    return err;
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        ...prevState,
        data: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(getProfileThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getProfileThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});
export const profileAction = { ...profileSlice.actions, getProfileThunk };
export default profileSlice.reducer;
