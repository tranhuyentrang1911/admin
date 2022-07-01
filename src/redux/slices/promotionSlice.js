const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const promotionSlice = createSlice({
  name: "promotion",
  initialState: { status: "idle", promotion: [], pagination: {} },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.status = "idle";
        state.promotion = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.promotion.push(action.payload);
      });
  },
});

export const fetchPromotions = createAsyncThunk(
  "promotion/fetchPromotions",
  async (obj) => {
    try {
      const url = `http://localhost:3000/promotion?_page=${obj.page}&_limit=${obj.limit}`;
      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch (error) {}
  }
);
export const addPromotion = createAsyncThunk(
  "promotion/addPromotion",
  async (promotion) => {
    try {
      const res = await fetch("http://localhost:3000/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promotion),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export default promotionSlice;
