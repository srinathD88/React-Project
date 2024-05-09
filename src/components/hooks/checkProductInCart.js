import { useSelector } from "react-redux";
import { selectProductIds } from "../../store/redux/cartSelectors";

const checkProductInCart = (id) => {
  const cartProductsIdList = useSelector(selectProductIds);
  const isProductInCart = (id) => {
    return cartProductsIdList.includes(id);
  };
  return {
    isProductInCart,
  };
};

export default checkProductInCart;
