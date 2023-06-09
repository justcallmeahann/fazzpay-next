import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  pagination: {
    page: 1,
    totalPage: 1,
    limit: 5,
    totalData: 0,
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getListUsersThunk = createAsyncThunk(
  "listUsers/get",
  async (
    { page = "1", limit = "5", search = "", sort = "RAND()", token },
    { rejectWithValue, fulfillWithValue }
  ) => {
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
      // console.log(response.data.pagination);
      const { data, pagination } = response.data;
      return fulfillWithValue({ data, pagination });
    } catch (err) {
      return rejectWithValue(err.response.data);
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
        const { data, pagination } = action?.payload;
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data,
          pagination,
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
