import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Order } from "../../app/interfaces/Order";

interface OrderState {
  orders: Order[] | null;
  ordersLoaded: boolean;
  status: string;
}

const initialState: OrderState = {
  status: "idle",
  orders: [],
  ordersLoaded: false,
};

export const fetchOrdersAsync = createAsyncThunk<any>(
  "catalog/fetchOrdersAsync",
  async (_, thunkApi) => {
    try {
      return await agent.Orders.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.pending, (state) => {
      state.status = "pendingFetchOrders";
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = "idle";
      state.ordersLoaded = true;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});
