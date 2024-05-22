import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import cartReducer from "../../src/store/redux/cartReducer";
import { productAPI } from "../../src/store/redux/productAPISlice";
import productsReducer from "../../src/store/redux/productsReducer";
import userReducer from "../../src/store/redux/userReducer";

const setupStore = (preloadedState) => {
  return configureStore({
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
    preloadedState,
  });
};

const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;
