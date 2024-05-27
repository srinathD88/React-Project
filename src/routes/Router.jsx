import React from "react";

import Click from "../components/Click";
import { prodLoader } from "../components/ProductDescription";
import PageNotFound from "../components/utils/PageNotFound";
import { ROUTES } from "./Routes";

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
const Charts = React.lazy(() => import("../components/Charts"));

const routerElemets = [
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: ROUTES.CONTEXT,
        element: <ContextWithReducer />,
      },
      {
        path: ROUTES.CHARTS,
        element: <Charts />,
      },
      {
        path: "click",
        element: <Click />,
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
];

export default routerElemets;
