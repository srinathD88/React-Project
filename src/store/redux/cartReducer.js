import {
    createSlice,
    createEntityAdapter
  } from "@reduxjs/toolkit";
  
  export const cartAdapter = createEntityAdapter();
  
  const cartSlice = createSlice({
    name: "cart",
    initialState: cartAdapter.getInitialState(),
    reducers: {
        addToCart: cartAdapter.addOne
    }
  });
  
  const { reducer } = cartSlice;
  
  export const { addToCart } = cartSlice.actions;
  
  export default reducer;
  