import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "./Routes";
import PageNotFound from "../components/utils/PageNotFound";
import { prodLoader } from "../components/ProductDescription";

const App = React.lazy(() => import("../App"));
const ContextWithReducer = React.lazy(() =>
  import("../pages/contextWithReducer/Context")
);
const Redux = React.lazy(() => import("../pages/redux/Redux"));
const Home = React.lazy(() => import("../pages/home/Home"));
const ReduxMain = React.lazy(() => import("../components/ReduxMain"));
const ProductDescription = React.lazy(() =>
  import("../components/ProductDescription")
);
const Cart = React.lazy(() => import("../components/Cart"));
const Login = React.lazy(() => import("../components/Login"));

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />,
          index: true,
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
              index: true,
              element: <ReduxMain />,
            },
            {
              path: ROUTES.PRODUCT,
              element: <ProductDescription />,
              loader: ({ params }) => prodLoader(params),
            },
            {
              path: ROUTES.CART,
              element: <Cart />,
            },
            {
              path: ROUTES.LOGIN,
              element: <Login />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
