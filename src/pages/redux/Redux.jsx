import { Provider } from "react-redux";

import BackToHome from "../../components/utils/BackToHome";
import store from "../../store/redux/store.js";
import { Outlet } from "react-router-dom";
import ProductsNavBar from "../../components/ProductsNavBar.jsx";

const Redux = () => {
  return (
    <div className="context">
      <BackToHome />
      <h2>Redux</h2>
      <Provider store={store}>
        <ProductsNavBar />
        <Outlet />
      </Provider>
    </div>
  );
};

export default Redux;
