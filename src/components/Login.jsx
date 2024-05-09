import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/redux/userReducer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useEffect } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const values = Object.fromEntries(fd);
        dispatch(login(values));
        navigate(ROUTES.REDUX);
    }
    useEffect(() => {
        if (!user) return;
        navigate(ROUTES.REDUX);
    }, [user])
    return (
        <form onSubmit={handleLoginSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login;