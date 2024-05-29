import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const Charts = () => {
  return (
    <>
      <nav>
        <NavLink to={ROUTES.CHARTS}>Core</NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to={ROUTES.WORLD}>World</NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Charts;
