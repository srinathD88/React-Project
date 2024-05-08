import { combineReducers } from "@reduxjs/toolkit";

import productsReducer from './productsReducer';
import cartReducer from './cartReducer';

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
})