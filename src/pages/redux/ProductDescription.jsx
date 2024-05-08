import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductThunk } from "../../store/redux/productsReducer";
import {
  selectedProduct,
  isLoading,
  hasError,
} from "../../store/redux/productsSelectors";
import Button from "../../components/utils/Button";
import { ROUTES } from "../../routes/Routes";
import Loader from "../../components/utils/Loader";
import ErrorDisplay from "../../components/utils/ErrorDisplay";
import Product from "../../components/Product";
import { selectAllProducts } from '../../store/redux/cartSelectors';
import { addToCart } from "../../store/redux/cartReducer";

const ProductDescription = () => {
  const { id: productId } = useParams();
  const cartProducts = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, loading, error] = [
    useSelector(selectedProduct),
    useSelector(isLoading),
    useSelector(hasError),
  ];

  const hadnleBackBtnClick = () => {
    navigate(ROUTES.REDUX);
  };

  const handleCartBtnClick = (product) => {
    dispatch(addToCart(product))
  }

  console.log(cartProducts)

  useEffect(() => {
    dispatch(getProductThunk(productId));
  }, []);
  return (
    <div>
      <Button text="Back to Products" hadnleClick={hadnleBackBtnClick} />
      {loading && <Loader />}
      {!loading && error && <ErrorDisplay />}
      {!loading && product && <Product product={product} handleCartBtnClick={handleCartBtnClick} />}
    </div>
  );
};

export default ProductDescription;
