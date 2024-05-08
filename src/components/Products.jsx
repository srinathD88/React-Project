import { useNavigate } from "react-router-dom";

import Product from "./Product";
import { ROUTES } from "../routes/Routes";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/redux/cartReducer";

const Products = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleProductClick = (id) => {
    navigate(`${ROUTES.REDUX}/${id}`);
  };

  const handleCartBtnClick = (product) => {
    dispatch(addToCart(product))
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
          />
        );
      })}
    </div>
  );
};

export default Products;
