import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <h2>
          <Link to={ROUTES.HOME}>APP</Link>{" "}
        </h2>
      </div>
      <nav>
        <NavLink to={ROUTES.CONTEXT}>Context + Reducer</NavLink>
        <NavLink to={ROUTES.REDUX}>Redux</NavLink>
        <NavLink to={ROUTES.CHARTS}>Charts</NavLink>
      </nav>
    </div>
  );
};

export default Header;
