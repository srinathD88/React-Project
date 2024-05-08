import { cartAdapter } from './cartReducer';

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = cartAdapter.getSelectors((state) => state.cart);