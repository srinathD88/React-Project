import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

import { selectTotalProducts } from "../store/redux/cartSelectors";
import Button from "./utils/Button";
import { logout } from "../store/redux/userReducer";
import cartAuth from "./hooks/cartAuth";
import { emptyCart } from "../store/redux/cartReducer";

const ProductsNavBar = () => {
  const dispath = useDispatch();
  const cartLength = useSelector(selectTotalProducts);
  const {isUserLoggedIn, loggedInUser} = cartAuth();

  const logoutUser = () => {
    dispath(logout());
    dispath(emptyCart());
  };
  return (
    <nav className="products-navbar">
      {isUserLoggedIn() && <h4>Hi, {loggedInUser()?.name}</h4>}
      <Link to={ROUTES.REDUX}>Products</Link>
      <Link to={ROUTES.CART}>
        Cart <sup>{cartLength}</sup>
      </Link>
      {!isUserLoggedIn() && <Link to={ROUTES.LOGIN}>Login</Link>}
      {isUserLoggedIn() && <Button text="Logout" hadnleClick={logoutUser} />}
    </nav>
  );
};

export default ProductsNavBar;
