const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const orderSlice = createSlice({
  name: "order",
  initialState: { status: "idle", orderList: [], orderItem: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderList = action.payload;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.orderList.push(action.payload);
      })
      .addCase(fetchOrderItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrderItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderItem = action.payload;
      });
  },
});
export const fetchOrderList = createAsyncThunk(
  "order/fetchOrderList",
  async () => {
    try {
      const res = await fetch(`http://localhost:3000/order`);
      const data = await res.json();

      return data;
    } catch (error) {}
  }
);
export const fetchOrderItem = createAsyncThunk(
  "order/fetchOrderItem",
  async (customId) => {
    try {
      const res = await fetch(`http://localhost:3000/order?userId=${customId}`);
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async (newOrder) => {
    try {
      const res = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      const data = await res.json();
      return data;
    } catch (e) {}
  }
);
export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  async (order) => {
    try {
      const res = await fetch(`http://localhost:3000/order/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      return data;
    } catch (e) {}
  }
);
export default orderSlice;
