import Button from "./utils/Button";

const Product = ({ product, handleProductClick, handleCartBtnClick }) => {
  return (
    <div className="product">
      <img src={product.thumbnail} onClick={() => handleProductClick?.(product.id)} />
      <div className="product-details">
        <div className="title">
          <h3>{product.title}</h3>
          <p>
            Rs. {product.price}
            <small> ({product.discountPercentage}% off)</small>
          </p>
        </div>
        <div className="product-actions">
            <Button text='Add to Cart' hadnleClick={() => handleCartBtnClick(product)} />
        </div>
      </div>
    </div>
  );
};

export default Product;
