import { productsAdapter } from "./productsReducer";

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.products);

export const isLoading = (state) => {
  return state.products.loading;
};

export const hasError = (state) => {
  return state.products.error;
};

export const selectedProduct = (state) => {
  return state.products.selectedProduct;
};
