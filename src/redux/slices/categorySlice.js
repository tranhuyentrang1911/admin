import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { showError, showSuccess } from "assets/handleManyThings";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    status: "idle",
    category: [],
    categoryItem: { id: "", name: "", img: "" },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category.push(action.payload);
        showSuccess("Thêm");
      })
      .addCase(addCategory.rejected, (state, action) => {
        showError("Thêm");
      })
      .addCase(fetchCategoryItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.categoryItem = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        let categoryItem = state.category.find(
          (item) => item.id === action.payload.id
        );
        categoryItem = action.payload;
        showSuccess("Cập nhật");
      })
      .addCase(updateCategory.rejected, (state, action) => {
        showError("Cập nhật");
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const index = state.category.findIndex(
          (item) => item.id === action.payload
        );
        state.category.splice(index, 1);
        showSuccess("Xoá");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        showError("Xoá");
      });
  },
});
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const res = await fetch("http://localhost:3000/category");
      const data = await res.json();
      //console.log(data);
      return data;
    } catch (error) {}
  }
);
export const fetchCategoryItem = createAsyncThunk(
  "category/fetchCategoryItem",
  async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category) => {
    try {
      const res = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (error) {}
  }
);
export default categorySlice;
