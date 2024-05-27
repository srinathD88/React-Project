import { Link } from "react-router-dom";
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
        <Link to={ROUTES.CONTEXT}>Context + Reducer</Link>
        <Link to={ROUTES.REDUX}>Redux</Link>
        <Link to={ROUTES.CHARTS}>Charts</Link>
      </nav>
    </div>
  );
};

export default Header;
