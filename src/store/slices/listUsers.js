import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getListUsersThunk = createAsyncThunk(
  "listUsers/get",
  async ({
    page = "1",
    limit = "5",
    search = "",
    sort = "noTelp DESC",
    token,
  }) => {
    try {
      const response = await api.get(`/user/`, {
        params: {
          page,
          limit,
          search,
          sort,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return err;
    }
  }
);

const listUsersSlice = createSlice({
  name: "listUsers",
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
      .addCase(getListUsersThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(getListUsersThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getListUsersThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});
export const listUsersAction = { ...listUsersSlice.actions, getListUsersThunk };
export default listUsersSlice.reducer;
