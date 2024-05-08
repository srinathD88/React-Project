import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getProduct, getProducts } from "../../services/productsApi";

export const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  selectedProduct: null,
  loading: false,
  error: false,
});

const getProductsThunk = createAsyncThunk("products/get", getProducts);
const getProductThunk = createAsyncThunk("product/get", getProduct);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state) => {
      state.selectedProduct = null;
      state.loading = true;
      state.error = false;
    }).addCase(getProductsThunk.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      productsAdapter.setAll(state, payload.products)
    }).addCase(getProductsThunk.rejected, (state, {error}) => {
      state.selectedProduct = null;
      state.loading = false;
      state.error = true;
      console.log(error)
    }).addCase(getProductThunk.pending, (state) => {
      state.selectedProduct = null;
      state.loading = true;
      state.error = false;
    }).addCase(getProductThunk.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.selectedProduct = payload;
    }).addCase(getProductThunk.rejected, (state, {error}) => {
      state.selectedProduct = null;
      state.loading = false;
      state.error = true;
      console.log(error)
    });
  },
});

const { actions, reducer } = productsSlice;

export { getProductsThunk, getProductThunk };

export default reducer;
