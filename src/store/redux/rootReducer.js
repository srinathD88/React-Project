import { combineReducers } from "@reduxjs/toolkit";

import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    user: userReducer
})