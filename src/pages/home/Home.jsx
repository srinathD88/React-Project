import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Routes";

const Home = () => {
  return (
    <div className="home">
      <h3>Home page</h3>
      <ul>
        <li>
          <Link to={ROUTES.CONTEXT}>Context + Reducer</Link>
        </li>
        <li>
          <Link to={ROUTES.REDUX}>Redux</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
