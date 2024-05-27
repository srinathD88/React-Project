import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/redux/userReducer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useEffect, useRef, useState } from "react";
import { withPageTitle } from "./hoc/withPageTitle";

const LoginBase = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [hasFormErrors, setHasFormErrors] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const values = Object.fromEntries(fd);
    const { name, password } = values;
    if (!name.length || !password.length) {
      setHasFormErrors(true);
      return;
    }

    setHasFormErrors(false);

    dispatch(login(values));
    handleSubmit?.(values);
    navigate(ROUTES.REDUX);
  };
  useEffect(() => {
    if (!user) return;
    navigate(ROUTES.REDUX);
  }, [user]);
  return (
    <>
      <form onSubmit={handleLoginSubmit} data-testid="form">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" placeholder="name" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {hasFormErrors && (
        <p role="error" style={{ color: "red" }}>
          Name and Password values are required
        </p>
      )}
    </>
  );
};

const Login = withPageTitle(LoginBase, "Login");
export default Login;
