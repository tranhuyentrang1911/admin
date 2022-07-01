import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showSuccess } from "assets/handleManyThings";
const productSlice = createSlice({
  name: "productList",
  initialState: {
    status: "idle",
    products: [],
    productCurrent: {
      name: "",
      categoryId: "",
      categoryName: "",
      img: "1.png",
      price: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.productCurrent = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        showSuccess("Thêm");
      })
      .addCase(addProduct.rejected, (state, action) => {
        showError("Thêm");
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        let currentProduct = state.products.find(
          (item) => item.id === action.payload.id
        );
        currentProduct = action.payload;
        showSuccess("Cập nhật");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        showError("Cập nhật");
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item.id === action.payload
        );
        state.products.splice(index, 1);
        showSuccess("Xoá");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        showError("Xoá");
      });
  },
});
export const fetchProductList = createAsyncThunk(
  "productList/fetchProductList",
  async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const fetchProductItem = createAsyncThunk(
  "productList/fetchProductItem",
  async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();

      return data;
    } catch (error) {}
  }
);
export const addProduct = createAsyncThunk(
  "productList/addProduct",
  async (product) => {
    try {
      const res = await fetch(`http://localhost:3000/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const updateProduct = createAsyncThunk(
  "productList/updateProduct",
  async (product) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (e) {}
  }
);
export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
      });
      // const data = await res.json();
      return id;
    } catch (error) {}
  }
);
export default productSlice;
