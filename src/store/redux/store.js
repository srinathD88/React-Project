import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";
import { productAPI } from "./productAPISlice";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    [productAPI.reducerPath]: productAPI.reducer,
  },

  middleware: (defaultMiddleWare) => [
    ...defaultMiddleWare(),
    productAPI.middleware,
  ],
});

export default store;
