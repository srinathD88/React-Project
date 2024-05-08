import { Provider } from "react-redux";

import BackToHome from "../../components/utils/BackToHome";
import store from "../../store/redux/store.js";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/Routes.js";
import Button from "../../components/utils/Button.jsx";

const Redux = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <div className="context">
      <BackToHome />
      <h2>Redux</h2>
      <Button text="Cart" hadnleClick={handleCartClick} />
      <Provider store={store}>
        <Outlet />
      </Provider>
    </div>
  );
};

export default Redux;
