import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/redux/cartReducer";

const cartAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const isUserLoggedIn = () => {
        return !!user;
    }

    const loggedInUser = () => {
        return user;
    }

    const addProductToCart = useCallback((product) => {
        if (isUserLoggedIn()) {
            dispatch(addToCart(product))
        } else {
            window.alert('Please login to add products to cart!')
        }
    }, [user]);

    return {
        loggedInUser,
        isUserLoggedIn,
        addProductToCart
    }
}

export default cartAuth;