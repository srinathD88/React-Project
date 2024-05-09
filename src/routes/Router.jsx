import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "./Routes";
import PageNotFound from "../components/PageNotFound";
import ReduxMain from "../components/ReduxMain";
import ProductDescription from "../components/ProductDescription";
import Cart from "../components/Cart";
import Login from "../components/Login";

const App = React.lazy(() => import("../App"));
const ContextWithReducer = React.lazy(() =>
  import("../pages/contextWithReducer/Context")
);
const Redux = React.lazy(() => import("../pages/redux/Redux"));
const Home = React.lazy(() => import("../pages/home/Home"));

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />,
        },
        {
          path: ROUTES.CONTEXT,
          element: <ContextWithReducer />,
        },
        {
          path: ROUTES.REDUX,
          element: <Redux />,
          children: [
            {
              index:true,
              element: <ReduxMain />
            },
            {
              path: ROUTES.PRODUCT,
              element: <ProductDescription />
            },
            {
              path: ROUTES.CART,
              element: <Cart />
            },
            {
              path: ROUTES.LOGIN,
              element: <Login />
            }
          ]
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
