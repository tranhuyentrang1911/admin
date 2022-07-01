import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showMessage, showSuccess } from "assets/handleManyThings";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    users: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(addUserThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = "idle";
        showSuccess("Đăng kí");
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.error = action.error;
        showError("Đăng kí");
      });
  },
});
export const fetchUsersThunk = createAsyncThunk(
  "user/fetchUsersThunk",
  async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);
export const addUserThunk = createAsyncThunk(
  "users/addUserThunk",

  async (user) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      return data;
    } catch (error) {}
  }
);

export default usersSlice;
