import { createSelector } from "@reduxjs/toolkit";

export const productListSelector = (state) => state.productList.products;
export const categoryIdSelector = (state) => state.filters.categoryId;
export const priceSelector = (state) => state.filters.price;
export const nameSelector = (state) => state.filters.name;
export const productListRemainingSelector = createSelector(
  productListSelector,
  categoryIdSelector,
  priceSelector,
  nameSelector,

  (productList, categoryId, price, name) => {
    if (price === "Từ thấp đến cao") {
      productList = productList.slice().sort((a, b) => a.price - b.price);
    }
    if (price === "Từ cao đến thấp") {
      productList = productList.slice().sort((a, b) => b.price - a.price);
    }
    return productList.filter((product) => {
      if (categoryId === 0) return product.name.includes(name);
      else
        return product.name.includes(name) && product.categoryId === categoryId;
    });
  }
);
export const cartDetailSelector = (state) => state.cart.cart;
export const promotionListSelector = (state) => state.promotion.promotion;
export const promotionsPagination = (state) => state.promotion.pagination;
export const categorySelector = (state) => state.category.category;
export const currentProductSelector = (state) =>
  state.productList.productCurrent;
export const categoryItemSelector = (state) => state.category.categoryItem;
export const usersSelector = (state) => state.users.users;
export const orderItemSelector = (state) => state.order.orderItem;
export const orderListSelector = (state) => state.order.orderList;
