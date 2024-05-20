import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductThunk } from "../store/redux/productsReducer";
import {
  selectedProduct,
  isLoading,
  hasError,
} from "../store/redux/productsSelectors";
import Loader from "./utils/Loader";
import ErrorDisplay from "./utils/ErrorDisplay";
import Product from "./Product";
import checkProductInCart from "./hooks/checkProductInCart";
import { ROUTES } from "../routes/Routes";
import cartAuth from "./hooks/cartAuth";
import { useGetProductByIdQuery } from "../store/redux/productAPISlice";

const ProductDescription = () => {
  const { id: productId } = useParams();
  const { data:product, isLoading:loading, error }  = useGetProductByIdQuery(productId);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProductInCart } = checkProductInCart();
  const {addProductToCart} = cartAuth();
  // const [product, loading, error] = [
  //   useSelector(selectedProduct),
  //   useSelector(isLoading),
  //   useSelector(hasError),
  // ];

  const handleCartBtnClick = (product) => {
    addProductToCart(product);
  }

  const handleGoToCartClick = () => {
    navigate(`${ROUTES.REDUX}/${ROUTES.CART}`);
  }

  useEffect(() => {
    // dispatch(getProductThunk(productId));
  }, []);

  useEffect(() => {
    if(product) {
      document.title = product.title;
    } 
    return;
  }, [product]);

  return (
    <div className="product-description">
      {loading && <Loader />}
      {!loading && error && <ErrorDisplay />}
      {!loading && product && (
        <Product
          product={product}
          handleCartBtnClick={handleCartBtnClick}
          showAllDetails={true}
          inCart={isProductInCart(product.id)}
          handleGoToCartClick = {handleGoToCartClick}
        />
      )}
    </div>
  );
};

export default ProductDescription;

export const prodLoader = ({id}) => {
  console.log(id);
  return id;
}
