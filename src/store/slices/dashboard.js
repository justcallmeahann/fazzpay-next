import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    totalIncome: 0,
    totalExpense: 0,
    listIncome: [],
    listExpense: [],
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getDashboardThunk = createAsyncThunk(
  "dashboard/get",
  async ({ id_user, token }) => {
    try {
      const response = await api.get(`/dashboard/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return err;
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
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
      .addCase(getDashboardThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(getDashboardThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getDashboardThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});
export const dashboardAction = { ...dashboardSlice.actions, getDashboardThunk };
export default dashboardSlice.reducer;
