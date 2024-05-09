import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/redux/cartSelectors';
import Products from './Products';

const Cart = () => {
    const cartProducts = useSelector(selectAllProducts);

    const cartTotal = cartProducts.reduce((prev, next) => {
        return prev + next.price
    }, 0)

    return (
        <div className='cart'>
            <h4>Cart ({cartProducts?.length})</h4>
            <Products products={cartProducts} inCartPage={true} />
            {cartProducts?.length > 0 ? (<h4>
                Cart Total: Rs. {cartTotal}
            </h4>) : 'No products in the cart'}
        </div>
    )
}

export default Cart;