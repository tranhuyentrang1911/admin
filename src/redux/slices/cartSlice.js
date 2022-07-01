import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { status: "idle", cart: [] },
  reducers: {
    addProductToCart: (state, action) => {
      state.push(action.payload);
    },
    updateQuantity: (state, action) => {
      const currentProduct = state.find(
        (item) => item.id === action.payload.id
      );
      currentProduct.quantity = action.payload.quantity;
    },
    updateProductToCart: (state, action) => {
      const currentProduct = state.find(
        (item) => item.id === action.payload.id
      );
      currentProduct.size = action.payload.size;
      currentProduct.sugar = action.payload.sugar;
      currentProduct.ice = action.payload.ice;
      currentProduct.quantity = action.payload.quantity;
    },
    deleteProductToCart: (state, action) => {
      return state.filter((item) => {
        if (item.id === action.payload) return false;
        else return true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(updateProductToCart.fulfilled, (state, action) => {
        let currentProduct = state.cart.find(
          (item) => item.id === action.payload.id
        );

        currentProduct.size = action.payload.size;
        currentProduct.sugar = action.payload.sugar;
        currentProduct.ice = action.payload.ice;
        currentProduct.note = action.payload.note;
        currentProduct.quantity = action.payload.quantity;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        let currentProduct = state.cart.find(
          (item) => item.id === action.payload.id
        );
        currentProduct.quantity = action.payload.quantity;
      })
      .addCase(deleteProductToCart.fulfilled, (state, action) => {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload
        );
        state.cart.splice(index, 1);
      });
  },
});
export const fetchCart = createAsyncThunk("cart/fetchCart", async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/cart?userId=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {}
});
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (product) => {
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (e) {}
  }
);
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (product) => {
    try {
      const res = await fetch(`http://localhost:3000/cart/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (e) {}
  }
);
export const updateProductToCart = createAsyncThunk(
  "cart/updateProductToCart",
  async (product) => {
    try {
      const res = await fetch(`http://localhost:3000/cart/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (e) {}
  }
);
export const deleteProductToCart = createAsyncThunk(
  "cart/deleteProductToCart",
  async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
      });
      // const data = await res.json();
      return id;
    } catch (error) {}
  }
);
// const initState = [
//   {
//     id: 1,
//     name: "Trà đá",
//     size: "M",
//     sugar: "Ít",
//     ice: "Nhiều",
//     img: "1.png",
//     quantity: 1,
//     price: 50000,
//   },
//   {
//     id: 2,
//     name: "Bánh",
//     size: "M",
//     sugar: "Ít",
//     ice: "Nhiều",
//     img: "2.png",
//     quantity: 2,
//     price: 50000,
//   },
// ];
// const cartSlice = (state = initState, action) => {
//   switch (action.type) {
//     case "cart/addProductToCart":
//       return [...state, action.payload];
//     case "cart/updateProductToCart":
//       return state.map((item) =>
//         item.id === action.payload.id
//           ? {
//               ...item,
//               // name: action.payload.name,
//               // size: action.payload.size,
//               // sugar: action.payload.sugar,
//               // ice: action.payload.ice,
//               // img: action.payload.img,
//               // quantity: action.payload.quantity,
//               // price: action.payload.price,
//               ...action.payload,
//             }
//           : item
//       );
//     case "cart/deleteProductToCart":
//       const newstate = state;
//       return newstate.filter((item) =>
//         item.id === action.payload ? false : true
//       );

//     default:
//       return state;
//   }
// };
export default cartSlice;
