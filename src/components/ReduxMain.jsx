import { useSelector, useDispatch } from "react-redux";

import { getProductsThunk } from "../store/redux/productsReducer";
import { useEffect } from "react";

import {
  selectAllProducts,
  isLoading,
  hasError,
} from "../store/redux/productsSelectors";
import Loader from "./utils/Loader";
import ErrorDisplay from "./utils/ErrorDisplay";
import Products from "./Products";
import { withPageTitle } from "./hoc/withPageTitle";

const ReduxMainBase = () => {
  const dispatch = useDispatch();
  const [products, loading, error] = [
    useSelector(selectAllProducts),
    useSelector(isLoading),
    useSelector(hasError),
  ];

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);
  return (
    <div className="redux-layout">
      {loading && <Loader />}
      {!loading && error && <ErrorDisplay />}
      {!loading && products.length > 0 && <Products products={products} />}
    </div>
  );
};

const ReduxMain = withPageTitle(ReduxMainBase, "Products base");
export default ReduxMain;
