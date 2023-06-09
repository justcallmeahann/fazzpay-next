import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  pagination: {
    page: 1,
    totalPage: 1,
    limit: 10,
    totalData: 0,
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getHistoryThunk = createAsyncThunk(
  "history/get",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { page = 1, limit = 5, filter, token } = payload;
      const response = await api.get(`/transaction/history`, {
        params: {
          page,
          limit,
          filter,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.data);
      return fulfillWithValue({
        data: response.data.data,
        pagination: response.data.pagination,
      });
    } catch (err) {
      //   store.dispatch(authAction.dismissAuth());
      return rejectWithValue("Error while fetching data");
    }
  }
);

const historySlice = createSlice({
  name: "history",
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
      .addCase(getHistoryThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(getHistoryThunk.fulfilled, (prevState, action) => {
        const { data, pagination } = action?.payload;
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data,
          pagination,
        };
      })
      .addCase(getHistoryThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});
export const historyAction = { ...historySlice.actions, getHistoryThunk };
export default historySlice.reducer;
