import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    categoryId: 0,
    price: "Không lựa chọn",
    name: "",
  },
  reducers: {
    classifyFilterChange: (state, action) => {
      state.categoryId = action.payload;
    },
    priceFilterChange: (state, action) => {
      state.price = action.payload;
    },
    nameFilterChange: (state, action) => {
      state.name = action.payload;
    },
  },
});
export default filtersSlice;
