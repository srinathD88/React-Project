import { useSelector, useDispatch } from "react-redux";
import Button from "./utils/Button";

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

const ReduxMain = () => {
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

export default ReduxMain;
