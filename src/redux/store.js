import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import cartSlice from "./slices/cartSlice";
import categorySlice from "./slices/categorySlice";
import filtersSlice from "./slices/filtersSlice";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";
import promotionSlice from "./slices/promotionSlice";
import usersSlice from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    productList: productSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
    promotion: promotionSlice.reducer,
    category: categorySlice.reducer,
    users: usersSlice.reducer,
    order: orderSlice.reducer,
    admin: adminSlice.reducer,
  },
});

// import { createStore } from "redux";
// import rootReducer from "./reducer";
// import { composeWithDevTools } from "redux-devtools-extension";
// const composedEnhancers = composeWithDevTools();
// const store = createStore(rootReducer, composedEnhancers);
export default store;
