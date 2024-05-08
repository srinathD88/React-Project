import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/redux/cartSelectors';
import Products from './Products';

const Cart = () => {
    const cartProducts = useSelector(selectAllProducts);

    return (
        <div className='cart'>
            <Products products={cartProducts} />
        </div>
    )
}

export default Cart;