import { useNavigate } from "react-router-dom";

import Product from "./Product";
import { ROUTES } from "../routes/Routes";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/redux/cartReducer";
import checkProductInCart from "./hooks/checkProductInCart";
import cartAuth from './hooks/cartAuth';

const Products = ({ products, showAllDetails = false, inCartPage = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isProductInCart} = checkProductInCart();
  const {addProductToCart} = cartAuth();
  const handleProductClick = (id) => {
    navigate(`${ROUTES.REDUX}/${id}`);
  };

  const handleCartBtnClick = (product) => {
    addProductToCart(product);
  }

  const handleGoToCartClick = () => {
    navigate(ROUTES.CART);
  }

  const handleRemoveCartBtnClick = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="products">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            handleProductClick={handleProductClick}
            handleCartBtnClick={handleCartBtnClick}
            showAllDetails = {showAllDetails}
            inCart={isProductInCart(product.id)}
            inCartPage = {inCartPage}
            handleRemoveCartBtnClick = {handleRemoveCartBtnClick}
            handleGoToCartClick = {handleGoToCartClick}
          />
        );
      })}
    </div>
  );
};

export default Products;
