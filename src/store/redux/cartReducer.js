import {
    createSlice,
    createEntityAdapter
  } from "@reduxjs/toolkit";
  
  export const cartAdapter = createEntityAdapter();
  
  const cartSlice = createSlice({
    name: "cart",
    initialState: cartAdapter.getInitialState(),
    reducers: {
        addToCart: cartAdapter.addOne,
        removeFromCart: cartAdapter.removeOne,
        emptyCart: cartAdapter.removeAll
    }
  });
  
  const { reducer } = cartSlice;
  
  export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
  
  export default reducer;
  