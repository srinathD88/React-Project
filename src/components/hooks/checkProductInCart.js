import { useSelector } from "react-redux";
import { selectProductIds } from "../../store/redux/cartSelectors";
import { useCallback } from "react";

const checkProductInCart = () => {
  const cartProductsIdList = useSelector(selectProductIds);
  const isProductInCart = useCallback(
    (id) => {
      return cartProductsIdList?.includes(id);
    },
    [cartProductsIdList]
  );
  return {
    isProductInCart,
  };
};

export default checkProductInCart;
