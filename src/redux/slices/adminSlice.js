import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: "idle",
    admin: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(signInThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const signInThunk = createAsyncThunk(
  "admin/signInThunk",
  async (user) => {
    try {
      const res = await fetch(
        `http://localhost:3000/admin?name=${user.name}&pass=${user.pass}`
      );
      let data = await res.json();

      if (data.length > 0) {
        const dataRes = {
          token: "https://app-json-demo.herokuapp.com/api/login",
          admin: data[0],
        };
        console.log(dataRes);
        const fetchToken = async (url) => {
          try {
            const res = await fetch(url);
            const token = await res.json();
            localStorage.setItem("admin", JSON.stringify(dataRes));
          } catch (error) {}
        };
        await fetchToken(dataRes.token);
        return dataRes;
      } else {
        localStorage.removeItem("admin");
        return data;
      }
    } catch (error) {}
  }
);
export default adminSlice;
