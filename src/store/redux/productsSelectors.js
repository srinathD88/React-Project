import { createSelector } from "@reduxjs/toolkit";
import { productsAdapter } from "./productsReducer";

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.products);

const loading = ({ products }) => {
  return products.loading;
};

const error = ({ products }) => {
  return products.error;
};

const getSelectedProduct = (state) => {
  return state.products.selectedProduct;
};

export const isLoading = createSelector((state) => state, loading);

export const hasError = createSelector((state) => state, error);

export const selectedProduct = createSelector(
  getSelectedProduct,
  (state) => state
);
